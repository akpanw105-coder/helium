import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { createBatchAction, adjustStockAction } from "@/actions/batch-actions";
import { Calendar, Plus, SlidersHorizontal, AlertTriangle } from "lucide-react";


export default async function BatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const staff = await getCurrentStaffProfile();
  const canManage = staff ? hasPermission(staff.role, ["Owner", "Admin", "Pharmacist", "Inventory Staff"]) : false;

  const supabase = getAdminSupabase();
  const today = new Date().toISOString().split("T")[0];

  const in30Days = new Date();
  in30Days.setDate(in30Days.getDate() + 30);
  const in30DaysStr = in30Days.toISOString().split("T")[0];

  // Fetch batches with products
  let query = supabase
    .from("medicine_batches")
    .select("*, product:products(name, sku, unit_of_measurement)")
    .order("expiry_date", { ascending: true });

  if (filter === "expired") {
    query = query.lt("expiry_date", today);
  } else if (filter === "near-expiry") {
    query = query.gte("expiry_date", today).lte("expiry_date", in30DaysStr);
  }

  const { data: batches } = await query;
  const { data: products } = await supabase
    .from("products")
    .select("id, name, sku")
    .eq("is_active", true)
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Medicine Batches & Expiry Control</h1>
          <p className="text-xs text-[#a8b8d0]">
            Track lot numbers, expiry dates, purchase costs, and ensure strict First Expiry, First Out (FEFO) dispensing.
          </p>
        </div>
      </div>

      {canManage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Receive Stock / Add Batch */}
          <details className="bg-[#0a1628]/80 border border-[#00c8e0]/20 rounded-2xl p-5 group">
            <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-white">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#00c8e0]" />
                <span>Receive New Batch of Stock</span>
              </div>
              <span className="text-xs text-[#a8b8d0] group-open:hidden">+ Open Form</span>
            </summary>

            <form action={createBatchAction} className="mt-4 space-y-3 pt-3 border-t border-[#152a52]">
              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Product *</label>
                <select
                  name="product_id"
                  required
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                >
                  <option value="">Select Product</option>
                  {(products || []).map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Batch / Lot # *</label>
                  <input
                    type="text"
                    name="batch_number"
                    required
                    placeholder="e.g. BT-2026-99"
                    className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    name="expiry_date"
                    required
                    className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Quantity Received *</label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    min="1"
                    placeholder="Units"
                    className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Purchase Cost (₦)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="purchase_price"
                    placeholder="Cost per unit"
                    className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Selling Price (₦)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="selling_price"
                    placeholder="Selling price"
                    className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs hover:opacity-90 shadow-md shadow-[#00c8e0]/20"
                >
                  Confirm Stock Receiving
                </button>
              </div>
            </form>
          </details>

          {/* Quick Stock Adjustment */}
          <details className="bg-[#0a1628]/80 border border-[#00c8e0]/20 rounded-2xl p-5 group">
            <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00c8e0]" />
                <span>Adjust Stock (Damaged / Expired / Audit)</span>
              </div>
              <span className="text-xs text-[#a8b8d0] group-open:hidden">+ Open Form</span>
            </summary>

            <form action={adjustStockAction} className="mt-4 space-y-3 pt-3 border-t border-[#152a52]">
              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Target Batch *</label>
                <select
                  name="batch_id"
                  required
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                >
                  <option value="">Select Batch</option>
                  {(batches || []).map((b) => (
                    <option key={b.id} value={b.id}>
                      {(b.product as any)?.name} - Batch {b.batch_number} (Qty: {b.current_quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Adjustment Type</label>
                  <select
                    name="adjustment_type"
                    className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                  >
                    <option value="Decrease">Decrease / Audit Discrepancy</option>
                    <option value="Damaged">Damaged Stock</option>
                    <option value="Expired">Expired Stock Quarantine</option>
                    <option value="Increase">Increase Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Units to Adjust *</label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    min="1"
                    placeholder="Units"
                    className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Clinical / Audit Reason *</label>
                <input
                  type="text"
                  name="reason"
                  required
                  placeholder="e.g. Broken seal, audit adjustment, water damage"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs"
                >
                  Apply Stock Adjustment
                </button>
              </div>
            </form>
          </details>
        </div>
      )}

      {/* Batches Table */}
      <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#152a52] bg-[#050d1a]/60 text-[11px] font-semibold text-[#a8b8d0] uppercase tracking-wider">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Batch / Lot #</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Available Qty</th>
                <th className="py-3.5 px-4">Selling Price (₦)</th>
                <th className="py-3.5 px-4">FEFO Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152a52] text-xs">
              {batches && batches.length > 0 ? (
                batches.map((b) => {
                  const isExpired = b.expiry_date < today;
                  const isNear = !isExpired && b.expiry_date <= in30DaysStr;

                  return (
                    <tr key={b.id} className="hover:bg-[#0f2040]/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {(b.product as any)?.name || "Unknown Product"}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#a8b8d0]">{b.batch_number}</td>
                      <td className="py-3.5 px-4">
                        <span className={`font-medium ${isExpired ? "text-red-400 font-bold" : isNear ? "text-amber-400 font-bold" : "text-white"}`}>
                          {b.expiry_date}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {b.current_quantity} {(b.product as any)?.unit_of_measurement || "units"}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white">
                        ₦{Number(b.selling_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4">
                        {isExpired ? (
                          <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20">
                            Expired (Locked)
                          </span>
                        ) : isNear ? (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                            Dispense First
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                            Valid Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#a8b8d0]">
                    No batches recorded yet. Click <strong>Receive New Batch</strong> above to load medicine lots.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

