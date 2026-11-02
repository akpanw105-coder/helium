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

      {/* Sign-in card */}
      <div className="w-full max-w-md z-10">
        <Suspense fallback={<div className="text-center text-[#a8b8d0]">Loading Staff Auth...</div>}>
          <SignIn
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-[#0a1628]/90 border border-[#00c8e0]/20 backdrop-blur-xl shadow-2xl text-white rounded-2xl",
                headerTitle: "text-white text-xl font-bold",
                headerSubtitle: "text-[#a8b8d0]",
                socialButtonsBlockButton: "border-[#152a52] bg-[#0f2040] hover:bg-[#152a52] text-white",
                formButtonPrimary: "bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white hover:opacity-90 font-medium py-2.5",
                formFieldLabel: "text-[#a8b8d0] font-medium",
                formFieldInput: "bg-[#050d1a] border-[#152a52] text-white focus:border-[#00c8e0]",
                footerActionLink: "text-[#00c8e0] hover:text-[#7fe8f5]",
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

