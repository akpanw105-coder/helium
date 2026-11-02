import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HELIUM Pharmacy — Premium Pharmacy. Exceptional Care.",
    template: "%s | HELIUM Pharmacy",
  },
  description:
    "HELIUM is a premium Nigeria-based pharmacy brand delivering authentic medicines, expert pharmacist guidance, and a superior healthcare experience. Based in Lagos, Nigeria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en-NG"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <body
          className="flex flex-col min-h-screen"
          style={{ background: "var(--helium-navy)", color: "var(--helium-white)" }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
