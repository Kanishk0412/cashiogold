"use client";

import { TrendingUp, Zap, Eye, Shield, FlaskConical, Home } from "lucide-react";

const services = [
  { icon: TrendingUp,  title: "Best Market Rates",      highlight: "Up to 93% Payout",   desc: "We offer the highest payouts in the industry — up to 93% of the current market value of your gold."  },
  { icon: Zap,         title: "Instant Cash or Bank",   highlight: "Same Day Payment",    desc: "Receive payment immediately after evaluation. Choose cash or instant bank transfer on the same day."   },
  { icon: Eye,         title: "Transparent Valuation",  highlight: "100% Transparent",    desc: "Gold assessed in front of you by certified evaluators. No hidden deductions — full transparency."      },
  { icon: Shield,      title: "Safe & Secure Process",  highlight: "Fully Insured",       desc: "Stringent security protocols, CCTV-monitored centres, and full insurance throughout every transaction." },
  { icon: FlaskConical,title: "Free Gold Testing",      highlight: "No Cost Testing",     desc: "BIS-certified XRF testing equipment to accurately determine your gold purity — completely free."       },
  { icon: Home,        title: "Doorstep Assistance",    highlight: "Home Service",        desc: "Can't come to us? Book a doorstep valuation at your preferred time — anywhere in the city."            },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
          >
            Why Choose Cashiogold
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Cashiogold <span className="text-gold-gradient">Advantage</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We&apos;ve redefined the gold selling experience with industry-leading service standards and customer-first values.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, highlight, desc }) => (
            <div
              key={title}
              className="card-hover p-7 rounded-3xl"
              style={{ background: "#111111", border: "1px solid #1E1E1E" }}
            >
              {/* Icon box */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(212,175,55,0.1)" }}
              >
                <Icon size={22} style={{ color: "#D4AF37" }} />
              </div>

              {/* Badge */}
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-4"
                style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.12)" }}
              >
                ✦ {highlight}
              </span>

              <h3 className="text-base font-semibold text-white mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div
          className="mt-14 p-8 rounded-3xl"
          style={{
            background: "linear-gradient(135deg,rgba(212,175,55,0.06),rgba(212,175,55,0.02))",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: "50,000+",  l: "Happy Customers"    },
              { v: "15+ Yrs",  l: "Industry Experience" },
              { v: "₹500 Cr+", l: "Gold Purchased"      },
              { v: "100%",     l: "Satisfaction Rate"   },
            ].map(({ v, l }) => (
              <div key={l}>
                <p className="text-2xl font-bold text-[#D4AF37] mb-1">{v}</p>
                <p className="text-sm text-gray-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
