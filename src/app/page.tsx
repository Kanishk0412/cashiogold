import type { Metadata } from "next";
import { HeroSection }         from "@/components/sections/HeroSection";
import { GoldCalculator }      from "@/components/sections/GoldCalculator";
import { ServicesSection }     from "@/components/sections/ServicesSection";
import { LoanReleaseSection }  from "@/components/sections/LoanReleaseSection";
import { ProcessSection }      from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection }          from "@/components/sections/FAQSection";
import { CTASection }          from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Cashiogold – Sell Gold for Instant Cash | Best Gold Buyers in India",
  description:
    "Cashiogold offers the best market rates for your gold. Sell gold for instant cash, transparent valuation, and same-day payment. Gold loan release assistance available.",
  alternates: { canonical: "https://cashiogold.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How does Cashiogold determine the price of my gold?",
      acceptedAnswer: { "@type": "Answer", text: "We use live international gold market rates (LBMA) converted to INR. Our certified evaluators assess purity using BIS-certified XRF testing and calculate value based on weight × purity × current rate." } },
    { "@type": "Question", name: "What types of gold do you buy?",
      acceptedAnswer: { "@type": "Answer", text: "We buy all forms: jewellery, gold coins, gold bars, broken or damaged jewellery, and old ornaments from 10K to 24K purity." } },
    { "@type": "Question", name: "How quickly will I get paid?",
      acceptedAnswer: { "@type": "Answer", text: "Payment is instant. Cash (up to ₹2 lakhs) or NEFT/RTGS/UPI bank transfer within the same business day." } },
    { "@type": "Question", name: "Is gold testing free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — completely free. Testing, purity assessment, and valuation carry no fees or hidden costs." } },
    { "@type": "Question", name: "Do you offer doorstep gold buying?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. A certified evaluator visits your home or office at your preferred time." } },
    { "@type": "Question", name: "What if I don't accept the price offered?",
      acceptedAnswer: { "@type": "Answer", text: "There is zero obligation to sell. You can take your gold back without any charge." } },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* FAQ structured data — server-rendered for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
