"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, PenLine, Loader2 } from "lucide-react";
import { ReviewModal } from "@/components/ReviewForm";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  service: string;
  review_text: string;
  created_at: string;
}

const SERVICE_LABELS: Record<string, string> = {
  "sell-gold":    "Sold Gold for Cash",
  "loan-release": "Gold Loan Release",
  "doorstep":     "Doorstep Gold Buying",
  "general":      "General Service",
};

const VISIBLE = 3;

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export function TestimonialsSection() {
  const [reviews,    setReviews]    = useState<Review[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [idx,        setIdx]        = useState(0);
  const [modalOpen,  setModalOpen]  = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then((data: Review[]) => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const list    = reviews;
  const maxIdx  = Math.max(0, list.length - VISIBLE);
  const visible = list.slice(idx, idx + VISIBLE);

  const avgRating = list.length
    ? (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1)
    : "4.9";

  return (
    <section id="testimonials" className="py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg,#0A0A0A,#0D0B02)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
              Customer Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}>
              What Our Customers{" "}
              <span className="text-gold-gradient">Say</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={15} fill="#D4AF37" style={{ color: "#D4AF37" }} />
              ))}
              <span className="text-[#D4AF37] font-bold ml-1">{avgRating}</span>
              <span className="text-gray-500 text-sm ml-1">/ {list.length}+ reviews</span>
            </div>

            {/* Write review button */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn-shine flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}>
              <PenLine size={15} />
              Write a Review
            </button>

            {/* Carousel controls */}
            <div className="flex gap-2">
              <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "#161616", border: "1px solid #1E1E1E" }}
                aria-label="Previous">
                <ChevronLeft size={17} className="text-white" />
              </button>
              <button onClick={() => setIdx(Math.min(maxIdx, idx + 1))} disabled={idx >= maxIdx}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "#161616", border: "1px solid #1E1E1E" }}
                aria-label="Next">
                <ChevronRight size={17} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
            <Loader2 size={18} className="animate-spin text-[#D4AF37]" />
            <span className="text-sm">Loading reviews...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && list.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
              <Star size={28} style={{ color: "#D4AF37" }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Reviews Yet</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              Be the first to share your experience with Cashiogold!
            </p>
            <button onClick={() => setModalOpen(true)}
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}>
              <PenLine size={15} />
              Write the First Review
            </button>
          </div>
        )}

        {/* Review cards */}
        {!loading && list.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((r) => (
              <div key={r.id} className="flex flex-col p-6 rounded-3xl"
                style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
                <Quote size={24} style={{ color: "rgba(212,175,55,0.3)" }} className="mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={13}
                      fill={s <= r.rating ? "#D4AF37" : "transparent"}
                      style={{ color: s <= r.rating ? "#D4AF37" : "#333" }} />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{r.review_text}&rdquo;
                </p>

                <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[11px] font-medium mb-5"
                  style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.1)" }}>
                  ✦ {SERVICE_LABELS[r.service] || r.service}
                </span>

                <div className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid #1E1E1E" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black shrink-0"
                    style={{ background: "linear-gradient(135deg,#D4AF37,#B8860B)" }}>
                    {initials(r.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{r.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.location || "India"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dots */}
        {!loading && list.length > VISIBLE && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === idx ? "24px" : "8px", height: "8px",
                  background: i === idx ? "#D4AF37" : "#2A2A2A" }}
                aria-label={`Go to page ${i + 1}`} />
            ))}
          </div>
        )}

        {/* CTA to write review */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm mb-4">
            Had a great experience with us? Share it with others.
          </p>
          <button onClick={() => setModalOpen(true)}
            className="btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm border transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] text-gray-300"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            <PenLine size={16} />
            Share Your Experience
          </button>
        </div>
      </div>

      {/* Review submission modal */}
      <ReviewModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
