import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { createPurchaseOrderAction } from "@/actions/admin-actions";
import { FileSpreadsheet, Plus, CheckCircle, Clock } from "lucide-react";


export default async function PurchasesPage() {
  const staff = await getCurrentStaffProfile();
  const canManage = staff ? hasPermission(staff.role, ["Owner", "Admin", "Inventory Staff"]) : false;

  const supabase = getAdminSupabase();

  const { data: purchaseOrders } = await supabase
    .from("purchase_orders")
    .select("*, supplier:suppliers(name)")
    .order("created_at", { ascending: false });

  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("id, name")
    .eq("is_active", true)
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Purchase Orders & Invoices</h1>
        <p className="text-xs text-[#a8b8d0]">
          Manage wholesale medication replenishments, supplier bills, and inventory receiving records.
        </p>
      </div>

      {canManage && (
        <details className="bg-[#0a1628]/80 border border-[#00c8e0]/20 rounded-2xl p-5 group">
          <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-white">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00c8e0]" />
              <span>Create Wholesale Purchase Order</span>
            </div>
            <span className="text-xs text-[#a8b8d0] group-open:hidden">+ Open Form</span>
          </summary>

          <form action={createPurchaseOrderAction} className="mt-4 space-y-3 pt-3 border-t border-[#152a52]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Select Supplier *</label>
                <select
                  name="supplier_id"
                  required
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                >
                  <option value="">Select Supplier</option>
                  {(suppliers || []).map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Invoice / Delivery Reference</label>
                <input
                  type="text"
                  name="invoice_number"
                  placeholder="e.g. INV-90483"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Order Notes / Procurement Instructions</label>
                <input
                  type="text"
                  name="notes"
                  placeholder="Specify items, cold-chain transport requirements, etc."
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs shadow-md shadow-[#00c8e0]/20 hover:opacity-90"
              >
                Create Purchase Order
              </button>
            </div>
          </form>
        </details>
      )}

      {/* PO Table */}
      <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#152a52] bg-[#050d1a]/60 text-[11px] font-semibold text-[#a8b8d0] uppercase tracking-wider">
                <th className="py-3.5 px-4">PO Number</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152a52] text-xs">
              {purchaseOrders && purchaseOrders.length > 0 ? (
                purchaseOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-[#0f2040]/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{po.po_number}</td>
                    <td className="py-3.5 px-4 text-white font-semibold">{(po.supplier as any)?.name || "Direct Vendor"}</td>
                    <td className="py-3.5 px-4 font-mono text-[#a8b8d0]">{po.invoice_number || "—"}</td>
                    <td className="py-3.5 px-4 text-[#a8b8d0]">
                      {new Date(po.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium">
                        {po.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#a8b8d0]">{po.notes || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#a8b8d0]">
                    No purchase orders recorded yet. Create purchase orders to track inventory restocks.
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

