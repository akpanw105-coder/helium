"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS, BRAND } from "@/components/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = `https://wa.me/${BRAND.whatsappNumber}`;

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-4"
          }`}
        style={{
          background: scrolled
            ? "rgba(5, 13, 26, 0.92)"
            : "rgba(5, 13, 26, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0, 200, 224, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left section: Discreet Inventory Access Button & Brand Logo */}
            <div className="flex items-center gap-2">
              {/* Subtle Inventory Access Button: compact, discreet, brand-aligned */}
              <Link
                href="/staff/sign-in"
                title="Staff & Inventory Portal"
                aria-label="Staff & Inventory Portal"
                className="w-7 h-7 rounded-lg border border-[#00c8e0]/20 bg-[#0a1628]/60 hover:bg-[#00c8e0]/10 hover:border-[#00c8e0]/40 flex items-center justify-center transition-all duration-200 group/staff shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c8e0]/70 group-hover/staff:bg-[#00c8e0] group-hover/staff:scale-125 transition-all duration-200" />
              </Link>

              {/* Logo */}
              <Link
                href="/"
                aria-label="HELIUM Pharmacy — Home"
                className="flex items-center gap-1 group"
              >
                <span
                  className="text-2xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)] transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(26,108,246,0.7)]"
                  style={{ color: "var(--helium-blue)" }}
                >
                  HE
                </span>
                <span
                  className="text-2xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)]"
                  style={{ color: "var(--helium-white)" }}
                >
                  LIUM
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-white"
                  style={{ color: "var(--helium-silver)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--helium-white)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(26,108,246,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--helium-silver)";
                    (e.currentTarget as HTMLElement).style.background = "";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all duration-300 hover:[box-shadow:0_0_20px_rgba(37,211,102,0.5)]"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon />
                Enquire via WhatsApp
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg transition-colors duration-200 hover:bg-[rgba(26,108,246,0.1)]"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className={`block h-0.5 w-6 rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                style={{ background: "var(--helium-cyan)" }}
              />
              <span
                className={`block h-0.5 w-6 rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                  }`}
                style={{ background: "var(--helium-cyan)" }}
              />
              <span
                className={`block h-0.5 w-6 rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                style={{ background: "var(--helium-cyan)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        whatsappHref={whatsappHref}
      />
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
