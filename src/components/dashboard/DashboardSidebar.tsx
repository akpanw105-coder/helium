"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  Calendar,
  ShoppingCart,
  Receipt,
  Truck,
  FileSpreadsheet,
  BarChart3,
  Users,
  Settings,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { StaffProfile } from "@/lib/auth";

interface DashboardSidebarProps {
  staff: StaffProfile | null;
}

export function DashboardSidebar({ staff }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: ["Owner", "Admin", "Pharmacist", "Inventory Staff", "Cashier"] },
    { name: "Products", href: "/dashboard/products", icon: Package, roles: ["Owner", "Admin", "Pharmacist", "Inventory Staff"] },
    { name: "Categories", href: "/dashboard/categories", icon: Layers, roles: ["Owner", "Admin", "Pharmacist", "Inventory Staff"] },
    { name: "Inventory Stock", href: "/dashboard/inventory", icon: Boxes, roles: ["Owner", "Admin", "Pharmacist", "Inventory Staff"] },
    { name: "Batches & Expiry", href: "/dashboard/batches", icon: Calendar, roles: ["Owner", "Admin", "Pharmacist", "Inventory Staff"] },
    { name: "Point of Sale", href: "/dashboard/sales", icon: ShoppingCart, roles: ["Owner", "Admin", "Pharmacist", "Cashier"] },
    { name: "Transactions", href: "/dashboard/transactions", icon: Receipt, roles: ["Owner", "Admin", "Pharmacist", "Cashier"] },
    { name: "Suppliers", href: "/dashboard/suppliers", icon: Truck, roles: ["Owner", "Admin", "Inventory Staff"] },
    { name: "Purchase Orders", href: "/dashboard/purchases", icon: FileSpreadsheet, roles: ["Owner", "Admin", "Inventory Staff"] },
    { name: "Reports & Analytics", href: "/dashboard/reports", icon: BarChart3, roles: ["Owner", "Admin", "Pharmacist"] },
    { name: "Staff Management", href: "/dashboard/staff", icon: Users, roles: ["Owner", "Admin"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["Owner", "Admin"] },
  ];

  const userRole = staff?.role || "Cashier";

  const allowedNav = navigation.filter((item) =>
    userRole === "Owner" ? true : item.roles.includes(userRole)
  );

  return (
    <aside className="w-64 border-r border-[#00c8e0]/15 bg-[#0a1628]/95 backdrop-blur-md flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30">
      <div>
        {/* Brand header */}
        <div className="p-5 border-b border-[#00c8e0]/15 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a6cf6] to-[#00c8e0] flex items-center justify-center shadow-md shadow-[#00c8e0]/20">
              <span className="font-bold text-lg text-white">H</span>
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-wider text-white">
                HELIUM<span className="text-[#00c8e0]">.</span>
              </div>
              <div className="text-[10px] text-[#a8b8d0] uppercase tracking-wider font-semibold">
                Staff Portal
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
          {allowedNav.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${isActive
                    ? "bg-gradient-to-r from-[#1a6cf6]/20 to-[#00c8e0]/20 text-[#00c8e0] border border-[#00c8e0]/30 shadow-sm"
                    : "text-[#a8b8d0] hover:text-white hover:bg-[#0f2040]/60"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${isActive
                        ? "text-[#00c8e0]"
                        : "text-[#a8b8d0] group-hover:text-white"
                      }`}
                  />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#00c8e0]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Staff profile bar */}
      <div className="p-4 border-t border-[#00c8e0]/15 bg-[#050d1a]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <UserButton />
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">
                {staff ? `${staff.first_name} ${staff.last_name}` : "Pharmacy Staff"}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-medium text-[#00c8e0] bg-[#00c8e0]/10 px-1.5 py-0.5 rounded-full border border-[#00c8e0]/20">
                <ShieldCheck className="w-2.5 h-2.5" />
                {userRole}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
