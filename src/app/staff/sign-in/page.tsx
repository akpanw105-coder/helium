import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export default function StaffSignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-[#050d1a]">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a6cf6]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#00c8e0]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Logo */}
      <div className="mb-8 text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2 group mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a6cf6] to-[#00c8e0] flex items-center justify-center shadow-lg shadow-[#00c8e0]/20">
            <span className="font-bold text-xl text-white">H</span>
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-white">
            HELIUM<span className="text-[#00c8e0]">.</span>
          </span>
        </Link>
        <p className="text-sm text-[#a8b8d0] uppercase tracking-widest font-semibold">
          Pharmacy Staff & Inventory Portal
        </p>
      </div>

      {/* Email & Password Authentication Card */}
      <div className="w-full max-w-md z-10">
        <Suspense fallback={<div className="text-center text-xs text-[#a8b8d0]">Loading Staff Auth...</div>}>
          <SignIn
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-[#0a1628]/95 border border-[#00c8e0]/20 backdrop-blur-xl shadow-2xl text-white rounded-2xl p-6 sm:p-8",
                headerTitle: "text-white text-xl font-bold tracking-tight",
                headerSubtitle: "text-[#a8b8d0] text-xs mt-1",
                socialButtonsBlockButton: "hidden", // Disables public Google / OAuth buttons for private staff login
                socialButtonsProviderIcon: "hidden",
                dividerRow: "hidden",
                formButtonPrimary:
                  "bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white hover:opacity-90 font-bold py-3 text-xs rounded-xl shadow-lg shadow-[#00c8e0]/20 transition-all",
                formFieldLabel: "text-[#a8b8d0] text-xs font-semibold mb-1.5",
                formFieldInput:
                  "bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00c8e0] transition-colors placeholder:text-[#a8b8d0]/50",
                footerActionLink: "text-[#00c8e0] hover:text-[#7fe8f5] text-xs font-medium",
                formFieldAction: "text-[#00c8e0] hover:text-[#7fe8f5] text-xs font-medium",
                footer: "hidden", // Removes public customer sign-up prompt
                identityPreviewEditButton: "text-[#00c8e0]",
              },
            }}
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
