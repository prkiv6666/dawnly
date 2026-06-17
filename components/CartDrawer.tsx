"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/utils";
import { Bag, Close, Lock, Minus, Plus } from "./icons";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    loading,
    closeCart,
    updateItem,
    removeItem,
    checkout,
    demoMode,
  } = useCart();

  const lines = cart?.lines ?? [];
  const isEmpty = lines.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-soft-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.07] px-6 py-5">
              <h2 className="flex items-center gap-2 font-serif text-xl text-charcoal">
                <Bag className="h-5 w-5" />
                Your cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-black/[0.05]"
                aria-label="Close cart"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>

            {demoMode && (
              <p className="bg-amber/10 px-6 py-2.5 text-center text-xs text-amber-deep">
                Demo cart — connect Shopify to enable real checkout.
              </p>
            )}

            {/* Body */}
            {isEmpty ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-amber-deep shadow-soft">
                  <Bag className="h-7 w-7" />
                </span>
                <p className="mt-5 font-serif text-xl text-charcoal">
                  Your cart is empty
                </p>
                <p className="mt-1 text-sm text-charcoal-soft">
                  Add a little warmth to your evenings.
                </p>
                <Link
                  href="/product/dawnly"
                  onClick={closeCart}
                  className="btn-amber mt-6"
                >
                  Shop Dawnly
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-5">
                    {lines.map((line) => (
                      <li key={line.id} className="flex gap-4">
                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-beige">
                          {line.merchandise.image && (
                            <Image
                              src={line.merchandise.image.url}
                              alt={
                                line.merchandise.image.altText ||
                                line.merchandise.product.title
                              }
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-charcoal">
                                {line.merchandise.product.title}
                              </p>
                              {line.merchandise.title !== "Default Title" && (
                                <p className="text-xs text-charcoal-soft">
                                  {line.merchandise.title}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(line.id)}
                              className="text-xs text-charcoal-soft underline-offset-2 hover:text-charcoal hover:underline"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-black/15 bg-white/70">
                              <button
                                type="button"
                                onClick={() =>
                                  updateItem(line.id, line.quantity - 1)
                                }
                                disabled={loading}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-charcoal hover:bg-black/[0.05]"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-7 text-center text-sm font-semibold tabular-nums">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateItem(line.id, line.quantity + 1)
                                }
                                disabled={loading}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-charcoal hover:bg-black/[0.05]"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-charcoal">
                              {formatMoney(line.cost.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-black/[0.07] px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal-soft">Subtotal</span>
                    <span className="font-semibold text-charcoal">
                      {formatMoney(cart?.cost.subtotalAmount)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-charcoal-soft">
                    Shipping & taxes calculated at checkout.
                  </p>
                  <button
                    type="button"
                    onClick={checkout}
                    disabled={loading}
                    className="btn-primary mt-4 w-full"
                  >
                    <Lock className="h-4 w-4" />
                    {loading ? "Working…" : "Checkout"}
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-2 w-full py-2 text-sm font-medium text-charcoal-soft hover:text-charcoal"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
