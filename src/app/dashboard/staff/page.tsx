import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, Shield, ShieldAlert, CheckCircle, Clock } from "lucide-react";
import { updateStaffRoleAction } from "@/actions/admin-actions";


export default async function StaffManagementPage() {
  const currentStaff = await getCurrentStaffProfile();
  if (!currentStaff || !hasPermission(currentStaff.role, ["Owner", "Admin"])) {
    redirect("/dashboard");
  }

  const supabase = getAdminSupabase();
  const { data: staffList } = await supabase
    .from("staff_profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const isOwner = currentStaff.role === "Owner";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Staff Profiles & Role-Based Access Control</h1>
        <p className="text-xs text-[#a8b8d0]">
          Manage clinical staff access levels, dispensing permissions, and account statuses.
        </p>
      </div>

      <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#152a52] bg-[#050d1a]/60 text-[11px] font-semibold text-[#a8b8d0] uppercase tracking-wider">
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Current Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Joined Date</th>
                {isOwner && <th className="py-3.5 px-4">Change Role</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152a52] text-xs">
              {staffList && staffList.length > 0 ? (
                staffList.map((member) => (
                  <tr key={member.id} className="hover:bg-[#0f2040]/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {member.first_name} {member.last_name}
                    </td>
                    <td className="py-3.5 px-4 text-[#a8b8d0] font-mono">{member.email}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        member.role === "Owner"
                          ? "bg-[#00c8e0]/10 text-[#00c8e0] border border-[#00c8e0]/30"
                          : member.role === "Admin"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                          : member.role === "Pharmacist"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        {member.is_active ? "Active" : "Deactivated"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#a8b8d0]">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                    {isOwner && (
                      <td className="py-3.5 px-4">
                        {member.role !== "Owner" ? (
                          <form
                            action={async (formData) => {
                              "use server";
                              const newRole = formData.get("role") as string;
                              await updateStaffRoleAction(member.id, newRole);
                            }}
                            className="flex items-center gap-2"
                          >
                            <select
                              name="role"
                              defaultValue={member.role}
                              className="bg-[#050d1a] border border-[#152a52] text-[11px] text-white rounded-lg px-2 py-1 focus:border-[#00c8e0] focus:outline-none"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Pharmacist">Pharmacist</option>
                              <option value="Inventory Staff">Inventory Staff</option>
                              <option value="Cashier">Cashier</option>
                            </select>
                            <button
                              type="submit"
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-[#00c8e0]/20 text-[#00c8e0] hover:bg-[#00c8e0]/30 font-semibold"
                            >
                              Update
                            </button>
                          </form>
                        ) : (
                          <span className="text-[10px] text-[#a8b8d0] italic">Primary Account</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#a8b8d0]">
                    No staff records found.
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

