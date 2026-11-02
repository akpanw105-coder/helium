"use client";

import Link from "next/link";
import { Bell, Search, ExternalLink } from "lucide-react";
import { StaffProfile } from "@/lib/auth";

interface DashboardHeaderProps {
  staff: StaffProfile | null;
}

export function DashboardHeader({ staff }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-[#00c8e0]/15 bg-[#0a1628]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#a8b8d0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inventory, products, transactions..."
            className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-[#00c8e0] transition-colors placeholder:text-[#a8b8d0]/60"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Public site link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#a8b8d0] hover:text-[#00c8e0] px-3 py-1.5 rounded-lg border border-[#152a52] hover:border-[#00c8e0]/40 transition-colors"
        >
          <span>View Public Pharmacy</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notifications badge */}
        <div className="relative">
          <button className="p-2 text-[#a8b8d0] hover:text-white rounded-xl hover:bg-[#0f2040] transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#00c8e0] absolute top-1.5 right-1.5 animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
}

