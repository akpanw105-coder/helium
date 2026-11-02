import Link from "next/link";
import React from "react";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  colorLight: string;
};

function getServices(): ServiceItem[] {
  return [
    {
      id: "rx",
      title: "Prescription Dispensing",
      description:
        "Accurate, safe, and timely dispensing of your prescriptions by licensed pharmacists. Every prescription is verified and accompanied by clear counselling.",
      icon: <RxIcon />,
      color: "var(--helium-blue)",
      colorLight: "rgba(26,108,246,0.12)",
    },
    {
      id: "otc",
      title: "Over-the-Counter Advice",
      description:
        "Expert guidance on OTC products for common ailments. Our pharmacists help you choose the right remedy, dosage, and flag when a doctor visit is needed.",
      icon: <PillIcon />,
      color: "var(--helium-cyan)",
      colorLight: "rgba(0,200,224,0.1)",
    },
    {
      id: "consult",
      title: "Health Consultations",
      description:
        "Private one-on-one pharmacist consultations for medication queries, chronic disease management, wellness goals, and more — all in confidence.",
      icon: <ConsultIcon />,
      color: "var(--helium-violet)",
      colorLight: "rgba(108,77,246,0.1)",
    },
    {
      id: "wellness",
      title: "Wellness Products",
      description:
        "A curated, quality-verified selection of vitamins, supplements, personal care, and health monitoring products to support your everyday wellbeing.",
      icon: <WellnessIcon />,
      color: "var(--helium-cyan-light)",
      colorLight: "rgba(127,232,245,0.08)",
    },
  ];
}

export function FeaturedServices() {
  const services = getServices();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--helium-navy)" }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(26,108,246,0.08) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-[0.22em] font-[family-name:var(--font-geist-mono)] block mb-4"
            style={{ color: "var(--helium-cyan)" }}
          >
            What We Offer
          </span>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text mb-4"
          >
            Our Services
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--helium-silver)" }}
          >
            From prescription dispensing to holistic wellness support, every
            service at HELIUM is delivered with professional expertise and
            genuine care.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <article
              key={service.id}
              className="glass-card p-7 flex flex-col gap-5 group"
              aria-label={service.title}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:[box-shadow:0_0_16px_rgba(0,0,0,0.3)]"
                style={{
                  background: service.colorLight,
                  border: `1px solid ${service.color}30`,
                }}
              >
                <span style={{ color: service.color }}>{service.icon}</span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <h3
                  className="font-bold text-lg leading-snug"
                  style={{ color: "var(--helium-white)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "var(--helium-silver)" }}
                >
                  {service.description}
                </p>
              </div>

              {/* Accent line */}
              <div
                className="h-px w-full rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, ${service.color}, transparent)`,
                }}
              />
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 hover:[box-shadow:0_0_16px_rgba(0,200,224,0.25)] active:scale-95"
            style={{
              color: "var(--helium-cyan)",
              border: "1px solid rgba(0,200,224,0.3)",
              background: "rgba(0,200,224,0.04)",
            }}
          >
            View All Services
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Inline SVG icons
function RxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      <path d="M13 13l4 4m0-4l-4 4" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 20.5L3.5 13.5a5 5 0 017.07-7.07l7 7a5 5 0 01-7.07 7.07z" />
      <line x1="8.5" y1="11.5" x2="15.5" y2="11.5" />
    </svg>
  );
}

function ConsultIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function WellnessIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
