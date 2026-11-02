import { auth, currentUser } from "@clerk/nextjs/server";
import { getAdminSupabase } from "@/lib/supabase";

export type StaffRole = "Owner" | "Admin" | "Pharmacist" | "Inventory Staff" | "Cashier";

export interface StaffProfile {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: StaffRole;
  is_active: boolean;
  last_active_at?: string;
  created_at: string;
  updated_at: string;
}

export async function getCurrentStaffProfile(): Promise<StaffProfile | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const supabase = getAdminSupabase();

  // Try to find staff profile
  const { data: profile, error } = await supabase
    .from("staff_profiles")
    .select("*")
    .eq("clerk_id", userId)
    .single();

  if (profile) {
    return profile as StaffProfile;
  }

  // If not found, check if this is the first registered user or create initial profile
  const user = await currentUser();
  if (!user) return null;

  // Check how many staff members exist in database
  const { count } = await supabase
    .from("staff_profiles")
    .select("*", { count: "exact", head: true });

  const role: StaffRole = count === 0 ? "Owner" : "Cashier";
  const email = user.emailAddresses[0]?.emailAddress || "staff@heliumpharmacy.ng";
  const firstName = user.firstName || "Staff";
  const lastName = user.lastName || "Member";

  const { data: newProfile, error: insertError } = await supabase
    .from("staff_profiles")
    .insert({
      clerk_id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
      role,
      is_active: true,
      last_active_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertError) {
    console.error("Error creating initial staff profile:", insertError);
    return null;
  }

  return newProfile as StaffProfile;
}

export function hasPermission(
  currentRole: StaffRole,
  allowedRoles: StaffRole[]
): boolean {
  if (currentRole === "Owner") return true;
  return allowedRoles.includes(currentRole);
}

