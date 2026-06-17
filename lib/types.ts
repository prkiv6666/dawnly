// ─────────────────────────────────────────────────────────────
// Shared domain types used across the Dawnly storefront.
// These intentionally mirror a normalized subset of the Shopify
// Storefront API so the UI never depends on raw GraphQL shapes.
// ─────────────────────────────────────────────────────────────

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
  image?: ProductImage | null;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ProductImage | null;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  /** True when this is built-in demo data (no Shopify configured). */
  isDemo?: boolean;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image: ProductImage | null;
    product: {
      handle: string;
      title: string;
    };
    selectedOptions: { name: string; value: string }[];
    price: Money;
  };
  cost: {
    totalAmount: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  /** True when this cart is managed locally (no Shopify configured). */
  isDemo?: boolean;
}
