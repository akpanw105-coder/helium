import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createSupplierAction(formData: FormData): Promise<void> {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Inventory Staff"])) {
    return;
  }

  const supabase = getAdminSupabase();

  const name = formData.get("name") as string;
  const contact_person = formData.get("contact_person") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const payment_terms = formData.get("payment_terms") as string;

  if (!name) return;

  const { error } = await supabase.from("suppliers").insert({
    name,
    contact_person,
    email,
    phone,
    address,
    payment_terms,
    is_active: true,
  });

  if (error) return;

  revalidatePath("/dashboard/suppliers");
}

export async function createPurchaseOrderAction(formData: FormData): Promise<void> {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Inventory Staff"])) {
    return;
  }

  const supabase = getAdminSupabase();

  const supplier_id = formData.get("supplier_id") as string;
  const invoice_number = formData.get("invoice_number") as string;
  const notes = formData.get("notes") as string;

  const po_number = `PO-${Date.now().toString().slice(-6)}`;

  const { data: po, error } = await supabase
    .from("purchase_orders")
    .insert({
      po_number,
      supplier_id: supplier_id || null,
      status: "Ordered",
      total_amount: 0,
      invoice_number,
      notes,
      ordered_by: staff.id,
      ordered_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error || !po) return;

  revalidatePath("/dashboard/purchases");
}

export async function updateStaffRoleAction(staffId: string, role: string) {
  const staff = await getCurrentStaffProfile();
  if (!staff || staff.role !== "Owner") {
    return { error: "Only the Pharmacy Owner can modify staff roles." };
  }

  const supabase = getAdminSupabase();

  const { error } = await supabase
    .from("staff_profiles")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", staffId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/staff");
  return { success: true };
}

