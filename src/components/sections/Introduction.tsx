export function Introduction() {
  const stats = [
    {
      value: "Verified Authentic Medicines",
      desc: "Every product is sourced from licensed manufacturers and vetted for clinical authenticity before it reaches your hands.",
      icon: <ShieldCheckIcon />,
    },
    {
      value: "Expert Pharmacist Team",
      desc: "Our registered pharmacists guide every step of your healthcare journey — from prescription verification to chronic care support.",
      icon: <GraduateIcon />,
    },
    {
      value: "Your Wellness, Our Priority",
      desc: "Your health and wellbeing sit at the centre of everything we do, from our store environment to our digital care channels.",
      icon: <HeartCrossIcon />,
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="intro-heading"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--helium-navy-800)" }}
    >
      {/* Top separator */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(26,108,246,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-[0.22em] font-[family-name:var(--font-geist-mono)] block mb-4"
            style={{ color: "var(--helium-cyan)" }}
          >
            About HELIUM
          </span>
          <h2
            id="intro-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 gradient-text"
          >
            A New Standard in Nigerian Pharmacy
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--helium-silver)" }}
          >
            HELIUM was founded on a simple belief: every Nigerian deserves access
            to authentic, high-quality medicines and the guidance of expert
            pharmacists — delivered with the dignity and care you deserve. We
            combine modern pharmacy practice with a commitment to building genuine
            trust with every patient.
          </p>
        </div>

        {/* Stats/values row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon accent */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 text-lg transition-all duration-300 group-hover:[box-shadow:0_0_16px_rgba(0,200,224,0.3)]"
                style={{
                  background: "rgba(0,200,224,0.08)",
                  border: "1px solid rgba(0,200,224,0.2)",
                  color: "var(--helium-cyan)",
                }}
              >
                {stat.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3 gradient-text-blue"
              >
                {stat.value}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--helium-silver)" }}
              >
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GraduateIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function HeartCrossIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      <line x1="12" y1="9" x2="12" y2="15" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  );
}
