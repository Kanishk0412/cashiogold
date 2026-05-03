import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Cashiogold Privacy Policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://cashiogold.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#D4AF37] hover:text-[#F4D03F] transition-colors">
            ← Back to Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="prose prose-invert max-w-none space-y-8">
          {[
            {
              title: "1. Information We Collect",
              content: "We collect information you provide directly to us, such as your name, phone number, email address, city, and any messages you send through our contact form. We also collect usage data through cookies and analytics tools to improve our services.",
            },
            {
              title: "2. How We Use Your Information",
              content: "We use the information we collect to process your gold valuation requests, contact you about our services, respond to your inquiries, improve our website and services, and comply with legal obligations. We do not sell your personal information to third parties.",
            },
            {
              title: "3. Data Security",
              content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is stored securely using industry-standard encryption.",
            },
            {
              title: "4. Data Retention",
              content: "We retain your personal information for as long as necessary to provide our services and comply with legal requirements. Contact form submissions are retained for up to 2 years for business purposes.",
            },
            {
              title: "5. Your Rights",
              content: "You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at privacy@cashiogold.com.",
            },
            {
              title: "6. Contact Us",
              content: "If you have questions about this privacy policy, please contact us at privacy@cashiogold.com or call +91 81301 45962.",
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
