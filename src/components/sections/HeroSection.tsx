"use client";

import Link from "next/link";
import { ArrowRight, Phone, Shield, TrendingUp, Zap, Clock } from "lucide-react";

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "₹500 Cr+", label: "Gold Purchased"  },
  { value: "4.9 ★",    label: "Customer Rating" },
  { value: "Same Day", label: "Payment"          },
];

const trust = [
  { icon: Shield,    text: "100% Secure"   },
  { icon: TrendingUp, text: "Best Rates"   },
  { icon: Zap,       text: "Instant Pay"   },
  { icon: Clock,     text: "Same-Day Deal" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #150E02 55%, #0A0A0A 100%)" }}
    >
      {/* Glow orbs */}
      <div className="pointer-events-none select-none absolute inset-0">
        <div
          className="absolute top-24 right-16 w-80 h-80 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "#D4AF37" }}
        />
        <div
          className="absolute bottom-24 left-16 w-64 h-64 rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "#D4AF37" }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.4) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col">
            {/* Badge */}
            <div
              className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.25)",
                color: "#D4AF37",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-[pulse_1.5s_ease-in-out_infinite]" />
              Live Gold Rates Updated · Best Rates Guaranteed
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Sell Your Gold for{" "}
              <span className="text-gold-gradient">Instant Cash</span>{" "}
              at the Best Price
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Transparent valuation based on real-time gold prices. Receive instant
              cash or bank transfer after professional assessment — no hidden charges.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {trust.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Icon size={14} style={{ color: "#D4AF37" }} />
                  {text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-black transition-transform hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
              >
                Get Free Gold Valuation
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+918130145962"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-white border transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Phone size={18} />
                Call Us Now
              </a>
            </div>
          </div>

          {/* ── Right column: card ── */}
          <div className="relative flex justify-center">
            {/* Top badge */}
            <div
              className="absolute -top-3 right-8 z-20 px-4 py-2 rounded-xl text-sm font-bold text-black"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F)" }}
            >
              🏆 India&apos;s #1 Trusted
            </div>

            {/* Main floating card */}
            <div
              className="w-full max-w-sm rounded-3xl p-8"
              style={{
                background: "linear-gradient(145deg, #161616, #1C1508)",
                border: "1px solid rgba(212,175,55,0.2)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.06)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {/* Coin icon */}
              <div className="flex justify-center mb-7">
                <div className="relative">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center text-6xl"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)",
                      boxShadow: "0 0 48px rgba(212,175,55,0.45)",
                    }}
                  >
                    🪙
                  </div>
                  <div
                    className="absolute inset-0 -m-5 rounded-full border-2 border-dashed opacity-20 spin-slow"
                    style={{ borderColor: "#D4AF37" }}
                  />
                </div>
              </div>

              {/* Price display */}
              <div className="text-center mb-7">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  Today&apos;s 24K Gold Rate
                </p>
                <p className="text-5xl font-bold text-gold-gradient leading-none">₹7,250</p>
                <p className="text-sm text-gray-500 mt-2">per gram · Live market price</p>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="text-center p-3 rounded-xl"
                    style={{
                      background: "rgba(212,175,55,0.06)",
                      border: "1px solid rgba(212,175,55,0.12)",
                    }}
                  >
                    <p className="text-base font-bold text-[#D4AF37]">{value}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-20 pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ borderColor: "rgba(212,175,55,0.1)" }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-[#D4AF37] mb-1">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
