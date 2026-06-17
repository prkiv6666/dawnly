"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Instagram, Pinterest, TikTok } from "./icons";

const SHOP_LINKS = [
  { label: "Shop Dawnly", href: "/product/dawnly" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
];

const POLICY_LINKS = [
  { label: "Shipping Policy", href: "/policies/shipping" },
  { label: "Return Policy", href: "/policies/returns" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Service", href: "/policies/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    // Hook this up to Shopify / Klaviyo / your ESP of choice.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="mt-10 bg-charcoal text-cream/90">
      <div className="container-px py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <span className="font-serif text-3xl font-semibold text-cream">
              dawnly
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Warm, egg-shaped bedside light designed to make your room feel
              peaceful, cozy, and effortless — evening after evening.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { Icon: TikTok, label: "TikTok", href: "https://tiktok.com" },
                { Icon: Pinterest, label: "Pinterest", href: "https://pinterest.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-amber hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              Shop
            </h3>
            <ul className="mt-5 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/75 transition-colors hover:text-amber-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              Support
            </h3>
            <ul className="mt-5 space-y-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/75 transition-colors hover:text-amber-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-cream/75 transition-colors hover:text-amber-soft"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              Stay cozy
            </h3>
            <p className="mt-5 text-sm text-cream/70">
              Join for soft-living tips and early access to new warm tones.
            </p>
            {submitted ? (
              <p className="mt-4 rounded-2xl bg-cream/10 px-4 py-3 text-sm text-amber-soft">
                Thanks — you&apos;re on the list. ✨
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-full border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-amber/60 focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-amber text-white transition-colors hover:bg-amber-deep"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} Dawnly. All rights reserved.
          </p>
          <p className="text-xs text-cream/50">
            Designed for calmer evenings and gentler mornings.
          </p>
        </div>
      </div>
    </footer>
  );
}
