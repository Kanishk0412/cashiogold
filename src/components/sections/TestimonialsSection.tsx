"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { initials: "PS", name: "Priya Sharma",   location: "Mumbai",    rating: 5, service: "Sold Gold Jewellery",  amount: "₹1,25,000", text: "Cashiogold gave me the best price for my old jewellery. The process was transparent and I got paid within minutes. Highly recommended!" },
  { initials: "RK", name: "Rajesh Kumar",   location: "Delhi NCR", rating: 5, service: "Gold Loan Release",   amount: "₹85,000",   text: "Had pledged gold with an NBFC and was struggling to release it. Cashiogold handled everything — documentation, coordination — my gold was back in 48 hours!" },
  { initials: "AP", name: "Anita Patel",    location: "Ahmedabad", rating: 5, service: "Doorstep Gold Buying", amount: "₹2,10,000", text: "The doorstep service was fantastic. They came home, tested professionally, offered a fair price, and transferred money within the hour. 10/10!" },
  { initials: "SN", name: "Suresh Nair",    location: "Chennai",   rating: 5, service: "Sold Gold Coins",     amount: "₹67,500",   text: "Cashiogold offered 7% more than local jewellers. Seeing the live gold rate on their calculator before visiting gave me confidence. Great experience!" },
  { initials: "MJ", name: "Meena Joshi",    location: "Pune",      rating: 5, service: "Sold Gold Bars",      amount: "₹3,50,000", text: "Fast, professional, and honest. I had old gold bars from my grandmother. The team valued them correctly and explained every step. Best rate in market!" },
  { initials: "VS", name: "Vikram Singh",   location: "Jaipur",    rating: 5, service: "Bank Loan Release",   amount: "₹1,90,000", text: "Needed to release gold pledged with SBI urgently. Cashiogold sorted it in 24 hours — faster than expected. Professional, responsive, no hidden charges!" },
];

const VISIBLE = 3;

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const maxIdx = reviews.length - VISIBLE;
  const visible = reviews.slice(idx, idx + VISIBLE);

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg,#0A0A0A,#0D0B02)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
            >
              Customer Stories
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Our Customers <span className="text-gold-gradient">Say</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5 mr-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={16} fill="#D4AF37" style={{ color: "#D4AF37" }} />
              ))}
              <span className="text-[#D4AF37] font-bold ml-1">4.9</span>
              <span className="text-gray-500 text-sm ml-1">/ 500+ reviews</span>
            </div>
            <button
              onClick={() => setIdx(Math.max(0, idx - 1))}
              disabled={idx === 0}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: "#161616", border: "1px solid #1E1E1E" }}
              aria-label="Previous reviews"
            >
              <ChevronLeft size={17} className="text-white" />
            </button>
            <button
              onClick={() => setIdx(Math.min(maxIdx, idx + 1))}
              disabled={idx >= maxIdx}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: "#161616", border: "1px solid #1E1E1E" }}
              aria-label="Next reviews"
            >
              <ChevronRight size={17} className="text-white" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((r) => (
            <div
              key={r.name}
              className="flex flex-col p-6 rounded-3xl"
              style={{ background: "#111111", border: "1px solid #1E1E1E" }}
            >
              <Quote size={24} style={{ color: "rgba(212,175,55,0.3)" }} className="mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13} fill={s <= r.rating ? "#D4AF37" : "transparent"}
                    style={{ color: s <= r.rating ? "#D4AF37" : "#333" }} />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{r.text}&rdquo;
              </p>

              <span
                className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[11px] font-medium mb-5"
                style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.1)" }}
              >
                ✦ {r.service} · {r.amount}
              </span>

              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid #1E1E1E" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black shrink-0"
                  style={{ background: "linear-gradient(135deg,#D4AF37,#B8860B)" }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{r.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === idx ? "24px" : "8px", height: "8px", background: i === idx ? "#D4AF37" : "#2A2A2A" }}
              aria-label={`Show review set ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
