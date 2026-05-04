"use client";

import { useState } from "react";
import { Star, Send, Loader2, CheckCircle, X } from "lucide-react";

const SERVICES = [
  { value: "sell-gold",    label: "Sold Gold for Cash"    },
  { value: "loan-release", label: "Gold Loan Release"     },
  { value: "doorstep",     label: "Doorstep Gold Buying"  },
  { value: "general",      label: "General Service"       },
];

interface Props {
  onClose?: () => void;
}

export function ReviewForm({ onClose }: Props) {
  const [rating,  setRating]  = useState(0);
  const [hover,   setHover]   = useState(0);
  const [name,    setName]    = useState("");
  const [location, setLoc]   = useState("");
  const [service, setService] = useState("");
  const [review,  setReview]  = useState("");
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [error,   setError]   = useState("");
  const [honey,   setHoney]   = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!rating)         return setError("Please select a star rating.");
    if (!name.trim())    return setError("Please enter your name.");
    if (!service)        return setError("Please select the service you used.");
    if (review.length < 10) return setError("Please write at least 10 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, rating, service, review_text: review, honeypot: honey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: "rgba(212,175,55,0.1)", border: "2px solid rgba(212,175,55,0.3)" }}>
          <CheckCircle size={32} style={{ color: "#D4AF37" }} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Review Submitted!
        </h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Thank you for sharing your experience. Your review will appear on the website after approval.
        </p>
        {onClose && (
          <button onClick={onClose}
            className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-black"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}>
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Honeypot */}
      <input value={honey} onChange={e => setHoney(e.target.value)}
        type="text" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

      {/* Star Rating */}
      <div>
        <label className="text-sm font-medium text-gray-300 block mb-2">Your Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110 active:scale-95">
              <Star
                size={32}
                fill={(hover || rating) >= s ? "#D4AF37" : "transparent"}
                style={{ color: (hover || rating) >= s ? "#D4AF37" : "#444" }}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-[#D4AF37] self-center font-medium">
              {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Name + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2">Your Name *</label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full px-4 py-3 rounded-xl text-white text-sm bg-[#1A1A1A] outline-none transition-all placeholder:text-gray-600"
            style={{ border: "1px solid #252525" }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
            onBlur={e  => (e.currentTarget.style.borderColor = "#252525")}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2">City / Location</label>
          <input value={location} onChange={e => setLoc(e.target.value)}
            placeholder="e.g. Mumbai"
            className="w-full px-4 py-3 rounded-xl text-white text-sm bg-[#1A1A1A] outline-none transition-all placeholder:text-gray-600"
            style={{ border: "1px solid #252525" }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
            onBlur={e  => (e.currentTarget.style.borderColor = "#252525")}
          />
        </div>
      </div>

      {/* Service */}
      <div>
        <label className="text-sm font-medium text-gray-300 block mb-2">Service Used *</label>
        <select value={service} onChange={e => setService(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm bg-[#1A1A1A] outline-none transition-all appearance-none"
          style={{
            border: "1px solid #252525",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: "40px",
            colorScheme: "dark",
          }}>
          <option value="">Select service...</option>
          {SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Review Text */}
      <div>
        <label className="text-sm font-medium text-gray-300 block mb-2">Your Review *</label>
        <textarea value={review} onChange={e => setReview(e.target.value)}
          rows={4}
          placeholder="Share your experience with Cashiogold..."
          className="w-full px-4 py-3 rounded-xl text-white text-sm bg-[#1A1A1A] outline-none transition-all resize-none placeholder:text-gray-600"
          style={{ border: "1px solid #252525" }}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
          onBlur={e  => (e.currentTarget.style.borderColor = "#252525")}
        />
        <p className="text-xs text-gray-600 mt-1">{review.length} / min 10 characters</p>
      </div>

      {error && (
        <p className="text-red-400 text-sm py-2 px-3 rounded-lg bg-red-400/10">{error}</p>
      )}

      <p className="text-xs text-gray-600">
        Reviews are moderated and appear on the website after approval.
      </p>

      <button type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-black text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}>
        {loading
          ? <><Loader2 size={18} className="animate-spin" /> Submitting...</>
          : <><Send size={18} /> Submit My Review</>
        }
      </button>
    </form>
  );
}

// ── Modal wrapper ──────────────────────────────────────────────
// Using key={isOpen} forces full remount on each open — resets all form state cleanly
export function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div key={String(isOpen)} className="relative w-full max-w-lg rounded-3xl p-7 max-h-[90vh] overflow-y-auto"
        style={{ background: "#111111", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Write a Review
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">Share your experience with Cashiogold</p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            style={{ background: "#1A1A1A", border: "1px solid #252525" }}>
            <X size={18} />
          </button>
        </div>
        <ReviewForm onClose={onClose} />
      </div>
    </div>
  );
}
