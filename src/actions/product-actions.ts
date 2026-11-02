import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: FormData): Promise<void> {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist", "Inventory Staff"])) {
    return;
  }

  const supabase = getAdminSupabase();

  const name = formData.get("name") as string;
  const generic_name = formData.get("generic_name") as string;
  const brand = formData.get("brand") as string;
  const category_id = (formData.get("category_id") as string) || null;
  const description = formData.get("description") as string;
  const sku = formData.get("sku") as string;
  const barcode = (formData.get("barcode") as string) || null;
  const manufacturer = formData.get("manufacturer") as string;
  const dosage_form = (formData.get("dosage_form") as string) || "Tablet";
  const strength = formData.get("strength") as string;
  const unit_of_measurement = (formData.get("unit_of_measurement") as string) || "pack";
  const cost_price = parseFloat((formData.get("cost_price") as string) || "0");
  const selling_price = parseFloat((formData.get("selling_price") as string) || "0");
  const reorder_level = parseInt((formData.get("reorder_level") as string) || "10", 10);
  const requires_prescription = formData.get("requires_prescription") === "on";

  if (!name || !sku) {
    return;
  }

  const { data, error } = await supabase.from("products").insert({
    name,
    generic_name,
    brand,
    category_id,
    description,
    sku,
    barcode,
    manufacturer,
    dosage_form,
    strength,
    unit_of_measurement,
    cost_price,
    selling_price,
    reorder_level,
    requires_prescription,
    is_active: true,
  }).select().single();

  if (error || !data) {
    return;
  }

  // Log activity
  await supabase.from("activity_logs").insert({
    staff_id: staff.id,
    action: "CREATE_PRODUCT",
    entity_type: "product",
    entity_id: data.id,
    details: { name, sku, selling_price },
  });

  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
}

export async function updateProductAction(productId: string, formData: FormData) {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist"])) {
    return { error: "Unauthorized" };
  }

  const supabase = getAdminSupabase();

  const name = formData.get("name") as string;
  const generic_name = formData.get("generic_name") as string;
  const brand = formData.get("brand") as string;
  const category_id = (formData.get("category_id") as string) || null;
  const description = formData.get("description") as string;
  const sku = formData.get("sku") as string;
  const barcode = (formData.get("barcode") as string) || null;
  const manufacturer = formData.get("manufacturer") as string;
  const dosage_form = formData.get("dosage_form") as string;
  const strength = formData.get("strength") as string;
  const unit_of_measurement = formData.get("unit_of_measurement") as string;
  const cost_price = parseFloat((formData.get("cost_price") as string) || "0");
  const selling_price = parseFloat((formData.get("selling_price") as string) || "0");
  const reorder_level = parseInt((formData.get("reorder_level") as string) || "10", 10);
  const requires_prescription = formData.get("requires_prescription") === "on";
  const is_active = formData.get("is_active") === "on";

  const { error } = await supabase
    .from("products")
    .update({
      name,
      generic_name,
      brand,
      category_id,
      description,
      sku,
      barcode,
      manufacturer,
      dosage_form,
      strength,
      unit_of_measurement,
      cost_price,
      selling_price,
      reorder_level,
      requires_prescription,
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) {
    return { error: error.message };
  }

  // Log activity
  await supabase.from("activity_logs").insert({
    staff_id: staff.id,
    action: "UPDATE_PRODUCT",
    entity_type: "product",
    entity_id: productId,
    details: { name, sku },
  });

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function toggleProductStatusAction(productId: string, currentStatus: boolean) {
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin"])) {
    return { error: "Unauthorized" };
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("products")
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/products");
  return { success: true };
}

