"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/utils";
import { PRODUCT_PATH } from "@/lib/shopify";
import { Bag, Lock, Minus, Plus } from "@/components/icons";

export default function CartPage() {
  const { cart, loading, updateItem, removeItem, checkout, demoMode } =
    useCart();
  const lines = cart?.lines ?? [];
  const isEmpty = lines.length === 0;

  return (
    <div className="section-pad">
      <div className="container-px">
        <h1 className="font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">
          Your cart
        </h1>

        {demoMode && (
          <p className="mt-4 inline-block rounded-2xl border border-amber/30 bg-amber/10 px-4 py-2 text-xs text-amber-deep">
            Demo cart — connect Shopify to enable real checkout.
          </p>
        )}

        {isEmpty ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-5xl bg-white/60 px-6 py-20 text-center ring-1 ring-black/[0.03]">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream text-amber-deep shadow-soft">
              <Bag className="h-7 w-7" />
            </span>
            <p className="mt-5 font-serif text-2xl text-charcoal">
              Your cart is empty
            </p>
            <p className="mt-1 text-charcoal-soft">
              Bring home the warm glow that thousands fall asleep to.
            </p>
            <Link href={PRODUCT_PATH} className="btn-amber mt-7">
              Shop Dawnly
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            {/* Lines */}
            <ul className="divide-y divide-black/[0.07]">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-5 py-6 first:pt-0">
                  <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-3xl bg-beige sm:h-32 sm:w-28">
                    {line.merchandise.image && (
                      <Image
                        src={line.merchandise.image.url}
                        alt={
                          line.merchandise.image.altText ||
                          line.merchandise.product.title
                        }
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-charcoal">
                          {line.merchandise.product.title}
                        </p>
                        {line.merchandise.title !== "Default Title" && (
                          <p className="text-sm text-charcoal-soft">
                            {line.merchandise.title}
                          </p>
                        )}
                      </div>
                      <span className="font-semibold text-charcoal">
                        {formatMoney(line.cost.totalAmount)}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-black/15 bg-white/70">
                        <button
                          type="button"
                          onClick={() => updateItem(line.id, line.quantity - 1)}
                          disabled={loading}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-charcoal hover:bg-black/[0.05]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={loading}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-charcoal hover:bg-black/[0.05]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        className="text-sm text-charcoal-soft underline-offset-2 hover:text-charcoal hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="card">
                <h2 className="font-serif text-xl text-charcoal">
                  Order summary
                </h2>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-soft">Subtotal</span>
                    <span className="font-semibold text-charcoal">
                      {formatMoney(cart?.cost.subtotalAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-soft">Shipping</span>
                    <span className="text-charcoal">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/[0.07] pt-3 text-base">
                    <span className="font-medium text-charcoal">Total</span>
                    <span className="font-semibold text-charcoal">
                      {formatMoney(cart?.cost.totalAmount)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={checkout}
                  disabled={loading}
                  className="btn-primary mt-6 w-full"
                >
                  <Lock className="h-4 w-4" />
                  {loading ? "Working…" : "Secure checkout"}
                </button>
                <p className="mt-3 text-center text-xs text-charcoal-soft">
                  Taxes calculated at checkout · 30-day returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
