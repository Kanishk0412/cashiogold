"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/#services",      label: "Services"     },
  { href: "/#calculator",    label: "Gold Rate"    },
  { href: "/#process",       label: "How It Works" },
  { href: "/#testimonials",  label: "Reviews"      },
  { href: "/#faq",           label: "FAQ"          },
  { href: "/contact",        label: "Contact"      },
];

export function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:   scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.1)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-black font-black text-lg shrink-0"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
            >
              C
            </div>
            <div>
              <span className="font-bold text-lg leading-none" style={{ color: "#D4AF37" }}>
                Cashio<span className="text-white">gold</span>
              </span>
              <p className="text-[9px] tracking-[0.2em] uppercase text-gray-500 leading-none mt-0.5">
                Premium Gold Buyers
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+918130145962"
              className="flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#F4D03F] transition-colors"
            >
              <Phone size={14} />
              +91 81301 45962
            </a>
            <Link
              href="/contact"
              className="btn-shine px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
            >
              Free Valuation
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden border-t"
          style={{ background: "rgba(10,10,10,0.98)", borderColor: "rgba(212,175,55,0.1)" }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-gray-300 hover:text-[#D4AF37] text-base border-b transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+918130145962"
              className="flex items-center gap-2 py-3 px-2 text-[#D4AF37] text-sm"
            >
              <Phone size={16} /> +91 81301 45962
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 text-center py-3 rounded-xl font-semibold text-black text-sm"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
            >
              Get Free Valuation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
