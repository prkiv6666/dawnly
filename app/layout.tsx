import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider, themeInitScript } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/CartDrawer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import DiscountPopup from "@/components/DiscountPopup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://dawnly.shop";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dawnly — Warm Bedside Lamp for Calmer Evenings",
    template: "%s · Dawnly",
  },
  description:
    "Dawnly is a warm, egg-shaped bedside lamp designed to make your room feel peaceful, cozy, and effortless. Soft ambient glow for calmer evenings and gentler mornings.",
  keywords: [
    "bedside lamp",
    "warm light",
    "cozy bedroom lighting",
    "egg lamp",
    "ambient night light",
    "sunrise lamp",
    "Dawnly",
  ],
  authors: [{ name: "Dawnly" }],
  creator: "Dawnly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dawnly",
    title: "Dawnly — Warm Bedside Lamp for Calmer Evenings",
    description:
      "A warm bedside glow designed to make your room feel peaceful, cozy, and effortless.",
    images: [
      {
        url: "/images/product-studio.png",
        width: 1024,
        height: 1024,
        alt: "Dawnly warm egg-shaped bedside lamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawnly — Warm Bedside Lamp for Calmer Evenings",
    description:
      "A warm bedside glow designed to make your room feel peaceful, cozy, and effortless.",
    images: ["/images/product-studio.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF6EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Resolve theme before paint to avoid a light→dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-cream font-sans text-charcoal antialiased">
        <ThemeProvider>
          <CartProvider>
            <ScrollProgress />
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <BackToTop />
            <DiscountPopup />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
