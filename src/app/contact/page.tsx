import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Shield, Star } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us – Get Free Gold Valuation",
  description:
    "Contact Cashiogold for a free gold valuation, sell your gold for instant cash, or get gold loan release assistance. Reach us by phone, email, or WhatsApp.",
  alternates: {
    canonical: "https://cashiogold.com/contact",
  },
  openGraph: {
    title: "Contact Cashiogold – Free Gold Valuation",
    description: "Get in touch for free gold valuation and instant cash. Available 6 days a week.",
    url: "https://cashiogold.com/contact",
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call or WhatsApp",
    value: "+91 81301 45962",
    href: "tel:+918130145962",
    sub: "Mon–Sat, 9 AM – 7 PM",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "cashiogold@gmail.com",
    href: "mailto:cashiogold@gmail.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Service Area",
    value: "Pan India",
    href: "#",
    sub: "Doorstep service available",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon – Sat",
    href: "#",
    sub: "9:00 AM – 7:00 PM IST",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <div
        className="pt-28 pb-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0A0A0A 0%, #1A1408 50%, #0A0A0A 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #D4AF37, transparent)",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.2)",
              color: "#D4AF37",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            Free Consultation — No Charges
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Get Your{" "}
            <span className="text-gold-gradient">Free Gold</span>{" "}
            Valuation
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Fill in the form below and our expert team will contact you within
            24 hours with the best offer.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl p-8"
              style={{
                background: "#111111",
                border: "1px solid rgba(212,175,55,0.15)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                All fields are required. We&apos;ll get back to you within 24
                hours.
              </p>
              <Suspense
                fallback={
                  <div
                    className="h-96 rounded-2xl"
                    style={{ background: "#1A1A1A" }}
                  />
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>

          {/* Right: Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, title, value, href, sub }) => (
                <a
                  key={title}
                  href={href}
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 group"
                  style={{
                    background: "#111111",
                    border: "1px solid #1E1E1E",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(212,175,55,0.1)" }}
                  >
                    <Icon size={20} style={{ color: "#D4AF37" }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{title}</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                      {value}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">{sub}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918130145962"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-2xl font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
              }}
            >
              <MessageCircle size={22} />
              <div>
                <div className="text-sm font-semibold">Chat on WhatsApp</div>
                <div className="text-xs opacity-80">
                  Quick response guaranteed
                </div>
              </div>
            </a>

            {/* Trust section */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(212,175,55,0.05)",
                border: "1px solid rgba(212,175,55,0.1)",
              }}
            >
              <h3 className="font-semibold text-white mb-4 text-sm">
                Why Customers Trust Us
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "Fully insured & secure process" },
                  { icon: Star, text: "4.9/5 rating — 500+ reviews" },
                  { icon: Phone, text: "Dedicated relationship manager" },
                ].map(({ icon: TrustIcon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm text-gray-400"
                  >
                    <TrustIcon size={15} style={{ color: "#D4AF37" }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid #1E1E1E",
                height: "220px",
                background: "#111111",
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-600">
                <MapPin
                  size={32}
                  style={{ color: "rgba(212,175,55,0.3)" }}
                />
                <span className="text-sm">Pan India Service</span>
                <span className="text-xs">
                  Doorstep available nationwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
