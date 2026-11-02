import { redirect } from "next/navigation";
import { getCurrentStaffProfile } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await getCurrentStaffProfile();

  if (!staff) {
    redirect("/staff/sign-in");
  }

  if (!staff.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050d1a] text-white p-4">
        <div className="max-w-md w-full bg-[#0a1628] border border-red-500/30 p-8 rounded-2xl text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Account Deactivated</h2>
          <p className="text-sm text-[#a8b8d0] mb-6">
            Your staff account has been deactivated. Please contact the Pharmacy Owner or Administrator for assistance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#050d1a] text-white">
      <DashboardSidebar staff={staff} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader staff={staff} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

