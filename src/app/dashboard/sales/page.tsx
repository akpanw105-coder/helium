import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PosClient } from "@/components/dashboard/PosClient";


export default async function SalesPosPage() {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist", "Cashier"])) {
    redirect("/dashboard");
  }

  const supabase = getAdminSupabase();
  const today = new Date().toISOString().split("T")[0];

  // Fetch active products with unexpired batch quantities
  const { data: products } = await supabase
    .from("products")
    .select(`
      id,
      name,
      generic_name,
      sku,
      barcode,
      selling_price,
      dosage_form,
      requires_prescription,
      batches:medicine_batches(current_quantity, expiry_date, is_active)
    `)
    .eq("is_active", true)
    .order("name", { ascending: true });

  const formattedProducts = (products || []).map((p) => {
    // Only count active batches that have not expired
    const validBatches = (p.batches || []).filter(
      (b: any) => b.is_active && b.expiry_date >= today
    );
    const totalStock = validBatches.reduce(
      (sum: number, b: any) => sum + (b.current_quantity || 0),
      0
    );

    return {
      id: p.id,
      name: p.name,
      generic_name: p.generic_name || undefined,
      sku: p.sku,
      barcode: p.barcode || undefined,
      selling_price: Number(p.selling_price),
      dosage_form: p.dosage_form,
      requires_prescription: p.requires_prescription,
      total_stock: totalStock,
    };
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Point of Sale (POS) & Medicine Dispensing
        </h1>
        <p className="text-xs text-[#a8b8d0]">
          Clinical medicine checkout with automated First Expiry, First Out (FEFO) batch deduction and receipt generation.
        </p>
      </div>

      <PosClient products={formattedProducts} />
    </div>
  );
}

