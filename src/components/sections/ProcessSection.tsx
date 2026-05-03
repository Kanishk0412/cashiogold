import Link from "next/link";
import { CalendarCheck, Microscope, BadgeCheck, Banknote } from "lucide-react";

const steps = [
  {
    n: "01", icon: CalendarCheck, time: "5 min",
    title: "Book a Valuation",
    desc:  "Contact us by phone, WhatsApp, or our form. Choose a convenient time — doorstep visits or walk-in.",
  },
  {
    n: "02", icon: Microscope, time: "15 min",
    title: "Gold Assessment",
    desc:  "Certified experts assess your gold with BIS-certified XRF equipment — done in front of you, fully transparent.",
  },
  {
    n: "03", icon: BadgeCheck, time: "5 min",
    title: "Price Confirmation",
    desc:  "We present our offer based on live gold rates. No pressure — accept or decline freely. Best price guaranteed.",
  },
  {
    n: "04", icon: Banknote, time: "Instant",
    title: "Instant Payment",
    desc:  "Receive cash or same-day bank transfer the moment you accept. Zero delays, full amount — guaranteed.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
          >
            Simple 4-Step Process
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            How It <span className="text-gold-gradient">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Selling your gold takes less than 30 minutes — start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ n, icon: Icon, time, title, desc }) => (
            <div key={n} className="flex flex-col items-center text-center">
              {/* Icon circle */}
              <div className="relative mb-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                    boxShadow: "0 0 24px rgba(212,175,55,0.35)",
                  }}
                >
                  <Icon size={26} className="text-black" />
                </div>
                {/* Step number */}
                <div
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-black"
                  style={{ background: "#F4D03F" }}
                >
                  {n}
                </div>
              </div>

              {/* Card */}
              <div
                className="flex flex-col flex-1 w-full p-5 rounded-2xl"
                style={{ background: "#111111", border: "1px solid #1E1E1E" }}
              >
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3"
                  style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37" }}
                >
                  ⏱ {time}
                </span>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Connector line (desktop) */}
        {/* visual connector via CSS — handled by gap + icons alignment */}

        <div className="text-center mt-14">
          <p className="text-gray-500 text-sm mb-6">
            Ready to get started? The entire process takes under 30 minutes.
          </p>
          <Link
            href="/contact"
            className="btn-shine inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-semibold text-black text-base"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
          >
            Book Your Free Valuation Today
          </Link>
        </div>
      </div>
    </section>
  );
}
