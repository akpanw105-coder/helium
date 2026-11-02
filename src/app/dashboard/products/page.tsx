import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import Link from "next/link";
import { Plus, Search, Filter, AlertCircle, Edit, CheckCircle2 } from "lucide-react";
import { createProductAction } from "@/actions/product-actions";


export default async function ProductsPage() {
  const staff = await getCurrentStaffProfile();
  const canManage = staff ? hasPermission(staff.role, ["Owner", "Admin", "Pharmacist", "Inventory Staff"]) : false;

  const supabase = getAdminSupabase();

  // Fetch products with their categories and batch stock
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      category:product_categories(name),
      batches:medicine_batches(current_quantity, expiry_date)
    `)
    .order("name", { ascending: true });

  const { data: categories } = await supabase
    .from("product_categories")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Medicine & Product Catalog</h1>
          <p className="text-xs text-[#a8b8d0]">
            Manage pharmaceutical inventory, dosage forms, active ingredients, pricing, and reorder levels.
          </p>
        </div>
      </div>

      {/* Add New Product Section */}
      {canManage && (
        <details className="bg-[#0a1628]/80 border border-[#00c8e0]/20 rounded-2xl p-5 group">
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#00c8e0]/10 flex items-center justify-center text-[#00c8e0]">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white group-open:text-[#00c8e0]">
                Add New Pharmacy Product
              </span>
            </div>
            <span className="text-xs text-[#a8b8d0] group-open:hidden">+ Click to expand product form</span>
          </summary>

          <form action={createProductAction} className="mt-6 space-y-4 pt-4 border-t border-[#152a52]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Paracetamol Extra"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Generic Name / Molecule</label>
                <input
                  type="text"
                  name="generic_name"
                  placeholder="e.g. Acetaminophen + Caffeine"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Category</label>
                <select
                  name="category_id"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {(categories || []).map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">SKU / Item Code *</label>
                <input
                  type="text"
                  name="sku"
                  required
                  placeholder="e.g. MED-PCM-001"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Barcode</label>
                <input
                  type="text"
                  name="barcode"
                  placeholder="Scan or enter barcode"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Dosage Form</label>
                <select
                  name="dosage_form"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                >
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Injection">Injection</option>
                  <option value="Ointment">Ointment / Gel</option>
                  <option value="Drops">Eye/Ear Drops</option>
                  <option value="Inhaler">Inhaler</option>
                  <option value="Device">Medical Device</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Strength (e.g. 500mg)</label>
                <input
                  type="text"
                  name="strength"
                  placeholder="500mg, 10ml, etc."
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Unit of Measurement</label>
                <input
                  type="text"
                  name="unit_of_measurement"
                  defaultValue="pack"
                  placeholder="pack, bottle, blister, box"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Manufacturer</label>
                <input
                  type="text"
                  name="manufacturer"
                  placeholder="e.g. Emzor, GSK, Fidson"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Cost Price (₦)</label>
                <input
                  type="number"
                  step="0.01"
                  name="cost_price"
                  placeholder="0.00"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Selling Price (₦) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="selling_price"
                  required
                  placeholder="0.00"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Reorder Level (Alert Threshold)</label>
                <input
                  type="number"
                  name="reorder_level"
                  defaultValue="10"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#a8b8d0]">
                <input
                  type="checkbox"
                  name="requires_prescription"
                  className="w-4 h-4 rounded bg-[#050d1a] border-[#152a52] text-[#00c8e0] focus:ring-0"
                />
                <span>Prescription Required (Rx)</span>
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs shadow-md shadow-[#00c8e0]/20 hover:opacity-90"
              >
                Save Product
              </button>
            </div>
          </form>
        </details>
      )}

      {/* Products Table */}
      <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#152a52] bg-[#050d1a]/60 text-[11px] font-semibold text-[#a8b8d0] uppercase tracking-wider">
                <th className="py-3.5 px-4">Product / Molecule</th>
                <th className="py-3.5 px-4">SKU / Code</th>
                <th className="py-3.5 px-4">Dosage / Unit</th>
                <th className="py-3.5 px-4">Price (₦)</th>
                <th className="py-3.5 px-4">Stock on Hand</th>
                <th className="py-3.5 px-4">Rx Required</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152a52] text-xs">
              {products && products.length > 0 ? (
                products.map((p) => {
                  const stock = (p.batches || []).reduce((sum: number, b: any) => sum + (b.current_quantity || 0), 0);
                  const isLow = stock <= p.reorder_level;

                  return (
                    <tr key={p.id} className="hover:bg-[#0f2040]/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{p.name}</div>
                        {p.generic_name && (
                          <div className="text-[11px] text-[#a8b8d0] italic">{p.generic_name}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#a8b8d0]">{p.sku}</td>
                      <td className="py-3.5 px-4 text-[#a8b8d0]">
                        {p.dosage_form} {p.strength ? `(${p.strength})` : ""} • {p.unit_of_measurement}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white">
                        ₦{Number(p.selling_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold ${isLow ? "text-amber-400" : "text-emerald-400"}`}>
                            {stock}
                          </span>
                          {isLow && (
                            <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                              Low Stock
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {p.requires_prescription ? (
                          <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20">
                            Rx Only
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#a8b8d0] bg-[#152a52] px-2 py-0.5 rounded-full">
                            OTC
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          p.is_active ? "text-emerald-400 bg-emerald-400/10" : "text-zinc-400 bg-zinc-800"
                        }`}>
                          {p.is_active ? "Active" : "Archived"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#a8b8d0]">
                    No products added yet. Click <strong>Add New Pharmacy Product</strong> above to populate your inventory catalog.
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

