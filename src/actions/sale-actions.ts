"use server";

import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { allocateStockFEFO } from "@/lib/fefo";
import { revalidatePath } from "next/cache";

export interface SaleItemInput {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface CheckoutInput {
  items: SaleItemInput[];
  customerName?: string;
  customerPhone?: string;
  paymentMethod: "Cash" | "POS / Card" | "Bank Transfer" | "Split" | "Credit";
  discountAmount?: number;
  prescribedBy?: string;
  notes?: string;
}

export async function processSaleAction(input: CheckoutInput) {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist", "Cashier"])) {
    return { error: "Unauthorized" };
  }

  if (!input.items || input.items.length === 0) {
    return { error: "Cannot process sale with empty cart." };
  }

  const supabase = getAdminSupabase();

  // 1. FEFO Validation & Allocation
  const plannedAllocations: Array<{
    item: SaleItemInput;
    allocations: Array<{
      batchId: string;
      batchNumber: string;
      quantityToDeduct: number;
      expiryDate: string;
      sellingPrice: number;
    }>;
  }> = [];

  for (const item of input.items) {
    const allocationResult = await allocateStockFEFO(item.productId, item.quantity);
    if (!allocationResult.success) {
      return {
        error: `Stock error for ${item.productName}: ${allocationResult.error}`,
      };
    }
    plannedAllocations.push({
      item,
      allocations: allocationResult.allocations,
    });
  }

  // 2. Calculate Totals
  const subtotal = input.items.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0
  );
  const discount = Math.max(0, input.discountAmount || 0);
  const totalAmount = Math.max(0, subtotal - discount);

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const receiptNumber = `HEL-${dateStr}-${randomSuffix}`;

  let customerId: string | null = null;
  if (input.customerName && input.customerPhone) {
    const { data: existingCust } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", input.customerPhone)
      .single();

    if (existingCust) {
      customerId = existingCust.id;
    } else {
      const { data: newCust } = await supabase
        .from("customers")
        .insert({
          full_name: input.customerName,
          phone: input.customerPhone,
        })
        .select("id")
        .single();
      if (newCust) customerId = newCust.id;
    }
  }

  // 3. Create Sale Record
  const { data: sale, error: saleErr } = await supabase
    .from("sales")
    .insert({
      receipt_number: receiptNumber,
      customer_id: customerId,
      customer_name: input.customerName || "Walk-in Customer",
      subtotal,
      discount_amount: discount,
      total_amount: totalAmount,
      payment_method: input.paymentMethod,
      payment_status: "Paid",
      prescribed_by: input.prescribedBy || null,
      staff_id: staff.id,
      notes: input.notes || null,
    })
    .select()
    .single();

  if (saleErr || !sale) {
    return { error: `Sale registration failed: ${saleErr?.message}` };
  }

  // 4. Deduct Batches & Record Sale Items & Movements
  for (const plan of plannedAllocations) {
    for (const alloc of plan.allocations) {
      await supabase.from("sale_items").insert({
        sale_id: sale.id,
        product_id: plan.item.productId,
        batch_id: alloc.batchId,
        product_name: plan.item.productName,
        quantity: alloc.quantityToDeduct,
        unit_price: plan.item.unitPrice,
        total_price: alloc.quantityToDeduct * plan.item.unitPrice,
      });

      const { data: currentBatch } = await supabase
        .from("medicine_batches")
        .select("current_quantity")
        .eq("id", alloc.batchId)
        .single();

      const prevQty = currentBatch?.current_quantity || 0;
      const newQty = Math.max(0, prevQty - alloc.quantityToDeduct);

      await supabase
        .from("medicine_batches")
        .update({
          current_quantity: newQty,
          updated_at: new Date().toISOString(),
        })
        .eq("id", alloc.batchId);

      await supabase.from("inventory_movements").insert({
        product_id: plan.item.productId,
        batch_id: alloc.batchId,
        movement_type: "Sale",
        quantity: -alloc.quantityToDeduct,
        previous_quantity: prevQty,
        new_quantity: newQty,
        reason: `Dispensed in sale ${receiptNumber} (FEFO batch: ${alloc.batchNumber})`,
        reference_id: receiptNumber,
        staff_id: staff.id,
      });
    }
  }

  // 5. Activity log
  await supabase.from("activity_logs").insert({
    staff_id: staff.id,
    action: "COMPLETE_SALE",
    entity_type: "sale",
    entity_id: sale.id,
    details: { receiptNumber, totalAmount, paymentMethod: input.paymentMethod },
  });

  revalidatePath("/dashboard/sales");
  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard/inventory");
  revalidatePath("/dashboard/batches");
  revalidatePath("/dashboard");

  return { success: true, receiptNumber, saleId: sale.id };
}
