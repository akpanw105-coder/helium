import { BRAND, WHY_HELIUM } from "@/components/lib/constants";

const MOLECULAR_VIDEO_URL =
  "https://res.cloudinary.com/oebaqlvj/video/upload/v1793562433/Molecular_structure_rotating_in___7e5a999b.mp4";

export function WhyHelium() {
  return (
    <section
      id="why-helium"
      aria-labelledby="why-helium-heading"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--helium-navy)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,108,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Visual Showcase with Molecular Animation */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <HeliumPharmacyVisual />
          </div>

          {/* Right — Value propositions */}
          <div className="order-1 lg:order-2">
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em] font-[family-name:var(--font-geist-mono)] block mb-4"
              style={{ color: "var(--helium-cyan)" }}
            >
              Our Commitment
            </span>
            <h2
              id="why-helium-heading"
              className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text mb-4"
            >
              Why Choose HELIUM?
            </h2>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "var(--helium-silver)" }}
            >
              We do not just dispense medications — we champion patient safety,
              authentic pharmaceuticals, and personalised healthcare guidance across Nigeria.
            </p>

            {/* Value props */}
            <div className="flex flex-col gap-6">
              {WHY_HELIUM.map((item, index) => (
                <div
                  key={item.id}
                  className="glass-card p-5 sm:p-6 flex gap-5 items-start group"
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:[box-shadow:0_0_16px_rgba(0,200,224,0.3)]"
                    style={{
                      background:
                        index % 2 === 0
                          ? "rgba(26,108,246,0.12)"
                          : "rgba(0,200,224,0.1)",
                      border:
                        index % 2 === 0
                          ? "1px solid rgba(26,108,246,0.3)"
                          : "1px solid rgba(0,200,224,0.25)",
                      color:
                        index % 2 === 0
                          ? "var(--helium-blue-light)"
                          : "var(--helium-cyan)",
                    }}
                  >
                    <ValueIcon icon={item.icon} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3
                      className="font-bold text-lg mb-1.5 leading-snug"
                      style={{ color: "var(--helium-white)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--helium-silver)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeliumPharmacyVisual() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg">
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,224,0.1) 0%, rgba(26,108,246,0.08) 50%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden glass-card p-6 sm:p-8 border border-[rgba(0,200,224,0.2)] shadow-2xl"
        style={{
          background: "rgba(10,22,40,0.85)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "var(--helium-cyan)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-geist-mono)]"
              style={{ color: "var(--helium-cyan)" }}
            >
              Pharmaceutical Assurance
            </span>
          </div>
          <span
            className="text-[11px] px-2.5 py-1 rounded font-mono font-medium"
            style={{
              background: "rgba(26,108,246,0.15)",
              border: "1px solid rgba(26,108,246,0.3)",
              color: "var(--helium-blue-light)",
            }}
          >
            NAFDAC Verified Sources
          </span>
        </div>

        {/* Video preview */}
        <div className="relative my-6 rounded-xl overflow-hidden aspect-video border border-[rgba(0,200,224,0.18)] bg-[rgba(5,13,26,0.8)]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="HELIUM Molecular Formulation Rotating Animation"
            className="w-full h-full object-cover scale-105"
            style={{
              mixBlendMode: "screen",
              filter: "contrast(1.1) brightness(1.05)",
            }}
          >
            <source src={MOLECULAR_VIDEO_URL} type="video/mp4" />
          </video>
          {/* Subtle gradient vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, rgba(5,13,26,0.7) 100%)",
            }}
          />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-[family-name:var(--font-geist-mono)] text-[var(--helium-silver)]">
            <span>Formula Purity Check</span>
            <span className="text-[var(--helium-cyan)] font-semibold">100% Certified</span>
          </div>
        </div>

        {/* Core Pharmacy Pillars */}
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-2">
            The HELIUM Standard
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-[var(--helium-silver)]">
            Rigorous storage, verified supply chains, and compassionate pharmacist consultations for every family in Nigeria.
          </p>
        </div>

        {/* Pharmacy Quality Stats */}
        <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/10">
          {[
            { label: "Authentic Medicines", value: "100%" },
            { label: "Licensed Pharmacists", value: "Expert" },
            { label: "Prescription Accuracy", value: "Verified" },
            { label: "Patient Satisfaction", value: "Top Tier" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3 rounded-lg text-center"
              style={{
                background: "rgba(15,32,64,0.5)",
                border: "1px solid rgba(0,200,224,0.08)",
              }}
            >
              <p className="text-lg font-bold gradient-text-blue">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--helium-silver)] mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValueIcon({ icon }: { icon: string }) {
  if (icon === "shield") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (icon === "graduate") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }
  if (icon === "lock") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    );
  }
  if (icon === "heart") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    );
  }
  return null;
}
