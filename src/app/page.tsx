import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { GoldCalculator } from "@/components/sections/GoldCalculator";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { LoanReleaseSection } from "@/components/sections/LoanReleaseSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Cashiogold – Sell Gold for Instant Cash | Best Gold Buyers in India",
  description:
    "Cashiogold offers the best market rates for your gold. Sell gold for instant cash, transparent valuation, and same-day payment. Gold loan release assistance available across India.",
  alternates: {
    canonical: "https://cashiogold.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GoldCalculator />
      <ServicesSection />
      <LoanReleaseSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
