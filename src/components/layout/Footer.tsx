import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/components/lib/constants";

const FOOTER_SERVICES = [
  "Prescription Dispensing",
  "OTC Medicines Advice",
  "Health Consultations",
  "Wellness Products",
  "Baby & Maternal Care",
  "Chronic Disease Support",
];

export function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{ background: "var(--helium-navy-800)" }}
      className="relative"
    >
      {/* Top gradient divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="HELIUM Pharmacy home" className="inline-flex items-center gap-1 mb-4 group">
              <span
                className="text-xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)] group-hover:[text-shadow:0_0_10px_rgba(26,108,246,0.7)] transition-all duration-300"
                style={{ color: "var(--helium-blue)" }}
              >
                HE
              </span>
              <span
                className="text-xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)]"
                style={{ color: "var(--helium-white)" }}
              >
                LIUM
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--helium-silver)" }}
            >
              A premium Nigeria-based pharmacy brand dedicated to delivering
              authentic medicines, expert pharmacist care, and a superior health
              experience.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <SocialLink href={BRAND.instagram} label="Follow us on Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={BRAND.twitter} label="Follow us on X (Twitter)">
                <XIcon />
              </SocialLink>
              <SocialLink href={BRAND.facebook} label="Follow us on Facebook">
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-5 font-[family-name:var(--font-geist-mono)]"
              style={{ color: "var(--helium-cyan)" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "var(--helium-silver)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-5 font-[family-name:var(--font-geist-mono)]"
              style={{ color: "var(--helium-cyan)" }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "var(--helium-silver)" }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-5 font-[family-name:var(--font-geist-mono)]"
              style={{ color: "var(--helium-cyan)" }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5" role="list">
              <li>
                <p className="text-xs mb-0.5 font-medium" style={{ color: "var(--helium-cyan-light)" }}>Address</p>
                <p className="text-sm" style={{ color: "var(--helium-silver)" }}>{BRAND.address}</p>
              </li>
              <li>
                <p className="text-xs mb-0.5 font-medium" style={{ color: "var(--helium-cyan-light)" }}>Phone</p>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "var(--helium-silver)" }}
                >
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <p className="text-xs mb-0.5 font-medium" style={{ color: "var(--helium-cyan-light)" }}>Email</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "var(--helium-silver)" }}
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <p className="text-xs mb-0.5 font-medium" style={{ color: "var(--helium-cyan-light)" }}>Hours</p>
                <p className="text-sm" style={{ color: "var(--helium-silver)" }}>{BRAND.hours}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--helium-silver)" }}>
            &copy; 2025 HELIUM Pharmacy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "var(--helium-silver)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/#contact"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "var(--helium-silver)" }}
            >
              Terms of Service
            </Link>
            <Link
              href="/#contact"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "var(--helium-navy-600)" }}
              aria-label="Contact us"
            >
              Staff Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:[color:var(--helium-cyan)] hover:[border-color:rgba(0,200,224,0.4)] hover:[box-shadow:0_0_12px_rgba(0,200,224,0.3)]"
      style={{
        background: "rgba(15,32,64,0.7)",
        border: "1px solid rgba(0,200,224,0.12)",
        color: "var(--helium-silver)",
      }}
    >
      {children}
    </a>
  );
}

import React from "react";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
