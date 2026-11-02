import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/components/lib/constants";

export function ProductCategories() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--helium-navy-800)" }}
    >
      {/* Top separator */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, rgba(108,77,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-[0.22em] font-[family-name:var(--font-geist-mono)] block mb-4"
            style={{ color: "var(--helium-cyan)" }}
          >
            Browse by Category
          </span>
          <h2
            id="products-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text mb-4"
          >
            Product Categories
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--helium-silver)" }}
          >
            Quality-verified products across every category — all sourced from
            reputable pharmaceutical manufacturers and suppliers.
          </p>
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCT_CATEGORIES.map((cat) => (
            <article
              key={cat.id}
              className="relative rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:[box-shadow:0_8px_32px_rgba(0,0,0,0.3)]"
              style={{
                background: "rgba(10,22,40,0.75)",
                border: "1px solid rgba(0,200,224,0.08)",
              }}
              aria-label={cat.name}
            >
              {/* Accent stripe at top */}
              <div
                className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                style={{ background: cat.accent }}
              />

              <div className="p-7">
                {/* Category name */}
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: "var(--helium-white)" }}
                >
                  {cat.name}
                </h3>

                {/* Descriptor */}
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em] mb-4 font-[family-name:var(--font-geist-mono)]"
                  style={{ color: cat.accent }}
                >
                  {cat.descriptor}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--helium-silver)" }}
                >
                  {cat.desc}
                </p>

                {/* CTA */}
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                  style={{ color: cat.accent }}
                  aria-label={`View ${cat.name} category`}
                >
                  View Category
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Hover shimmer */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 active:scale-95 text-white bg-[var(--helium-blue)] hover:bg-[var(--helium-blue-light)] hover:[box-shadow:0_0_20px_rgba(26,108,246,0.5)]"
          >
            Explore All Categories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
