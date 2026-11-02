import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createBatchAction(formData: FormData): Promise<void> {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist", "Inventory Staff"])) {
    return;
  }

  const supabase = getAdminSupabase();

  const product_id = formData.get("product_id") as string;
  const batch_number = formData.get("batch_number") as string;
  const manufacturing_date = (formData.get("manufacturing_date") as string) || null;
  const expiry_date = formData.get("expiry_date") as string;
  const purchase_price = parseFloat((formData.get("purchase_price") as string) || "0");
  const selling_price = parseFloat((formData.get("selling_price") as string) || "0");
  const initial_quantity = parseInt((formData.get("quantity") as string) || "0", 10);

  if (!product_id || !batch_number || !expiry_date || initial_quantity <= 0) {
    return;
  }

  const { data: batch, error } = await supabase
    .from("medicine_batches")
    .insert({
      product_id,
      batch_number,
      manufacturing_date,
      expiry_date,
      purchase_price,
      selling_price,
      initial_quantity,
      current_quantity: initial_quantity,
      is_active: true,
    })
    .select()
    .single();

  if (error || !batch) {
    console.error("Error creating batch:", error);
    return;
  }

  // Record inventory movement
  await supabase.from("inventory_movements").insert({
    product_id,
    batch_id: batch.id,
    movement_type: "Purchase",
    quantity: initial_quantity,
    previous_quantity: 0,
    new_quantity: initial_quantity,
    reason: `Initial stock receiving for batch ${batch_number}`,
    staff_id: staff.id,
  });

  revalidatePath("/dashboard/batches");
  revalidatePath("/dashboard/inventory");
  revalidatePath("/dashboard");
}

export async function adjustStockAction(formData: FormData): Promise<void> {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist", "Inventory Staff"])) {
    return;
  }

  const supabase = getAdminSupabase();

  const batch_id = formData.get("batch_id") as string;
  const adjustment_type = formData.get("adjustment_type") as string;
  const quantity = parseInt((formData.get("quantity") as string) || "0", 10);
  const reason = (formData.get("reason") as string) || "Manual inventory adjustment";

  if (!batch_id || quantity <= 0) {
    return;
  }

  // Fetch current batch
  const { data: batch, error: batchErr } = await supabase
    .from("medicine_batches")
    .select("*")
    .eq("id", batch_id)
    .single();

  if (batchErr || !batch) {
    return;
  }

  const currentQty = batch.current_quantity || 0;
  let newQty = currentQty;
  let delta = 0;

  if (adjustment_type === "Increase") {
    newQty = currentQty + quantity;
    delta = quantity;
  } else {
    // Decrease, Damaged, Expired, Audit Discrepancy
    if (currentQty < quantity) {
      return;
    }
    newQty = currentQty - quantity;
    delta = -quantity;
  }

  // Update batch quantity
  const { error: updateErr } = await supabase
    .from("medicine_batches")
    .update({ current_quantity: newQty, updated_at: new Date().toISOString() })
    .eq("id", batch_id);

  if (updateErr) return;

  // Record Stock Adjustment
  await supabase.from("stock_adjustments").insert({
    product_id: batch.product_id,
    batch_id,
    adjustment_type,
    quantity,
    reason,
    staff_id: staff.id,
  });

  // Record Inventory Movement
  await supabase.from("inventory_movements").insert({
    product_id: batch.product_id,
    batch_id,
    movement_type: "Adjustment",
    quantity: delta,
    previous_quantity: currentQty,
    new_quantity: newQty,
    reason: `Stock adjustment: ${adjustment_type} - ${reason}`,
    staff_id: staff.id,
  });

  revalidatePath("/dashboard/batches");
  revalidatePath("/dashboard/inventory");
  revalidatePath("/dashboard");
}

