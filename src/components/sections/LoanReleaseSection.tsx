import Link from "next/link";
import { Building2, Clock, CheckCircle2, ArrowRight, Handshake, FileText } from "lucide-react";

const steps = [
  { icon: FileText,     title: "Share Loan Details",       desc: "Provide loan account number, outstanding amount, and lender information."            },
  { icon: Handshake,   title: "We Coordinate with Lender", desc: "Our team liaisons with your bank, NBFC, or private lender on your behalf."          },
  { icon: Building2,   title: "Documentation Support",     desc: "We handle all paperwork and documentation required for the release process."          },
  { icon: CheckCircle2,title: "Gold Released & Delivered", desc: "Your gold is released and returned — or purchased by us at the best market rate."   },
];

const lenders = ["SBI","HDFC Bank","ICICI Bank","Axis Bank","Muthoot Finance","Manappuram","IIFL Finance","Federal Bank","Kotak Bank","Private Lenders"];

const benefits = [
  "End-to-end loan release coordination",
  "Works with all banks, NBFCs & private lenders",
  "Fast turnaround — typically 24–48 hours",
  "No upfront charges or hidden fees",
  "Expert team with 10+ years of experience",
];

export function LoanReleaseSection() {
  return (
    <section
      id="loan-release"
      className="py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg, #0A0A0A, #0D0B02 50%, #0A0A0A)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
            >
              <Building2 size={13} />
              Gold Loan Release Assistance
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-[1.15]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stuck with a{" "}
              <span className="text-gold-gradient">Pledged Gold</span> Loan?
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              We help you release your pledged gold from banks, NBFCs, and private lenders with end-to-end support — fast, hassle-free, and completely transparent.
            </p>

            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Whether your gold is pledged with a nationalized bank, a leading NBFC, or a private money lender, our expert team navigates the entire release process — from documentation to final handover.
            </p>

            <ul className="space-y-3 mb-10">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 size={17} style={{ color: "#D4AF37" }} className="shrink-0" />
                  <span className="text-gray-300 text-sm">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=release"
                className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm text-black"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
              >
                Get Loan Release Help <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+918130145962"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm border transition-all"
                style={{ border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}
              >
                <Clock size={16} /> Call for Quick Help
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">

            {/* Steps */}
            <div
              className="rounded-3xl p-7"
              style={{ background: "#111111", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <h3 className="font-semibold text-white mb-6">How We Release Your Gold</h3>
              <div className="space-y-5">
                {steps.map(({ icon: Icon, title, desc }, i) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                      >
                        <Icon size={17} style={{ color: "#D4AF37" }} />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 mt-2 mb-1" style={{ background: "rgba(212,175,55,0.12)" }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-semibold text-white mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lenders */}
            <div className="rounded-3xl p-6" style={{ background: "#111111", border: "1px solid #1E1E1E" }}>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">We work with all major lenders</p>
              <div className="flex flex-wrap gap-2">
                {lenders.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400"
                    style={{ background: "#1A1A1A", border: "1px solid #252525" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
