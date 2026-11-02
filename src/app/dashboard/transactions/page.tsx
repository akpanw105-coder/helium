import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile } from "@/lib/auth";
import { Receipt, Search, Calendar, User, CreditCard } from "lucide-react";


export default async function TransactionsPage() {
  const staff = await getCurrentStaffProfile();
  const supabase = getAdminSupabase();

  const { data: sales } = await supabase
    .from("sales")
    .select(`
      *,
      staff:staff_profiles(first_name, last_name),
      items:sale_items(product_name, quantity, unit_price, total_price)
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Sales & Dispensing Transactions</h1>
        <p className="text-xs text-[#a8b8d0]">
          Comprehensive ledger of completed receipts, payment methods, prescribed items, and responsible staff.
        </p>
      </div>

      <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#152a52] bg-[#050d1a]/60 text-[11px] font-semibold text-[#a8b8d0] uppercase tracking-wider">
                <th className="py-3.5 px-4">Receipt #</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items Dispensed</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Total (₦)</th>
                <th className="py-3.5 px-4">Dispensing Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152a52] text-xs">
              {sales && sales.length > 0 ? (
                sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-[#0f2040]/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {sale.receipt_number}
                    </td>
                    <td className="py-3.5 px-4 text-[#a8b8d0] whitespace-nowrap">
                      {new Date(sale.created_at).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-white font-medium">
                      {sale.customer_name || "Walk-in"}
                    </td>
                    <td className="py-3.5 px-4 text-[#a8b8d0]">
                      {(sale.items || []).map((i: any) => `${i.product_name} (x${i.quantity})`).join(", ")}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] bg-[#152a52] text-[#00c8e0] px-2 py-0.5 rounded-full font-medium">
                        {sale.payment_method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      ₦{Number(sale.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-[#a8b8d0]">
                      {sale.staff ? `${sale.staff.first_name} ${sale.staff.last_name}` : "System"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#a8b8d0]">
                    No sales recorded yet. Process a sale in the Point of Sale module to generate transactions.
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

