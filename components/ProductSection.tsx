"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product, ProductVariant } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { cn, discountPercent, formatMoney } from "@/lib/utils";
import Accordion, { type AccordionItem } from "./Accordion";
import { Check, Lock, Minus, Plus, Refresh, Truck } from "./icons";

const BENEFIT_BULLETS = [
  "Soft, flicker-free warm glow — easy on the eyes",
  "Touch-dimmable from candle-soft to reading bright",
  "Rechargeable & cordless — up to 40 hours per charge",
  "Minimal egg shape that suits any nightstand",
];

const TRUST = [
  { Icon: Lock, label: "Secure checkout" },
  { Icon: Truck, label: "Fast shipping" },
  { Icon: Refresh, label: "Easy returns" },
];

function findVariant(
  variants: ProductVariant[],
  selected: Record<string, string>,
): ProductVariant | undefined {
  return variants.find((v) =>
    v.selectedOptions.every((o) => selected[o.name] === o.value),
  );
}

export default function ProductSection({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem, buyNow, loading, error, demoMode } = useCart();

  const firstAvailable =
    product.variants.find((v) => v.availableForSale) ?? product.variants[0];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        (firstAvailable?.selectedOptions ?? []).map((o) => [o.name, o.value]),
      ),
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [pending, setPending] = useState<"add" | "buy" | null>(null);

  const selectedVariant =
    findVariant(product.variants, selectedOptions) ?? firstAvailable;

  const images = product.images.length
    ? product.images
    : product.featuredImage
      ? [product.featuredImage]
      : [];

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = selectedVariant?.compareAtPrice ?? null;
  const saved = useMemo(
    () => discountPercent(price, compareAt),
    [price, compareAt],
  );

  const soldOut = selectedVariant && !selectedVariant.availableForSale;

  function selectOption(name: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
    // Sync gallery to the variant image if it has one.
    const next = findVariant(product.variants, {
      ...selectedOptions,
      [name]: value,
    });
    if (next?.image) {
      const idx = images.findIndex((img) => img.url === next.image?.url);
      if (idx >= 0) setActiveImage(idx);
    }
  }

  async function handleAdd() {
    if (!selectedVariant) return;
    setPending("add");
    await addItem(selectedVariant.id, quantity);
    setPending(null);
  }

  async function handleBuyNow() {
    if (!selectedVariant) return;
    setPending("buy");
    await buyNow(selectedVariant.id, quantity);
    setPending(null);
  }

  const accordionItems: AccordionItem[] = [
    {
      title: "Description",
      content: product.descriptionHtml ? (
        <div
          className="prose-sm space-y-2"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      ) : (
        <p>{product.description}</p>
      ),
    },
    {
      title: "Shipping",
      content:
        "Orders ship within 1–2 business days. Standard delivery takes 5–9 business days with tracking provided. Free shipping on every order.",
    },
    {
      title: "Returns",
      content:
        "Try Dawnly for 30 nights. If it's not right for your space, contact us for a hassle-free return or exchange.",
    },
    {
      title: "Care",
      content:
        "Wipe gently with a soft, dry cloth. Recharge via the included USB-C cable. Keep away from water and direct heat.",
    },
  ];

  return (
    <section id="product" className={cn("section-pad", className)}>
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.6, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-square w-full overflow-hidden rounded-5xl bg-beige shadow-soft-lg"
            >
              {images[activeImage] && (
                <Image
                  src={images[activeImage].url}
                  alt={images[activeImage].altText || product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              {saved && (
                <span className="absolute left-5 top-5 rounded-full bg-amber px-3 py-1 text-xs font-bold text-white shadow-soft">
                  Save {saved}%
                </span>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((img, i) => (
                  <button
                    key={img.url + i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-2xl ring-2 transition-all",
                      activeImage === i
                        ? "ring-amber"
                        : "ring-transparent hover:ring-amber/40",
                    )}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || `${product.title} thumbnail ${i + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy box */}
          <div>
            {demoMode && (
              <div className="mb-5 rounded-2xl border border-amber/30 bg-amber/10 px-4 py-3 text-xs text-amber-deep">
                Demo mode — showing sample product data. Add your Shopify keys
                in <code className="font-semibold">.env.local</code> to go live.
              </div>
            )}

            <p className="eyebrow">Bestseller</p>
            <h1 className="mt-2 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold text-charcoal">
                {formatMoney(price)}
              </span>
              {compareAt && (
                <span className="text-lg text-charcoal/40 line-through">
                  {formatMoney(compareAt)}
                </span>
              )}
              {saved && (
                <span className="rounded-full bg-amber/15 px-2.5 py-1 text-xs font-semibold text-amber-deep">
                  −{saved}%
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-charcoal-soft">
              <span className="text-amber">★★★★★</span>
              <span>4.9 · 2,400+ reviews</span>
            </div>

            {/* Benefit bullets */}
            <ul className="mt-6 space-y-2.5">
              {BENEFIT_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-charcoal">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Variant pickers */}
            {product.options
              .filter((o) => o.values.length > 1 || o.name !== "Title")
              .map((option) => (
                <div key={option.id} className="mt-7">
                  <span className="text-sm font-medium text-charcoal">
                    {option.name}:{" "}
                    <span className="text-charcoal-soft">
                      {selectedOptions[option.name]}
                    </span>
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const active = selectedOptions[option.name] === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => selectOption(option.name, value)}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                            active
                              ? "border-charcoal bg-charcoal text-cream"
                              : "border-black/15 bg-surface/60 text-charcoal hover:border-charcoal/40",
                          )}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Quantity + actions */}
            <div className="mt-7 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-black/15 bg-surface/60">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-black/[0.05] disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-black/[0.05]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-charcoal-soft">
                Free shipping today
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAdd}
                disabled={loading || soldOut}
                className="btn-primary w-full text-base"
              >
                {pending === "add"
                  ? "Adding…"
                  : soldOut
                    ? "Sold out"
                    : "Add to cart"}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={loading || soldOut}
                className="btn-amber w-full text-base"
              >
                {pending === "buy" ? "Starting checkout…" : "Buy it now"}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            {/* Trust row */}
            <div className="mt-7 grid grid-cols-3 gap-2 rounded-3xl bg-surface/60 p-4 ring-1 ring-black/[0.03]">
              {TRUST.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <Icon className="h-5 w-5 text-amber-deep" />
                  <span className="text-[11px] font-medium text-charcoal-soft sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordion tabs */}
            <div className="mt-8 rounded-4xl bg-surface/60 px-6 ring-1 ring-black/[0.03]">
              <Accordion items={accordionItems} defaultOpen={0} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
