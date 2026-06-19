"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PRODUCT_PATH } from "@/lib/shopify";
import { Check, Close, Copy, SunGlow } from "./icons";

const STORAGE_KEY = "dawnly_promo";
const DISCOUNT_CODE = "DAWN10";
// How long to wait before the popup invites itself in (ms).
const OPEN_DELAY = 9000;

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Decide whether to show: skip if the visitor already saw or claimed it.
  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (seen) return;

    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY);

    // Exit-intent: pointer leaves through the top of the viewport.
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) setOpen(true);
    };
    document.addEventListener("mouseout", onExit);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onExit);
    };
  }, []);

  // Lock scroll + focus the field + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 250);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function remember(value: "dismissed" | "subscribed") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }

  function close() {
    setOpen(false);
    // Only mark "dismissed" if they didn't subscribe (keeps the code on screen).
    if (!subscribed) remember("dismissed");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Could not subscribe right now. Please try again.");
        return;
      }
      setSubscribed(true);
      setEmail("");
      remember("subscribed");
    } catch {
      setError("Could not subscribe right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the code is still visible to copy manually */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="10% off offer"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-5xl bg-surface shadow-soft-lg ring-1 ring-black/[0.05] dark:ring-white/[0.06]"
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
          >
            {/* Sunrise banner */}
            <div className="relative h-28 bg-sunrise">
              <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-amber-deep/25 blur-2xl" />
              <span className="absolute bottom-4 left-7 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-amber-deep shadow-soft">
                <SunGlow className="h-4 w-4" />
                Limited welcome offer
              </span>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/15 text-white backdrop-blur transition-colors hover:bg-black/30"
            >
              <Close className="h-5 w-5" />
            </button>

            <div className="px-7 pb-8 pt-6 sm:px-9">
              {subscribed ? (
                <div className="text-center">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber/15 text-amber-deep">
                    <Check className="h-7 w-7" />
                  </span>
                  <h2 className="mt-4 font-serif text-2xl text-charcoal">
                    You&apos;re in — here&apos;s your 10% off
                  </h2>
                  <p className="mt-2 text-sm text-charcoal-soft">
                    Use this code at checkout. We&apos;ve also sent it to your
                    inbox.
                  </p>

                  <button
                    type="button"
                    onClick={copyCode}
                    className="group mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-amber/50 bg-amber/[0.06] px-5 py-4 transition-colors hover:bg-amber/10"
                  >
                    <span className="font-serif text-2xl font-semibold tracking-[0.15em] text-charcoal">
                      {DISCOUNT_CODE}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-deep">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copy
                        </>
                      )}
                    </span>
                  </button>

                  <Link
                    href={PRODUCT_PATH}
                    onClick={() => setOpen(false)}
                    className="btn-amber mt-5 w-full"
                  >
                    Shop with 10% off
                  </Link>
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-2xl leading-tight text-charcoal sm:text-3xl">
                    Get 10% off your first glow
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                    Subscribe for soft-living tips and early access — we&apos;ll
                    send a 10% discount code straight to your inbox.
                  </p>

                  <form onSubmit={onSubmit} className="mt-5 space-y-3">
                    <input
                      ref={inputRef}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="you@email.com"
                      aria-label="Email address"
                      aria-invalid={Boolean(error)}
                      className={
                        "w-full rounded-2xl border bg-surface px-4 py-3.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 " +
                        (error
                          ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                          : "border-charcoal/15 focus:border-amber focus:ring-amber/20")
                      }
                    />
                    {error && (
                      <p className="text-xs font-medium text-red-500">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-amber w-full"
                    >
                      {submitting ? "Subscribing…" : "Reveal my 10% code"}
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={close}
                    className="mt-4 block w-full text-center text-xs font-medium text-charcoal-soft/70 underline-offset-2 transition-colors hover:text-charcoal hover:underline"
                  >
                    No thanks, I&apos;ll pay full price
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
