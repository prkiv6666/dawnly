"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { discountPercent, formatMoney } from "@/lib/utils";
import CountdownTimer from "./CountdownTimer";
import { Bag, Clock } from "./icons";

/**
 * Conversion-focused bar that slides up once the visitor scrolls past the hero
 * and adds the best-available variant to cart in one tap. Steps aside while the
 * cart drawer is open.
 */
export default function StickyBuyBar({ product }: { product: Product }) {
  const { addItem, loading, isOpen } = useCart();
  const [show, setShow] = useState(false);
  const [adding, setAdding] = useState(false);

  const variant =
    product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice ?? null;
  const saved = discountPercent(price, compareAt);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 240;
      setShow(window.scrollY > 720 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleAdd() {
    if (!variant) return;
    setAdding(true);
    await addItem(variant.id, 1);
    setAdding(false);
  }

  return (
    <AnimatePresence>
      {show && !isOpen && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className="fixed inset-x-0 bottom-0 z-40"
        >
          <div className="container-px pb-3 sm:pb-4">
            <div className="flex items-center gap-3 rounded-3xl border border-charcoal/[0.06] bg-cream/90 p-3 shadow-soft-lg backdrop-blur-md sm:gap-5 sm:p-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sunrise text-white shadow-soft sm:flex">
                <span className="text-lg">✦</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-base text-charcoal sm:text-lg">
                  Dawnly Lamp
                </p>
                <p className="flex items-center gap-2 text-xs text-charcoal-soft">
                  <span className="font-semibold text-charcoal">
                    {formatMoney(price)}
                  </span>
                  {compareAt && (
                    <span className="line-through opacity-60">
                      {formatMoney(compareAt)}
                    </span>
                  )}
                  {saved ? (
                    <span className="rounded-full bg-amber/15 px-2 py-0.5 font-semibold text-amber-deep">
                      −{saved}%
                    </span>
                  ) : null}
                </p>
              </div>

              <span className="hidden items-center gap-1.5 text-xs font-medium text-charcoal-soft md:flex">
                <Clock className="h-4 w-4 text-amber-deep" />
                <CountdownTimer className="tabular-nums" />
              </span>

              <button
                type="button"
                onClick={handleAdd}
                disabled={adding || loading || !variant?.availableForSale}
                className="btn-amber shrink-0 px-5 sm:px-7"
              >
                <Bag className="h-4 w-4" />
                {adding ? "Adding…" : "Add to cart"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
