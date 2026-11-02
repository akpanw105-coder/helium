import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentStaffProfile } from "@/lib/auth";
import { StaffSignInForm } from "@/components/auth/StaffSignInForm";

export default async function StaffSignInPage() {
  // If user is already authenticated AND has an active staff profile, redirect directly to dashboard
  const staff = await getCurrentStaffProfile();
  if (staff && staff.is_active) {
    redirect("/dashboard");
  }

  // Pass test credentials ONLY in local development
  const isDev = process.env.NODE_ENV === "development";
  const initialEmail = isDev ? (process.env.DEV_STAFF_EMAIL || "") : "";
  const initialPassword = isDev ? (process.env.DEV_STAFF_PASSWORD || "") : "";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-[#050d1a]">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a6cf6]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#00c8e0]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Logo */}
      <div className="mb-6 text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2 group mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a6cf6] to-[#00c8e0] flex items-center justify-center shadow-lg shadow-[#00c8e0]/20">
            <span className="font-bold text-xl text-white">H</span>
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-white">
            HELIUM<span className="text-[#00c8e0]">.</span>
          </span>
        </Link>
        <h1 className="text-xl font-bold text-white tracking-tight">Staff Login</h1>
      </div>

      {/* Direct Email & Password Form */}
      <div className="w-full max-w-md z-10">
        <Suspense fallback={<div className="text-center text-xs text-[#a8b8d0]">Loading Staff Login...</div>}>
          <StaffSignInForm
            defaultEmail={initialEmail}
            defaultPassword={initialPassword}
          />
        </Suspense>
      </div>

      <div className="mt-8 text-center z-10">
        <Link
          href="/"
          className="text-xs text-[#a8b8d0] hover:text-[#00c8e0] transition-colors"
        >
          &larr; Return to HELIUM Public Pharmacy
        </Link>
      </div>
    </div>
  );
}
