import { getAdminSupabase } from "@/lib/supabase";
import { MedicineBatch } from "@/types/inventory";

export interface BatchAllocation {
  batchId: string;
  batchNumber: string;
  quantityToDeduct: number;
  expiryDate: string;
  sellingPrice: number;
}

/**
 * First Expiry, First Out (FEFO) Batch Allocator
 * Finds active, unexpired batches sorted ascending by expiry_date.
 */
export async function allocateStockFEFO(
  productId: string,
  requestedQuantity: number
): Promise<{ success: boolean; allocations: BatchAllocation[]; error?: string }> {
  const supabase = getAdminSupabase();
  const today = new Date().toISOString().split("T")[0];

  // Fetch active, non-expired batches with stock > 0
  const { data: batches, error } = await supabase
    .from("medicine_batches")
    .select("*")
    .eq("product_id", productId)
    .eq("is_active", true)
    .gt("current_quantity", 0)
    .gte("expiry_date", today)
    .order("expiry_date", { ascending: true });

  if (error) {
    return { success: false, allocations: [], error: error.message };
  }

  if (!batches || batches.length === 0) {
    return {
      success: false,
      allocations: [],
      error: "No active, unexpired stock available for this product.",
    };
  }

  const totalAvailable = batches.reduce(
    (sum, b) => sum + (b.current_quantity || 0),
    0
  );

  if (totalAvailable < requestedQuantity) {
    return {
      success: false,
      allocations: [],
      error: `Insufficient unexpired stock. Requested: ${requestedQuantity}, Available: ${totalAvailable}`,
    };
  }

  let remaining = requestedQuantity;
  const allocations: BatchAllocation[] = [];

  for (const batch of batches) {
    if (remaining <= 0) break;

    const qtyToTake = Math.min(batch.current_quantity, remaining);
    allocations.push({
      batchId: batch.id,
      batchNumber: batch.batch_number,
      quantityToDeduct: qtyToTake,
      expiryDate: batch.expiry_date,
      sellingPrice: batch.selling_price,
    });

    remaining -= qtyToTake;
  }

  return { success: true, allocations };
}

