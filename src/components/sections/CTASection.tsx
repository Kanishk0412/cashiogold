"use client";

import Link from "next/link";
import { Phone, MessageCircle, ArrowRight, Shield, Star, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "linear-gradient(135deg,#0D0B02,#0A0A0A)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-[pulse_1.5s_ease-in-out_infinite]" />
          Free &amp; No Obligation
        </div>

        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ready to Turn Your Gold into{" "}
          <span className="text-gold-gradient">Instant Cash?</span>
        </h2>

        <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Contact us today for a free, no-obligation gold valuation. Our experts
          are ready to give you the best price — guaranteed.
        </p>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: Shield,  text: "100% Safe & Secure"    },
            { icon: Star,    text: "4.9/5 Customer Rating" },
            { icon: Zap,     text: "Same Day Payment"      },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
              <Icon size={15} style={{ color: "#D4AF37" }} />
              {text}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-shine inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-black text-base transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#D4AF37,#F4D03F,#B8860B)" }}
          >
            Get Free Gold Valuation
            <ArrowRight size={18} />
          </Link>

          <a
            href="tel:+918130145962"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-white text-base border transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <Phone size={18} />
            +91 81301 45962
          </a>

          <a
            href="https://wa.me/918130145962"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-white text-base transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>

        <p className="text-gray-600 text-sm mt-10">
          Mon–Sat, 9 AM – 7 PM &nbsp;·&nbsp; Doorstep service available &nbsp;·&nbsp; No charges for valuation
        </p>
      </div>
    </section>
  );
}
