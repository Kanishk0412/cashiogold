"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "How does Cashiogold determine the price of my gold?",
    a: "We use live international gold market rates (LBMA) converted to INR. Our certified evaluators assess purity using BIS-certified XRF testing and calculate value based on weight × purity × current rate — done transparently in front of you." },
  { q: "What types of gold do you buy?",
    a: "We buy all forms: jewellery (necklaces, rings, bangles, earrings), gold coins, gold bars, broken or damaged jewellery, and old ornaments from 10K to 24K purity. Even oxidised or antique pieces are accepted." },
  { q: "How quickly will I get paid?",
    a: "Payment is instant. Once you accept our offer, you receive payment immediately — cash (up to ₹2 lakhs) or NEFT/RTGS/UPI bank transfer within the same business day. No waiting, no delays." },
  { q: "What documents do I need?",
    a: "Just a valid government photo ID (Aadhaar, PAN, Passport, or Driving Licence). No additional paperwork required for standard transactions." },
  { q: "Is gold testing free?",
    a: "Yes — completely free. Testing, purity assessment, and valuation carry no fees, consultation charges, or hidden costs." },
  { q: "What is gold loan release assistance?",
    a: "If your gold is pledged with a bank, NBFC, or private lender, we coordinate the release process, handle documentation, and in many cases can purchase the gold to pay off the balance — returning any surplus to you." },
  { q: "Do you offer doorstep gold buying?",
    a: "Yes. A certified evaluator visits your home or office at your preferred time. Valuation, price confirmation, and payment are all completed at your doorstep." },
  { q: "What if I don't accept the price offered?",
    a: "There is zero obligation to sell. You can take your gold back without any charge. We want you to be 100% comfortable with the transaction." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
          >
            Frequently Asked Questions
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Got <span className="text-gold-gradient">Questions?</span>
          </h2>
          <p className="text-gray-400">Everything you need to know about selling gold and our services.</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background:   open === i ? "rgba(212,175,55,0.05)" : "#111111",
                border:       open === i ? "1px solid rgba(212,175,55,0.2)" : "1px solid #1E1E1E",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-white leading-snug">{q}</span>
                <div
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: open === i ? "rgba(212,175,55,0.15)" : "#1A1A1A",
                    border:     open === i ? "1px solid rgba(212,175,55,0.3)" : "1px solid #252525",
                  }}
                >
                  {open === i
                    ? <Minus size={14} style={{ color: "#D4AF37" }} />
                    : <Plus  size={14} className="text-gray-500" />
                  }
                </div>
              </button>

              {open === i && (
                <div className="px-5 pb-5">
                  <hr className="mb-4" style={{ borderColor: "rgba(212,175,55,0.1)" }} />
                  <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }} />
      </div>
    </section>
  );
}
