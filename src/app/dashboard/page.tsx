import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile } from "@/lib/auth";
import Link from "next/link";
import {
  Package,
  Boxes,
  TrendingUp,
  AlertTriangle,
  ClockAlert,
  ArrowUpRight,
  ShoppingCart,
  Calendar,
  DollarSign,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";


export default async function DashboardOverviewPage() {
  const staff = await getCurrentStaffProfile();
  const supabase = getAdminSupabase();
  const today = new Date().toISOString().split("T")[0];
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  // 1. Total Products
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  // 2. Batches and Stock Calculation
  const { data: batches } = await supabase
    .from("medicine_batches")
    .select("current_quantity, selling_price, expiry_date, is_active");

  let totalStockUnits = 0;
  let totalInventoryValue = 0;
  let expiredBatchesCount = 0;
  let nearExpiryBatchesCount = 0;

  const in30Days = new Date();
  in30Days.setDate(in30Days.getDate() + 30);
  const in30DaysStr = in30Days.toISOString().split("T")[0];

  (batches || []).forEach((b) => {
    const qty = b.current_quantity || 0;
    totalStockUnits += qty;
    totalInventoryValue += qty * (b.selling_price || 0);

    if (b.expiry_date < today) {
      expiredBatchesCount += 1;
    } else if (b.expiry_date <= in30DaysStr) {
      nearExpiryBatchesCount += 1;
    }
  });

  // 3. Sales statistics
  const { data: todaySalesData } = await supabase
    .from("sales")
    .select("total_amount")
    .gte("created_at", `${today}T00:00:00.000Z`);

  const todayRevenue = (todaySalesData || []).reduce((acc, s) => acc + Number(s.total_amount || 0), 0);
  const todaySalesCount = todaySalesData?.length || 0;

  const { data: monthSalesData } = await supabase
    .from("sales")
    .select("total_amount")
    .gte("created_at", startOfMonth);

  const monthRevenue = (monthSalesData || []).reduce((acc, s) => acc + Number(s.total_amount || 0), 0);

  // 4. Low stock products
  const { data: productsWithLowStock } = await supabase
    .from("products")
    .select("id, name, reorder_level, sku")
    .eq("is_active", true);

  // 5. Recent transactions
  const { data: recentSales } = await supabase
    .from("sales")
    .select("id, receipt_number, total_amount, payment_method, created_at, customer_name")
    .order("created_at", { ascending: false })
    .limit(5);

  // 6. Recent inventory activities
  const { data: recentMovements } = await supabase
    .from("inventory_movements")
    .select("id, movement_type, quantity, reason, created_at, product:products(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0a1628] via-[#0f2040] to-[#0a1628] border border-[#00c8e0]/20 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back, {staff?.first_name || "Pharmacist"}!
          </h1>
          <p className="text-xs text-[#a8b8d0] mt-1">
            HELIUM Clinical Pharmacy & Inventory Management Console • Role:{" "}
            <span className="text-[#00c8e0] font-semibold">{staff?.role}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/sales"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs shadow-md shadow-[#00c8e0]/20 hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>New Sale (POS)</span>
          </Link>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050d1a] border border-[#152a52] hover:border-[#00c8e0]/40 text-xs font-semibold text-[#a8b8d0] hover:text-white transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Manage Products</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5 hover:border-[#00c8e0]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">
              Total Products
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#1a6cf6]/10 flex items-center justify-center text-[#1a6cf6]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{totalProducts || 0}</div>
            <div className="text-[11px] text-[#a8b8d0] mt-1">
              Active catalog items
            </div>
          </div>
        </div>

        {/* Total Stock Units */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5 hover:border-[#00c8e0]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">
              Stock on Hand
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#00c8e0]/10 flex items-center justify-center text-[#00c8e0]">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{totalStockUnits.toLocaleString()}</div>
            <div className="text-[11px] text-[#00c8e0] mt-1 font-medium">
              Valuation: ₦{totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5 hover:border-[#00c8e0]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">
              Today's Sales
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">
              ₦{todayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-[#a8b8d0] mt-1">
              {todaySalesCount} completed {todaySalesCount === 1 ? "receipt" : "receipts"} today
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5 hover:border-[#00c8e0]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#a8b8d0] font-medium uppercase tracking-wider">
              Monthly Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">
              ₦{monthRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-[#a8b8d0] mt-1">
              Current billing month
            </div>
          </div>
        </div>
      </div>

      {/* Expiry & Inventory Alerts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nearing Expiry Alert */}
        <div className="bg-[#0a1628]/80 border border-amber-500/20 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ClockAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Nearing Expiry (Within 30 Days)</div>
              <div className="text-xs text-[#a8b8d0] mt-0.5">
                {nearExpiryBatchesCount} {nearExpiryBatchesCount === 1 ? "batch requires" : "batches require"} early dispensing or return
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/batches?filter=near-expiry"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View Batches</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Expired Stock Alert */}
        <div className="bg-[#0a1628]/80 border border-red-500/20 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Expired Stock (Disallowed for Sale)</div>
              <div className="text-xs text-[#a8b8d0] mt-0.5">
                {expiredBatchesCount} {expiredBatchesCount === 1 ? "batch locked" : "batches locked"} from dispensing by FEFO safety rules
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/batches?filter=expired"
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <span>Quarantine</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Data Tables Row: Recent Transactions & Inventory Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#00c8e0]" />
              <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
            </div>
            <Link
              href="/dashboard/transactions"
              className="text-xs text-[#00c8e0] hover:text-[#7fe8f5] flex items-center gap-1"
            >
              <span>All Transactions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentSales && recentSales.length > 0 ? (
            <div className="divide-y divide-[#152a52]">
              {recentSales.map((sale) => (
                <div key={sale.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {sale.receipt_number}
                    </div>
                    <div className="text-[11px] text-[#a8b8d0]">
                      {sale.customer_name || "Walk-in Customer"} • {sale.payment_method}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400">
                      ₦{Number(sale.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-[#a8b8d0]">
                      {new Date(sale.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#a8b8d0]">
              No transactions recorded yet. Click <strong>New Sale (POS)</strong> to record your first sale.
            </div>
          )}
        </div>

        {/* Recent Inventory Movements */}
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00c8e0]" />
              <h3 className="text-sm font-bold text-white">Live Stock Movements</h3>
            </div>
            <Link
              href="/dashboard/inventory"
              className="text-xs text-[#00c8e0] hover:text-[#7fe8f5] flex items-center gap-1"
            >
              <span>Inventory History</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMovements && recentMovements.length > 0 ? (
            <div className="divide-y divide-[#152a52]">
              {recentMovements.map((mov) => {
                const isPositive = mov.quantity > 0;
                const prodName = (mov.product as any)?.name || "Product Item";
                return (
                  <div key={mov.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {prodName}
                      </div>
                      <div className="text-[11px] text-[#a8b8d0]">
                        {mov.movement_type} {mov.reason ? `• ${mov.reason}` : ""}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-bold ${isPositive ? "text-emerald-400" : "text-amber-400"}`}>
                        {isPositive ? `+${mov.quantity}` : mov.quantity} units
                      </div>
                      <div className="text-[10px] text-[#a8b8d0]">
                        {new Date(mov.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#a8b8d0]">
              No inventory movements logged yet. Stock movements will appear automatically as you receive stock or dispense medicines.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

