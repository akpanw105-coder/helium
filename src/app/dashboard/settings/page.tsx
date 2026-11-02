import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Settings, Shield, Building2, Bell, Save } from "lucide-react";
import { revalidatePath } from "next/cache";


async function saveSettingsAction(formData: FormData) {
  "use server";
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin"])) {
    return;
  }

  const pharmacyName = formData.get("pharmacy_name") as string;
  const currencySymbol = formData.get("currency_symbol") as string;
  const alertThresholdDays = formData.get("alert_threshold_days") as string;
  const taxRate = formData.get("tax_rate") as string;

  const supabase = getAdminSupabase();
  await supabase.from("system_settings").upsert([
    { key: "pharmacy_name", value: pharmacyName },
    { key: "currency_symbol", value: currencySymbol },
    { key: "expiry_alert_days", value: parseInt(alertThresholdDays || "30", 10) },
    { key: "tax_rate", value: parseFloat(taxRate || "0") },
  ]);

  revalidatePath("/dashboard/settings");
}

export default async function SettingsPage() {
  const currentStaff = await getCurrentStaffProfile();
  if (!currentStaff || !hasPermission(currentStaff.role, ["Owner", "Admin"])) {
    redirect("/dashboard");
  }

  const supabase = getAdminSupabase();
  const { data: settingsData } = await supabase.from("system_settings").select("*");

  const settingsMap: Record<string, any> = {};
  (settingsData || []).forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">System & Pharmacy Settings</h1>
        <p className="text-xs text-[#a8b8d0]">
          Configure clinic parameters, default expiry alert thresholds, currency units, and POS receipts.
        </p>
      </div>

      <div className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-6 shadow-xl">
        <form action={saveSettingsAction} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#152a52] pb-2">
              <Building2 className="w-4 h-4 text-[#00c8e0]" />
              <span>Pharmacy Identity & Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Pharmacy Trade Name</label>
                <input
                  type="text"
                  name="pharmacy_name"
                  defaultValue={settingsMap["pharmacy_name"] || "HELIUM Pharmacy Ltd"}
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Currency Symbol</label>
                <input
                  type="text"
                  name="currency_symbol"
                  defaultValue={settingsMap["currency_symbol"] || "₦ (NGN)"}
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#152a52] pb-2">
              <Bell className="w-4 h-4 text-[#00c8e0]" />
              <span>Clinical Safety & Alerts</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Expiry Warning Threshold (Days)</label>
                <input
                  type="number"
                  name="alert_threshold_days"
                  defaultValue={settingsMap["expiry_alert_days"] || 30}
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
                <span className="text-[10px] text-[#a8b8d0] mt-1 block">
                  Batches expiring within this window will be highlighted as nearing expiry.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Standard Sales VAT / Tax (%)</label>
                <input
                  type="number"
                  step="0.01"
                  name="tax_rate"
                  defaultValue={settingsMap["tax_rate"] || 0}
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
                <span className="text-[10px] text-[#a8b8d0] mt-1 block">
                  Essential prescription pharmaceuticals are typically zero-rated.
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#152a52]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs shadow-md shadow-[#00c8e0]/20 hover:opacity-90"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

