import React from "react";
import { BRAND } from "@/components/lib/constants";

export function ContactSection() {
  const whatsappHref = `https://wa.me/${BRAND.whatsappNumber}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--helium-navy-800)" }}
    >
      {/* Top separator */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(37,211,102,0.05) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-[0.22em] font-[family-name:var(--font-geist-mono)] block mb-4"
            style={{ color: "var(--helium-cyan)" }}
          >
            Reach Us
          </span>
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text mb-4"
          >
            Get in Touch
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--helium-silver)" }}
          >
            Have a question, prescription enquiry, or wellness need? We are here
            to help — reach out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Contact details + map placeholder */}
          <div className="flex flex-col gap-6">
            {/* Contact items */}
            <div className="glass-card p-7 flex flex-col gap-5">
              <h3
                className="font-bold text-base uppercase tracking-[0.15em] font-[family-name:var(--font-geist-mono)]"
                style={{ color: "var(--helium-cyan)" }}
              >
                Contact Information
              </h3>

              <ContactItem
                icon={<LocationIcon />}
                label="Address"
                value={BRAND.address}
              />
              <ContactItem
                icon={<PhoneIcon />}
                label="Phone"
                value={BRAND.phone}
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
              />
              <ContactItem
                icon={<WhatsAppIcon />}
                label="WhatsApp"
                value={BRAND.whatsappNumber}
                href={whatsappHref}
                external
              />
              <ContactItem
                icon={<EmailIcon />}
                label="Email"
                value={BRAND.email}
                href={`mailto:${BRAND.email}`}
              />
              <ContactItem
                icon={<ClockIcon />}
                label="Opening Hours"
                value={BRAND.hours}
              />
            </div>

            {/* Visit Us card */}
            <div
              className="relative rounded-xl overflow-hidden p-6"
              style={{
                background: "rgba(10,22,40,0.7)",
                border: "1px solid rgba(0,200,224,0.15)",
              }}
            >
              <div className="grid-pattern absolute inset-0 opacity-20 pointer-events-none" />
              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{
                    background: "rgba(0,200,224,0.1)",
                    border: "1px solid rgba(0,200,224,0.25)",
                    color: "var(--helium-cyan)",
                  }}
                >
                  <LocationIcon />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1 font-[family-name:var(--font-geist-mono)]"
                    style={{ color: "var(--helium-cyan)" }}
                  >
                    Visit Our Pharmacy
                  </p>
                  <p
                    className="text-sm font-medium leading-relaxed mb-3"
                    style={{ color: "var(--helium-white)" }}
                  >
                    {BRAND.address}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--helium-silver)" }}
                  >
                    Conveniently located in Victoria Island, Lagos. Walk-ins
                    welcome during opening hours. Parking available on-site.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Plot+14+Victoria+Island+Lagos+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:[box-shadow:0_0_12px_rgba(0,200,224,0.25)]"
                    style={{
                      color: "var(--helium-cyan)",
                      border: "1px solid rgba(0,200,224,0.25)",
                      background: "rgba(0,200,224,0.05)",
                    }}
                  >
                    <MapPinIcon />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — WhatsApp CTA card */}
          <div className="flex flex-col gap-6">
            {/* WhatsApp card */}
            <div
              className="rounded-xl p-8 flex flex-col items-center text-center gap-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,211,102,0.08) 0%, rgba(37,211,102,0.03) 100%)",
                border: "1px solid rgba(37,211,102,0.2)",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(37,211,102,0.15)",
                  border: "1px solid rgba(37,211,102,0.3)",
                  color: "#25D366",
                }}
              >
                <WhatsAppLargeIcon />
              </div>

              <div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "var(--helium-white)" }}
                >
                  Chat with a Pharmacist
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--helium-silver)" }}
                >
                  Get professional advice, enquire about prescriptions, or ask
                  about product availability — directly via WhatsApp. Our
                  pharmacists are available during opening hours.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-xl transition-all duration-300 hover:[box-shadow:0_0_28px_rgba(37,211,102,0.5)] active:scale-95"
                  style={{ background: "#25D366" }}
                >
                  <WhatsAppIcon />
                  Start a Conversation
                </a>
              </div>

              {/* Opening hours note */}
              <div
                className="w-full rounded-lg px-4 py-3 text-center"
                style={{
                  background: "rgba(0,200,224,0.05)",
                  border: "1px solid rgba(0,200,224,0.1)",
                }}
              >
                <p
                  className="text-xs font-[family-name:var(--font-geist-mono)]"
                  style={{ color: "var(--helium-silver)" }}
                >
                  <span style={{ color: "var(--helium-cyan)" }}>Hours:</span>{" "}
                  {BRAND.hours}
                </p>
              </div>
            </div>

            {/* Phone CTA */}
            <div className="glass-card p-6 flex items-center gap-5">
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{
                  background: "rgba(26,108,246,0.1)",
                  border: "1px solid rgba(26,108,246,0.25)",
                  color: "var(--helium-blue-light)",
                }}
              >
                <PhoneIcon />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "var(--helium-silver)" }}
                >
                  Call Us Directly
                </p>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="text-lg font-bold transition-colors duration-200 hover:text-white"
                  style={{ color: "var(--helium-white)" }}
                >
                  {BRAND.phone}
                </a>
              </div>
            </div>

            {/* Email CTA */}
            <div className="glass-card p-6 flex items-center gap-5">
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{
                  background: "rgba(0,200,224,0.08)",
                  border: "1px solid rgba(0,200,224,0.2)",
                  color: "var(--helium-cyan)",
                }}
              >
                <EmailIcon />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "var(--helium-silver)" }}
                >
                  Send Us an Email
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-base font-bold transition-colors duration-200 hover:text-white"
                  style={{ color: "var(--helium-white)" }}
                >
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-200 group-hover:[box-shadow:0_0_10px_rgba(0,200,224,0.2)]"
        style={{
          background: "rgba(0,200,224,0.08)",
          border: "1px solid rgba(0,200,224,0.15)",
          color: "var(--helium-cyan)",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-0.5"
          style={{ color: "var(--helium-silver)" }}
        >
          {label}
        </p>
        <p
          className={`text-sm font-medium transition-colors duration-200 ${href ? "group-hover:text-white" : ""}`}
          style={{ color: "var(--helium-white)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 10.8 19.79 19.79 0 01.75 2.2 2 2 0 012.72.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.87-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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

function WhatsAppLargeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
