import Link from "next/link";
import { BRAND } from "@/components/lib/constants";

const MOLECULAR_VIDEO_URL =
  "https://res.cloudinary.com/oebaqlvj/video/upload/v1793562433/Molecular_structure_rotating_in___7e5a999b.mp4";

export function Hero() {
  const whatsappHref = `https://wa.me/${BRAND.whatsappNumber}`;

  return (
    <section
      aria-label="Hero — HELIUM Pharmacy"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, var(--helium-navy-700) 0%, var(--helium-navy) 70%)",
      }}
    >
      {/* Decorative background dots */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Soft radial glow accents */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,224,0.15) 0%, rgba(26,108,246,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute left-1/4 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,224,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Decorative floating dots */}
      <DecorativeDots />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left — Text content */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            {/* Overline */}
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8 inline-block"
                style={{ background: "var(--helium-cyan)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-[0.25em] font-[family-name:var(--font-geist-mono)]"
                style={{ color: "var(--helium-cyan)" }}
              >
                Premium Nigerian Pharmacy
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="gradient-text">
                Your Health,
                <br />
                Our Commitment.
              </span>
            </h1>

            {/* Supporting text */}
            <p
              className="text-lg sm:text-xl leading-relaxed max-w-lg"
              style={{ color: "var(--helium-silver)" }}
            >
              HELIUM is a premium pharmacy brand redefining healthcare access
              in Nigeria — authentic medicines, expert pharmacists, and a care
              experience built around you.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-lg transition-all duration-300 hover:[box-shadow:0_0_24px_rgba(37,211,102,0.55)] active:scale-95"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon />
                Chat with a Pharmacist
              </a>
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 hover:[box-shadow:0_0_16px_rgba(0,200,224,0.25)] active:scale-95"
                style={{
                  color: "var(--helium-cyan)",
                  border: "1px solid var(--helium-cyan)",
                  background: "rgba(0,200,224,0.05)",
                }}
              >
                Explore Services
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
              <TrustPill label="Licensed Pharmacists" />
              <TrustPill label="Verified Products" />
              <TrustPill label="Confidential Care" />
            </div>
          </div>

          {/* Right — Molecular Video Animation */}
          <div className="relative flex items-center justify-center w-full">
            <MolecularHeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--helium-navy))",
        }}
      />
    </section>
  );
}

function MolecularHeroVisual() {
  return (
    <div className="relative w-full max-w-lg sm:max-w-xl aspect-square flex items-center justify-center">
      {/* Outer ambient glow rings */}
      <div
        className="absolute inset-0 rounded-3xl animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,224,0.12) 0%, rgba(26,108,246,0.08) 50%, transparent 75%)",
          border: "1px solid rgba(0,200,224,0.2)",
        }}
      />

      <div
        className="absolute -inset-4 rounded-[2rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(26,108,246,0.15) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* Main Glass Screen Frame */}
      <div
        className="relative z-10 w-full h-full rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl"
        style={{
          background: "rgba(5, 13, 26, 0.75)",
          border: "1px solid rgba(0, 200, 224, 0.28)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "0 0 50px rgba(0, 200, 224, 0.12), inset 0 0 30px rgba(26, 108, 246, 0.15)",
        }}
      >
        {/* Subtle decorative grid background for scientific aesthetic */}
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

        {/* Video stream with fallbacks */}
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="HELIUM Pharmacy — Authenticated Medicine Portfolio"
            className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
            style={{
              mixBlendMode: "screen",
              filter: "contrast(1.1) brightness(1.05)",
            }}
          >
            <source src={MOLECULAR_VIDEO_URL} type="video/mp4" />
            {/* Fallback visual representation */}
            <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
              <MoleculeIcon />
              <p className="text-xs mt-3 text-[var(--helium-silver)]">
                HELIUM Pharmacy — Premium Healthcare
              </p>
            </div>
          </video>

          {/* Vignette & color blending overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, rgba(5,13,26,0.6) 80%, rgba(5,13,26,0.95) 100%)",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,200,224,0.2) 0%, transparent 60%, rgba(108,77,246,0.2) 100%)",
            }}
          />
        </div>

        {/* Pharmacy HUD Elements */}
        {/* Top-left status badge */}
        <div
          className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(10, 22, 40, 0.85)",
            border: "1px solid rgba(0, 200, 224, 0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ background: "var(--helium-cyan)" }}
          />
          <span
            className="text-[11px] font-semibold tracking-wider font-[family-name:var(--font-geist-mono)]"
            style={{ color: "var(--helium-cyan-light)" }}
          >
            HELIUM PHARMACY — LAGOS, NIGERIA
          </span>
        </div>

        {/* Bottom indicator overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5 flex items-center justify-between"
          style={{
            background:
              "linear-gradient(to top, rgba(5,13,26,0.92) 0%, rgba(5,13,26,0.5) 70%, transparent 100%)",
          }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] font-[family-name:var(--font-geist-mono)]"
              style={{ color: "var(--helium-cyan)" }}
            >
              Authentic Medicines
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: "var(--helium-silver)" }}
            >
              Verified prescriptions dispensed by licensed pharmacists
            </p>
          </div>
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono"
            style={{
              background: "rgba(0, 200, 224, 0.08)",
              border: "1px solid rgba(0, 200, 224, 0.2)",
              color: "var(--helium-cyan)",
            }}
          >
            <span>NAFDAC Verified</span>
          </div>
        </div>

        {/* Corner Accents */}
        <CornerAccent position="top-left" />
        <CornerAccent position="top-right" />
        <CornerAccent position="bottom-left" />
        <CornerAccent position="bottom-right" />
      </div>
    </div>
  );
}

function CornerAccent({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const posClass = {
    "top-left": "top-3 left-3 border-t border-l",
    "top-right": "top-3 right-3 border-t border-r",
    "bottom-left": "bottom-3 left-3 border-b border-l",
    "bottom-right": "bottom-3 right-3 border-b border-r",
  }[position];
  return (
    <span
      className={`absolute w-3.5 h-3.5 z-20 pointer-events-none ${posClass}`}
      style={{ borderColor: "var(--helium-cyan)" }}
    />
  );
}

function TrustPill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--helium-cyan)" }}
      />
      <span
        className="text-xs font-medium"
        style={{ color: "var(--helium-silver)" }}
      >
        {label}
      </span>
    </div>
  );
}

function DecorativeDots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { top: "15%", left: "8%", size: 3, delay: "0s" },
        { top: "30%", left: "5%", size: 2, delay: "1s" },
        { top: "70%", left: "12%", size: 4, delay: "2s" },
        { top: "80%", left: "6%", size: 2, delay: "0.5s" },
        { top: "20%", right: "10%", size: 3, delay: "1.5s" },
        { top: "60%", right: "5%", size: 2, delay: "0.8s" },
      ].map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: "left" in dot ? dot.left : undefined,
            right: "right" in dot ? (dot as { right: string }).right : undefined,
            background: i % 2 === 0 ? "var(--helium-cyan)" : "var(--helium-blue)",
            opacity: 0.4,
            animationDelay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

function MoleculeIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      style={{ color: "var(--helium-cyan)" }}
    >
      <circle cx="20" cy="20" r="5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="8" cy="10" r="3" fill="currentColor" fillOpacity="0.5" />
      <circle cx="32" cy="10" r="3" fill="currentColor" fillOpacity="0.5" />
      <circle cx="8" cy="30" r="3" fill="currentColor" fillOpacity="0.5" />
      <circle cx="32" cy="30" r="3" fill="currentColor" fillOpacity="0.5" />
      <line x1="20" y1="15" x2="10" y2="13" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="20" y1="15" x2="30" y2="13" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="20" y1="25" x2="10" y2="27" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="20" y1="25" x2="30" y2="27" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
