import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { createSupplierAction } from "@/actions/admin-actions";
import { Truck, Plus, Mail, Phone, MapPin } from "lucide-react";


export default async function SuppliersPage() {
  const staff = await getCurrentStaffProfile();
  const canManage = staff ? hasPermission(staff.role, ["Owner", "Admin", "Inventory Staff"]) : false;

  const supabase = getAdminSupabase();
  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Suppliers & Distributors</h1>
        <p className="text-xs text-[#a8b8d0]">
          Verified pharmaceutical manufacturers and Tier-1 licensed medicine distributors.
        </p>
      </div>

      {canManage && (
        <details className="bg-[#0a1628]/80 border border-[#00c8e0]/20 rounded-2xl p-5 group">
          <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-white">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00c8e0]" />
              <span>Register New Supplier</span>
            </div>
            <span className="text-xs text-[#a8b8d0] group-open:hidden">+ Open Form</span>
          </summary>

          <form action={createSupplierAction} className="mt-4 space-y-3 pt-3 border-t border-[#152a52]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Company / Supplier Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Worldwide Healthcare Ltd"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contact_person"
                  placeholder="Key Account Representative"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+234..."
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="orders@supplier.com"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Payment Terms</label>
                <input
                  type="text"
                  name="payment_terms"
                  placeholder="e.g. Net 30 Days, COD"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Physical Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Warehouse / Depot location"
                  className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs shadow-md shadow-[#00c8e0]/20 hover:opacity-90"
              >
                Register Supplier
              </button>
            </div>
          </form>
        </details>
      )}

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers && suppliers.length > 0 ? (
          suppliers.map((s) => (
            <div
              key={s.id}
              className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5 space-y-3 hover:border-[#00c8e0]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">{s.name}</h3>
                <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  Active
                </span>
              </div>

              <div className="space-y-1 text-xs text-[#a8b8d0]">
                {s.contact_person && <div>Contact: <span className="text-white">{s.contact_person}</span></div>}
                {s.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#00c8e0]" /> {s.phone}</div>}
                {s.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-[#00c8e0]" /> {s.email}</div>}
                {s.payment_terms && <div>Terms: <span className="text-[#00c8e0] font-mono">{s.payment_terms}</span></div>}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-xs text-[#a8b8d0] bg-[#0a1628]/40 border border-[#152a52] rounded-2xl">
            No suppliers registered yet. Add pharmaceutical vendors above to begin logging purchase orders.
          </div>
        )}
      </div>
    </div>
  );
}

