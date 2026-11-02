import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { WhyHelium } from "@/components/sections/WhyHelium";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Introduction />
        <FeaturedServices />
        <ProductCategories />
        <WhyHelium />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

