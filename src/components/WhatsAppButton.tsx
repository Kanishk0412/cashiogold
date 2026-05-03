"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = "918130145962";
  const message = encodeURIComponent(
    "Hi Cashiogold! I'd like to get a free gold valuation. Please assist me."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl text-white font-medium text-sm transition-all duration-300 group hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
