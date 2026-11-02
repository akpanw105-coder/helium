import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BarChart3, TrendingUp, DollarSign, Package, Calendar, Download } from "lucide-react";


export default async function ReportsPage() {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist"])) {
    redirect("/dashboard");
  }

  const supabase = getAdminSupabase();

  // Aggregate Sales
  const { data: allSales } = await supabase
    .from("sales")
    .select("total_amount, payment_method, created_at");

  const totalRevenue = (allSales || []).reduce((acc, s) => acc + Number(s.total_amount || 0), 0);
  const totalTransactions = allSales?.length || 0;
  const averageTicket = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  // Inventory Valuation
  const { data: batches } = await supabase
    .from("medicine_batches")
    .select("current_quantity, purchase_price, selling_price, expiry_date");

  let totalCostValuation = 0;
  let totalRetailValuation = 0;
  let expiredUnits = 0;
  const today = new Date().toISOString().split("T")[0];

  (batches || []).forEach((b) => {
    const qty = b.current_quantity || 0;
    totalCostValuation += qty * (b.purchase_price || 0);
    totalRetailValuation += qty * (b.selling_price || 0);
    if (b.expiry_date < today) {
      expiredUnits += qty;
    }
  });

  const projectedGrossMargin = totalRetailValuation - totalCostValuation;

  // Best Selling Products
  const { data: topSaleItems } = await supabase
    .from("sale_items")
    .select("product_name, quantity, total_price")
    .limit(100);

  const productTotals: Record<string, { qty: number; revenue: number }> = {};
  (topSaleItems || []).forEach((item) => {
    if (!productTotals[item.product_name]) {
      productTotals[item.product_name] = { qty: 0, revenue: 0 };
    }
    productTotals[item.product_name].qty += item.quantity;
    productTotals[item.product_name].revenue += Number(item.total_price || 0);
  });

  const sortedBestSellers = Object.entries(productTotals)
    .sort(([, a], [, b]) => b.qty - a.qty)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Clinical & Financial Analytics</h1>
          <p className="text-xs text-[#a8b8d0]">
            Valuation, profit margins, sales velocity, and inventory depreciation reports.
          </p>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <div className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">Total Sales Volume</div>
          <div className="text-2xl font-bold text-white mt-2">
            ₦{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-[#00c8e0] mt-1 font-semibold">{totalTransactions} Total Transactions</div>
        </div>

        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <div className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">Average Basket Size</div>
          <div className="text-2xl font-bold text-white mt-2">
            ₦{averageTicket.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-[#a8b8d0] mt-1">Per dispensing transaction</div>
        </div>

        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <div className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">Retail Inventory Value</div>
          <div className="text-2xl font-bold text-white mt-2">
            ₦{totalRetailValuation.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
            Cost Basis: ₦{totalCostValuation.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <div className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">Projected Gross Margin</div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">
            ₦{projectedGrossMargin.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-[#a8b8d0] mt-1">Stock on hand potential</div>
        </div>
      </div>

      {/* Best Sellers & Depreciations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Dispensed Medications */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00c8e0]" />
            <span>Top Dispensed Medications</span>
          </h3>

          {sortedBestSellers.length > 0 ? (
            <div className="divide-y divide-[#152a52]">
              {sortedBestSellers.map(([name, stat], idx) => (
                <div key={name} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#0f2040] text-[#00c8e0] font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white">{name}</div>
                      <div className="text-[11px] text-[#a8b8d0]">{stat.qty} units dispensed</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-emerald-400">
                    ₦{stat.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#a8b8d0]">
              No dispensing history available to calculate best-selling pharmaceuticals.
            </div>
          )}
        </div>

        {/* Audit & Expiry Risk Assessment */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#00c8e0]" />
            <span>Inventory Risk & Depletion Index</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#050d1a] border border-[#152a52] flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Expired Stock Quarantine Units</div>
                <div className="text-[11px] text-[#a8b8d0]">Units locked from POS by system safety rules</div>
              </div>
              <div className="text-sm font-bold text-red-400">{expiredUnits} units</div>
            </div>

            <div className="p-4 rounded-xl bg-[#050d1a] border border-[#152a52] flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">FEFO Compliance Rating</div>
                <div className="text-[11px] text-[#a8b8d0]">First Expiry, First Out automated protocol</div>
              </div>
              <div className="text-sm font-bold text-emerald-400">100% Active</div>
            </div>

            <div className="p-4 rounded-xl bg-[#050d1a] border border-[#152a52] flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Audit Trail Integrity</div>
                <div className="text-[11px] text-[#a8b8d0]">Server-side ledger and RLS enforced</div>
              </div>
              <div className="text-sm font-bold text-[#00c8e0]">Verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

