"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { RefreshCw, ArrowRight, Info, TrendingUp } from "lucide-react";

interface Rates { "24K": number; "22K": number; "18K": number; "14K": number; "10K": number; lastUpdated: string; }

const PURITIES = [
  { key: "24K", label: "24 Karat", purity: "99.9%", popular: false },
  { key: "22K", label: "22 Karat", purity: "91.6%", popular: true  },
  { key: "18K", label: "18 Karat", purity: "75.0%", popular: false },
  { key: "14K", label: "14 Karat", purity: "58.3%", popular: false },
  { key: "10K", label: "10 Karat", purity: "41.7%", popular: false },
] as const;

type PurityKey = "24K" | "22K" | "18K" | "14K" | "10K";

const PAYOUT = 0.93;

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export function GoldCalculator() {
  const [rates,      setRates]      = useState<Rates | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [purity,     setPurity]     = useState<PurityKey>("22K");
  const [weight,     setWeight]     = useState("");

  const fetchRates = useCallback(async () => {
    try {
      const r = await fetch("/api/gold-price");
      const d = await r.json();
      setRates(d);
    } catch {
      setRates({ "24K": 7250, "22K": 6646, "18K": 5438, "14K": 4230, "10K": 3021, lastUpdated: "N/A" });
    } finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => {
    fetchRates();
    const id = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchRates]);

  const w = parseFloat(weight);
  const pricePerGram = rates?.[purity] ?? 0;
  const marketValue  = (!isNaN(w) && w > 0) ? Math.round(w * pricePerGram)      : null;
  const payout       = marketValue            ? Math.round(marketValue * PAYOUT) : null;

  return (
    <section
      id="calculator"
      className="py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0E0D04 50%, #0A0A0A 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
          >
            <TrendingUp size={14} />
            Live Market Rates
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Gold Rate <span className="text-gold-gradient">Calculator</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Calculate the value of your gold instantly using live market rates.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Calculator panel ── */}
          <div
            className="lg:col-span-3 rounded-3xl p-6 sm:p-8"
            style={{
              background: "#111111",
              border: "1px solid rgba(212,175,55,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white text-lg">Calculate Your Gold Value</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {rates ? `Updated ${rates.lastUpdated}` : "Loading rates…"}
                </p>
              </div>
              <button
                onClick={() => { setRefreshing(true); fetchRates(); }}
                disabled={refreshing}
                className="p-2.5 rounded-xl text-[#D4AF37] transition-colors hover:bg-[rgba(212,175,55,0.08)]"
                style={{ border: "1px solid rgba(212,175,55,0.2)" }}
                aria-label="Refresh rates"
              >
                <RefreshCw size={16} className={refreshing ? "animate-[spin_1s_linear_infinite]" : ""} />
              </button>
            </div>

            {/* Purity selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-400 mb-3">Select Gold Purity</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {PURITIES.map(({ key, purity: p, popular }) => (
                  <button
                    key={key}
                    onClick={() => setPurity(key as PurityKey)}
                    className="relative flex flex-col items-center py-3 px-1 rounded-xl transition-all duration-200 text-center"
                    style={{
                      background:   purity === key ? "rgba(212,175,55,0.15)" : "#1A1A1A",
                      border:       purity === key ? "1px solid rgba(212,175,55,0.4)" : "1px solid #252525",
                      transform:    purity === key ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    {popular && purity !== key && (
                      <span
                        className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black px-1.5 py-0.5 rounded-full whitespace-nowrap"
                        style={{ background: "#D4AF37" }}
                      >Popular</span>
                    )}
                    <span
                      className="text-sm font-bold mb-0.5"
                      style={{ color: purity === key ? "#D4AF37" : "#666" }}
                    >{key}</span>
                    {loading ? (
                      <span className="w-10 h-3 rounded shimmer block" />
                    ) : (
                      <span className="text-[11px] text-white font-semibold leading-tight">
                        ₹{rates?.[key as PurityKey]?.toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-[9px] text-gray-600 mt-0.5">{p}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="gold-divider mb-6" />

            {/* Weight input */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Gold Weight (grams)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight, e.g. 10.5"
                  className="w-full px-4 py-3.5 rounded-xl text-white text-sm bg-[#1A1A1A] outline-none transition-all placeholder:text-gray-600 pr-12"
                  style={{ border: "1px solid #252525" }}
                  onFocus={(e)  => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                  onBlur={(e)   => (e.currentTarget.style.borderColor = "#252525")}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#D4AF37]">g</span>
              </div>
            </div>

            {/* Results */}
            {marketValue !== null && payout !== null ? (
              <div className="space-y-3 mb-6">
                <div
                  className="flex items-center justify-between p-4 rounded-2xl"
                  style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.1)" }}
                >
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Market Value</p>
                    <p className="text-xs text-gray-600">
                      {weight}g × ₹{pricePerGram.toLocaleString("en-IN")}/g
                    </p>
                  </div>
                  <p className="text-lg font-bold text-white">{fmt(marketValue)}</p>
                </div>

                <div
                  className="flex items-center justify-between p-4 rounded-2xl"
                  style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)" }}
                >
                  <div>
                    <p className="text-sm font-semibold text-[#D4AF37]">Estimated Payout</p>
                    <p className="text-xs text-gray-500 mt-0.5">93% of market value</p>
                  </div>
                  <p className="text-2xl font-bold text-[#D4AF37]">{fmt(payout)}</p>
                </div>

                <div
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <Info size={13} className="text-gray-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Final payout is determined after physical assessment. This is an indicative estimate.
                  </p>
                </div>
              </div>
            ) : (
              weight && (
                <p className="text-xs text-red-400 mb-6">Please enter a valid weight (e.g. 5.5)</p>
              )
            )}

            {/* CTA */}
            <Link
              href="/contact"
              className="btn-shine flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-black text-sm transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
            >
              Get Accurate In-Person Valuation
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* ── Right info panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Current rate highlight */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.04))",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">24K Gold · Today</p>
              {loading ? (
                <div className="w-32 h-10 rounded-lg shimmer mb-1" />
              ) : (
                <p className="text-4xl font-bold text-[#D4AF37] mb-1">
                  ₹{rates?.["24K"]?.toLocaleString("en-IN")}
                </p>
              )}
              <p className="text-sm text-gray-500">per gram</p>
              <div
                className="mt-4 pt-4 text-xs text-green-400 font-medium"
                style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
              >
                ↑ Live market tracking active
              </div>
            </div>

            {/* All rates */}
            <div className="rounded-3xl p-6" style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
              <h4 className="font-semibold text-white text-sm mb-4">All Purity Rates</h4>
              <div className="space-y-3">
                {PURITIES.map(({ key, label, purity: p }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-300">{label}</span>
                      <span className="text-xs text-gray-600 ml-2">({p})</span>
                    </div>
                    {loading ? (
                      <div className="w-20 h-4 rounded shimmer" />
                    ) : (
                      <span className="text-sm font-semibold text-[#D4AF37]">
                        ₹{rates?.[key as PurityKey]?.toLocaleString("en-IN")}/g
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Why us */}
            <div className="rounded-3xl p-6" style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
              <h4 className="font-semibold text-white text-sm mb-4">Why Cashiogold?</h4>
              <ul className="space-y-2.5">
                {[
                  "Up to 93% of market value paid",
                  "Instant cash or same-day bank transfer",
                  "Free professional BIS-certified testing",
                  "No hidden charges whatsoever",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#D4AF37" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
