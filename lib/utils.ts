import type { Money } from "./types";

/** Tiny className combiner (no extra dependency). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a Shopify Money object into a localized currency string. */
export function formatMoney(money?: Money | null): string {
  if (!money) return "";
  const amount = Number(money.amount);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: money.currencyCode || "USD",
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount} ${money.currencyCode ?? ""}`.trim();
  }
}

/** Percentage saved between a price and its compare-at price. */
export function discountPercent(price?: Money | null, compareAt?: Money | null): number | null {
  if (!price || !compareAt) return null;
  const p = Number(price.amount);
  const c = Number(compareAt.amount);
  if (!c || c <= p) return null;
  return Math.round(((c - p) / c) * 100);
}
