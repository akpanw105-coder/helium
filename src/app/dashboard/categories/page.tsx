import { getAdminSupabase } from "@/lib/supabase";
import { getCurrentStaffProfile, hasPermission } from "@/lib/auth";
import { Plus, Layers, CheckCircle2 } from "lucide-react";
import { revalidatePath } from "next/cache";


async function createCategoryAction(formData: FormData) {
  "use server";
  const staff = await getCurrentStaffProfile();
  if (!staff || !hasPermission(staff.role, ["Owner", "Admin", "Pharmacist"])) {
    return;
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (!name) return;

  const supabase = getAdminSupabase();
  await supabase.from("product_categories").insert({
    name,
    slug,
    description,
    is_active: true,
  });

  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/products");
}

export default async function CategoriesPage() {
  const staff = await getCurrentStaffProfile();
  const canManage = staff ? hasPermission(staff.role, ["Owner", "Admin", "Pharmacist"]) : false;

  const supabase = getAdminSupabase();
  const { data: categories } = await supabase
    .from("product_categories")
    .select("*, products:products(count)")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Product Categories</h1>
        <p className="text-xs text-[#a8b8d0]">
          Organize medicines and pharmacy retail items into clinical and department classifications.
        </p>
      </div>

      {canManage && (
        <div className="bg-[#0a1628]/80 border border-[#00c8e0]/20 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-white mb-3">Add Category</h2>
          <form action={createCategoryAction} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Category Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Cardiovascular & Antihypertensives"
                className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#a8b8d0] mb-1">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Brief clinical or storage description"
                className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-xl px-3 py-2.5 focus:border-[#00c8e0] focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-semibold text-xs shadow-md shadow-[#00c8e0]/20 hover:opacity-90"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories && categories.length > 0 ? (
          categories.map((cat) => {
            const count = (cat.products as any)?.[0]?.count || 0;
            return (
              <div
                key={cat.id}
                className="bg-[#0a1628]/80 border border-[#00c8e0]/15 rounded-2xl p-5 hover:border-[#00c8e0]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-white text-sm">{cat.name}</div>
                  <span className="text-[10px] bg-[#152a52] text-[#00c8e0] px-2 py-0.5 rounded-full font-mono">
                    {count} items
                  </span>
                </div>
                <p className="text-xs text-[#a8b8d0]">
                  {cat.description || "No description provided."}
                </p>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-xs text-[#a8b8d0] bg-[#0a1628]/40 border border-[#152a52] rounded-2xl">
            No categories defined yet. Add categories above to organize your inventory.
          </div>
        )}
      </div>
    </div>
  );
}

