"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight, CheckCircle2, LogOut, LayoutDashboard, RefreshCw } from "lucide-react";

interface StaffSignInFormProps {
  defaultEmail?: string;
  defaultPassword?: string;
}

export function StaffSignInForm({ defaultEmail = "", defaultPassword = "" }: StaffSignInFormProps) {
  const clerk = useClerk();
  const { isSignedIn, isLoaded: userLoaded, user } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Forgot password flow
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Keep email/password in sync with props when provided
  useEffect(() => {
    if (defaultEmail && !email) setEmail(defaultEmail);
    if (defaultPassword && !password) setPassword(defaultPassword);
  }, [defaultEmail, defaultPassword]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setErrorMsg(null);
    try {
      await clerk.signOut();
      router.refresh();
    } catch (err: any) {
      console.error("Sign out error:", err);
      setErrorMsg("Failed to clear session. Please refresh the page.");
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clerk.client) return;
    setErrorMsg(null);
    setIsLoading(true);

    try {
      // If there is an active session, sign out first to ensure a clean login
      if (clerk.session) {
        await clerk.signOut();
      }

      const res = await clerk.client.signIn.create({
        identifier: email.trim(),
        password,
      });

      if (res.status === "complete") {
        await clerk.setActive({ session: res.createdSessionId });
        router.push("/dashboard");
      } else {
        setErrorMsg("Further verification required. Please check your credentials or contact administrator.");
      }
    } catch (err: any) {
      const firstError = err?.errors?.[0];
      const message = firstError?.longMessage || firstError?.message || "Invalid email or password.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clerk.client || !email.trim()) {
      setErrorMsg("Please enter your registered staff email address.");
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      await clerk.client.signIn.create({
        strategy: "reset_password_email_code" as any,
        identifier: email.trim(),
      });
      setCodeSent(true);
    } catch (err: any) {
      const firstError = err?.errors?.[0];
      setErrorMsg(firstError?.longMessage || firstError?.message || "Unable to send password reset code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clerk.client) return;
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await (clerk.client.signIn as any).attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: resetCode.trim(),
        password: newPassword,
      });

      if (res.status === "complete") {
        setResetSuccess(true);
        await clerk.setActive({ session: res.createdSessionId });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setErrorMsg("Verification incomplete. Please check the code and try again.");
      }
    } catch (err: any) {
      const firstError = err?.errors?.[0];
      setErrorMsg(firstError?.longMessage || firstError?.message || "Invalid verification code or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0a1628]/95 border border-[#00c8e0]/20 backdrop-blur-xl shadow-2xl rounded-2xl p-6 sm:p-8">
      {/* Existing Session Notice Banner with Actionable Controls */}
      {userLoaded && isSignedIn && (
        <div className="mb-5 p-4 rounded-xl bg-[#0f2444] border border-[#00c8e0]/30 text-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-semibold text-white">Active Session Detected</span>
            <span className="text-[10px] text-[#00c8e0] bg-[#00c8e0]/10 px-2 py-0.5 rounded-full border border-[#00c8e0]/20 font-mono">
              {user?.primaryEmailAddress?.emailAddress || "Signed In"}
            </span>
          </div>
          <p className="text-[#a8b8d0] leading-relaxed mb-3">
            You are signed into Clerk. You can proceed directly to the dashboard, or switch accounts below.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Go to Dashboard</span>
            </button>
            <button
              type="button"
              disabled={isSigningOut}
              onClick={handleSignOut}
              className="py-2 px-3 rounded-lg bg-[#050d1a] border border-[#152a52] hover:border-red-500/40 text-red-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {isSigningOut ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
              <span>Sign Out / Switch</span>
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMsg}</span>
        </div>
      )}

      {resetSuccess && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Password reset successful! Redirecting to inventory dashboard...</span>
        </div>
      )}

      {!isForgotMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#a8b8d0] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#a8b8d0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@heliumpharmacy.ng"
                className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00c8e0] transition-colors placeholder:text-[#a8b8d0]/50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#a8b8d0]">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsForgotMode(true);
                  setErrorMsg(null);
                }}
                className="text-[11px] text-[#00c8e0] hover:text-[#7fe8f5] transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#a8b8d0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-[#00c8e0] transition-colors placeholder:text-[#a8b8d0]/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a8b8d0] hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-bold text-xs shadow-lg shadow-[#00c8e0]/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : !codeSent ? (
        <form onSubmit={handleSendResetCode} className="space-y-4">
          <div className="text-xs text-[#a8b8d0] mb-2 leading-relaxed">
            Enter your staff email address to receive a secure password reset code.
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a8b8d0] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#a8b8d0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@heliumpharmacy.ng"
                className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00c8e0] transition-colors placeholder:text-[#a8b8d0]/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-bold text-xs shadow-lg shadow-[#00c8e0]/20 hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isLoading ? "Sending Code..." : "Send Reset Code"}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsForgotMode(false);
              setErrorMsg(null);
            }}
            className="w-full text-center text-xs text-[#a8b8d0] hover:text-white transition-colors pt-2"
          >
            &larr; Back to Staff Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="text-xs text-[#a8b8d0] mb-2">
            Verification code sent to <strong className="text-white">{email}</strong>.
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a8b8d0] mb-1.5">
              Reset Code
            </label>
            <input
              type="text"
              required
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder="e.g. 123456"
              className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00c8e0] font-mono tracking-widest text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a8b8d0] mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00c8e0]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-bold text-xs shadow-lg shadow-[#00c8e0]/20 hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isLoading ? "Updating Password..." : "Set New Password & Sign In"}
          </button>
        </form>
      )}
    </div>
  );
}


