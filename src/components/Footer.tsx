import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { href: "/#services",     label: "Our Services"      },
  { href: "/#calculator",   label: "Gold Rate Calc"    },
  { href: "/#loan-release", label: "Loan Release"      },
  { href: "/#process",      label: "How It Works"      },
  { href: "/#testimonials", label: "Testimonials"      },
  { href: "/#faq",          label: "FAQs"              },
];

const services = [
  "Sell Gold for Cash",
  "Gold Valuation",
  "Gold Loan Release",
  "Doorstep Gold Buying",
  "Bank Loan Clearance",
  "NBFC Loan Release",
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A]" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-black font-black text-lg shrink-0"
                style={{ background: "linear-gradient(135deg,#D4AF37,#B8860B)" }}
              >C</div>
              <span className="font-bold text-xl" style={{ color: "#D4AF37" }}>
                Cashio<span className="text-white">gold</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              India&apos;s trusted premium gold buying platform. Best market rates, transparent valuation, and instant payments — nationwide.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {["FB","IG","TW","YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-gray-500 hover:text-[#D4AF37] transition-colors"
                  style={{ background: "#161616", border: "1px solid #1E1E1E" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: "#D4AF37" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: "#D4AF37" }}>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#D4AF37" }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: "#D4AF37" }}>
              Contact Us
            </h3>
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Call Us",     val: "+91 81301 45962",      href: "tel:+918130145962"         },
                { icon: Mail,  label: "Email",        val: "cashiogold@gmail.com",  href: "mailto:cashiogold@gmail.com"},
                { icon: MapPin,label: "Coverage",     val: "Pan India",            href: "#"                        },
                { icon: Clock, label: "Hours",        val: "Mon–Sat, 9 AM–7 PM",  href: "#"                        },
              ].map(({ icon: Icon, label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-3 text-gray-500 hover:text-[#D4AF37] transition-colors group"
                >
                  <Icon size={15} className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm text-gray-400 group-hover:text-[#D4AF37] transition-colors">{val}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Cashiogold. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/terms",          label: "Terms"          },
              { href: "/sitemap.xml",    label: "Sitemap"        },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-gray-600 hover:text-[#D4AF37] text-xs transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
