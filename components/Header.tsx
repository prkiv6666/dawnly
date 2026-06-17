"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { PRODUCT_PATH } from "@/lib/shopify";
import { Bag, Close, Menu, MoonStars, SunGlow } from "./icons";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-black/[0.05] dark:hover:bg-surface/[0.06]"
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      title={isDark ? "Day mode" : "Night mode"}
    >
      {isDark ? <SunGlow className="h-5 w-5" /> : <MoonStars className="h-5 w-5" />}
    </button>
  );
}

const NAV_LINKS = [
  { label: "Benefits", href: "/#benefits" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const { totalQuantity, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-black/[0.06] bg-cream/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-px flex h-16 items-center justify-between sm:h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight text-charcoal sm:text-[26px]"
          aria-label="Dawnly home"
        >
          dawnly
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal-soft transition-colors hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-black/[0.05]"
            aria-label="Open cart"
          >
            <Bag className="h-5 w-5" />
            {totalQuantity > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-[10px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </button>

          <Link href={PRODUCT_PATH} className="hidden btn-primary sm:inline-flex">
            Shop now
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-black/[0.05] md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream p-6 shadow-soft-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-semibold text-charcoal">
                  dawnly
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/[0.05]"
                  aria-label="Close menu"
                >
                  <Close className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3.5 text-lg font-medium text-charcoal transition-colors hover:bg-surface/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href={PRODUCT_PATH}
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-auto w-full"
              >
                Shop Dawnly
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
