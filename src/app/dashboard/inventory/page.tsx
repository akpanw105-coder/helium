import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile } from "@/lib/auth";
import Link from "next/link";
import { Boxes, ArrowDownRight, ArrowUpRight, Filter } from "lucide-react";


export default async function InventoryPage() {
  const staff = await getCurrentStaffProfile();
  const supabase = getAdminSupabase();

  // 1. Fetch live stock per product
  const { data: products } = await supabase
    .from("products")
    .select("*, batches:medicine_batches(current_quantity, expiry_date)")
    .order("name", { ascending: true });

  // 2. Fetch inventory movements
  const { data: movements } = await supabase
    .from("inventory_movements")
    .select("*, product:products(name, sku)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Stock on Hand & Live Movement History</h1>
        <p className="text-xs text-[#a8b8d0]">
          Audit-grade log of every medicine reception, sales deduction, adjustment, and quarantine action.
        </p>
      </div>

      {/* Live Movement Ledger */}
      <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#152a52] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-[#00c8e0]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Inventory Movement Audit Ledger (Last 50 Events)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#152a52] bg-[#050d1a]/60 text-[11px] font-semibold text-[#a8b8d0] uppercase tracking-wider">
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Quantity Change</th>
                <th className="py-3.5 px-4">Balance (Prev &rarr; New)</th>
                <th className="py-3.5 px-4">Reason / Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152a52] text-xs">
              {movements && movements.length > 0 ? (
                movements.map((m) => {
                  const isPositive = m.quantity > 0;
                  return (
                    <tr key={m.id} className="hover:bg-[#0f2040]/40 transition-colors">
                      <td className="py-3.5 px-4 text-[#a8b8d0] whitespace-nowrap">
                        {new Date(m.created_at).toLocaleString([], {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {(m.product as any)?.name || "Unknown Product"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          m.movement_type === "Sale"
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            : m.movement_type === "Purchase"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {m.movement_type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold">
                        <span className={isPositive ? "text-emerald-400" : "text-amber-400"}>
                          {isPositive ? `+${m.quantity}` : m.quantity} units
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#a8b8d0]">
                        {m.previous_quantity} &rarr; <span className="text-white font-bold">{m.new_quantity}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#a8b8d0]">
                        {m.reason || m.reference_id || "Standard transaction"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#a8b8d0]">
                    No inventory movements recorded yet. All sales and batch deliveries will automatically populate this ledger.
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

