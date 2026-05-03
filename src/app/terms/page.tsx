import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Cashiogold Terms of Service — the terms governing your use of our gold buying services.",
  alternates: { canonical: "https://cashiogold.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#D4AF37] hover:text-[#F4D03F] transition-colors">
            ← Back to Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="space-y-8">
          {[
            {
              title: "1. Acceptance of Terms",
              content: "By using Cashiogold's services, you agree to these Terms of Service. If you do not agree, please do not use our services.",
            },
            {
              title: "2. Gold Buying Services",
              content: "Cashiogold provides gold buying services at market-competitive rates. All transactions are voluntary and final once accepted by both parties. The payout amount is determined after physical assessment and may differ from online estimates.",
            },
            {
              title: "3. Gold Loan Release Services",
              content: "Our loan release assistance is an advisory and coordination service. Cashiogold acts as an intermediary and is not responsible for the decisions made by lending institutions. Timelines may vary depending on the lender.",
            },
            {
              title: "4. Pricing and Payments",
              content: "Gold rates are based on live market prices and are subject to change. Final valuation is determined at the time of physical assessment. Payments are made via cash or bank transfer as per applicable limits.",
            },
            {
              title: "5. Limitation of Liability",
              content: "Cashiogold's liability is limited to the direct value of transactions. We are not responsible for indirect, consequential, or punitive damages arising from the use of our services.",
            },
            {
              title: "6. Governing Law",
              content: "These terms are governed by the laws of India. Any disputes shall be resolved in the courts of jurisdiction applicable to our registered address.",
            },
          ].map(({ title, content }) => (
            <section key={title}>
              <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
              <p className="text-gray-400 leading-relaxed">{content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
