import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cashiogold.com"),
  title: {
    default: "Cashiogold – Sell Gold for Instant Cash | Best Gold Buyers in India",
    template: "%s | Cashiogold",
  },
  description:
    "Cashiogold offers the best market rates for your gold. Sell gold for instant cash, transparent valuation, and same-day payment. Gold loan release assistance available.",
  keywords: [
    "sell gold for cash", "gold buyers near me", "instant cash for gold",
    "gold loan release services", "best gold buying company in India",
    "gold buyers India", "sell old gold", "gold valuation", "cashiogold",
  ],
  authors: [{ name: "Cashiogold" }],
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website", locale: "en_IN",
    url: "https://cashiogold.com", siteName: "Cashiogold",
    title: "Cashiogold – Sell Gold for Instant Cash | Best Gold Buyers in India",
    description: "Get the best price for your gold with Cashiogold. Instant payment, transparent valuation.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cashiogold" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cashiogold – Sell Gold for Instant Cash",
    description: "Get the best price for your gold with Cashiogold. Instant payment, transparent valuation.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://cashiogold.com" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Cashiogold",
              description: "Premium gold buying and gold loan release assistance services",
              url: "https://cashiogold.com",
              telephone: "+91-8130145962",
              email: "cashiogold@gmail.com",
              address: { "@type": "PostalAddress", addressCountry: "IN" },
              openingHours: "Mo-Sa 09:00-19:00",
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500" },
            }),
          }}
        />
      </head>
      <body className="antialiased bg-[#0A0A0A] text-white overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
