// ─────────────────────────────────────────────────────────────
// Shopify Storefront API client for the Dawnly storefront.
//
// All product + cart access goes through this module. When the
// Shopify environment variables are missing, every function
// transparently falls back to built-in demo data (persisted in
// localStorage for the cart) so the site runs fully offline.
// ─────────────────────────────────────────────────────────────

import type {
  Cart,
  CartLine,
  Money,
  Product,
  ProductVariant,
} from "./types";

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

export const PRODUCT_HANDLE =
  process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE?.trim() || "dawnly";

/** Canonical internal link to the product page (uses the configured handle). */
export const PRODUCT_PATH = `/product/${PRODUCT_HANDLE}`;

/** Whether real Shopify credentials are present. */
export const isShopifyConfigured = Boolean(STORE_DOMAIN && ACCESS_TOKEN);

const API_VERSION = "2025-01";
const endpoint = STORE_DOMAIN
  ? `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`
  : "";

// ─────────────────────────────────────────────────────────────
// Low-level GraphQL fetch
// ─────────────────────────────────────────────────────────────

interface ShopifyFetchArgs {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
}

async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store",
  revalidate,
}: ShopifyFetchArgs): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error("Shopify is not configured.");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    ...(typeof revalidate === "number"
      ? { next: { revalidate } }
      : { cache }),
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify returned no data.");
  }

  return json.data;
}

// ─────────────────────────────────────────────────────────────
// GraphQL fragments + documents
// ─────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 12) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              product {
                handle
                title
              }
            }
          }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────
// Reshape helpers (raw Shopify → normalized domain types)
// ─────────────────────────────────────────────────────────────

/* Raw GraphQL nodes are loosely typed; we normalize them into domain types. */
// eslint-disable-next-line
type RawNode = any;

function reshapeProduct(node: RawNode): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description ?? "",
    descriptionHtml: node.descriptionHtml ?? "",
    featuredImage: node.featuredImage ?? null,
    images: (node.images?.edges ?? []).map((e: RawNode) => e.node),
    options: node.options ?? [],
    variants: (node.variants?.edges ?? []).map((e: RawNode) => ({
      id: e.node.id,
      title: e.node.title,
      availableForSale: e.node.availableForSale,
      price: e.node.price,
      compareAtPrice: e.node.compareAtPrice ?? null,
      selectedOptions: e.node.selectedOptions ?? [],
      image: e.node.image ?? null,
    })),
    priceRange: node.priceRange,
  };
}

function reshapeCart(node: RawNode): Cart {
  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    totalQuantity: node.totalQuantity ?? 0,
    cost: node.cost,
    lines: (node.lines?.edges ?? []).map((e: RawNode) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      cost: e.node.cost,
      merchandise: {
        id: e.node.merchandise.id,
        title: e.node.merchandise.title,
        image: e.node.merchandise.image ?? null,
        price: e.node.merchandise.price,
        selectedOptions: e.node.merchandise.selectedOptions ?? [],
        product: e.node.merchandise.product,
      },
    })),
  };
}

// ─────────────────────────────────────────────────────────────
// Public API — products
// ─────────────────────────────────────────────────────────────

/** Fetch a product by handle. Falls back to demo data when unconfigured. */
export async function getProductByHandle(
  handle: string = PRODUCT_HANDLE,
): Promise<Product | null> {
  if (!isShopifyConfigured) {
    return getDemoProduct(handle);
  }

  try {
    const data = await shopifyFetch<{ product: unknown | null }>({
      query: /* GraphQL */ `
        ${PRODUCT_FRAGMENT}
        query getProduct($handle: String!) {
          product(handle: $handle) {
            ...ProductFields
          }
        }
      `,
      variables: { handle },
      revalidate: 60 * 30, // 30 minutes
    });

    if (!data.product) return null;
    return reshapeProduct(data.product);
  } catch (error) {
    console.error("getProductByHandle failed, serving demo data:", error);
    return getDemoProduct(handle);
  }
}

// ─────────────────────────────────────────────────────────────
// Public API — cart
// ─────────────────────────────────────────────────────────────

export async function createCart(): Promise<Cart> {
  if (!isShopifyConfigured) return createDemoCart();

  const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>({
    query: /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation cartCreate {
        cartCreate {
          cart {
            ...CartFields
          }
        }
      }
    `,
  });
  return reshapeCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured) return readDemoCart(cartId);

  try {
    const data = await shopifyFetch<{ cart: unknown | null }>({
      query: /* GraphQL */ `
        ${CART_FRAGMENT}
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            ...CartFields
          }
        }
      `,
      variables: { cartId },
    });
    if (!data.cart) return null;
    return reshapeCart(data.cart);
  } catch (error) {
    console.error("getCart failed:", error);
    return null;
  }
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  if (!isShopifyConfigured) return demoAddToCart(cartId, lines);

  const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>({
    query: /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
    `,
    variables: { cartId, lines },
  });
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  if (!isShopifyConfigured) return demoUpdateCartLines(cartId, lines);

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: unknown } }>({
    query: /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
    `,
    variables: { cartId, lines },
  });
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  if (!isShopifyConfigured) return demoRemoveCartLines(cartId, lineIds);

  const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>({
    query: /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
        }
      }
    `,
    variables: { cartId, lineIds },
  });
  return reshapeCart(data.cartLinesRemove.cart);
}

/** Send the shopper to Shopify's hosted, secure checkout. */
export function redirectToCheckout(cart: Cart | null): void {
  if (typeof window === "undefined") return;
  if (cart && cart.checkoutUrl && !cart.checkoutUrl.startsWith("#")) {
    window.location.href = cart.checkoutUrl;
    return;
  }
  // Demo fallback — no real Shopify store connected.
  window.alert(
    "Demo mode: connect your Shopify Storefront API keys in .env.local to enable real checkout.",
  );
}

// ─────────────────────────────────────────────────────────────
// Demo data + local demo cart (used when Shopify is unconfigured)
// ─────────────────────────────────────────────────────────────

const DEMO_CURRENCY = "USD";
const money = (amount: string): Money => ({ amount, currencyCode: DEMO_CURRENCY });

const DEMO_IMAGES = [
  {
    url: "/images/product-studio.png",
    altText: "Dawnly warm egg-shaped lamp on a clean white studio background",
    width: 1024,
    height: 1024,
  },
  {
    url: "/images/product-nightstand-dark.png",
    altText: "Dawnly lamp glowing warmly on a wooden nightstand in a dark bedroom",
    width: 1024,
    height: 1024,
  },
  {
    url: "/images/product-sofa-living.png",
    altText: "Dawnly lamp on a round table in front of a cozy beige sofa",
    width: 1024,
    height: 1024,
  },
  {
    url: "/images/lifestyle-woman-reading.png",
    altText: "Woman reading in bed beside the warm glow of a Dawnly lamp",
    width: 1024,
    height: 1024,
  },
];

const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: "demo-variant-single",
    title: "1 Dawnly",
    availableForSale: true,
    price: money("49.00"),
    compareAtPrice: money("79.00"),
    selectedOptions: [{ name: "Bundle", value: "1 Dawnly" }],
    image: DEMO_IMAGES[0],
  },
  {
    id: "demo-variant-duo",
    title: "2 Dawnly · Save 15%",
    availableForSale: true,
    price: money("83.00"),
    compareAtPrice: money("158.00"),
    selectedOptions: [{ name: "Bundle", value: "2 Dawnly · Save 15%" }],
    image: DEMO_IMAGES[0],
  },
  {
    id: "demo-variant-trio",
    title: "3 Dawnly · Save 25%",
    availableForSale: true,
    price: money("110.00"),
    compareAtPrice: money("237.00"),
    selectedOptions: [{ name: "Bundle", value: "3 Dawnly · Save 25%" }],
    image: DEMO_IMAGES[0],
  },
];

function getDemoProduct(handle: string): Product {
  return {
    id: "demo-product-dawnly",
    handle: handle || PRODUCT_HANDLE,
    title: "Dawnly — Warm Bedside Lamp",
    description:
      "A warm, egg-shaped bedside glow designed to make your room feel peaceful, cozy, and effortless. Touch-dimmable, rechargeable, and beautiful on any nightstand.",
    descriptionHtml:
      "<p>A warm, egg-shaped bedside glow designed to make your room feel peaceful, cozy, and effortless.</p><ul><li>Soft, flicker-free warm light (no harsh blue tones)</li><li>Touch-dimmable from a candle-soft glow to a gentle reading light</li><li>Rechargeable — up to 40 hours on a single charge</li><li>Minimal, modern silhouette that suits any room</li></ul>",
    featuredImage: DEMO_IMAGES[0],
    images: DEMO_IMAGES,
    options: [
      {
        id: "demo-option-bundle",
        name: "Bundle",
        values: ["1 Dawnly", "2 Dawnly · Save 15%", "3 Dawnly · Save 25%"],
      },
    ],
    variants: DEMO_VARIANTS,
    priceRange: {
      minVariantPrice: money("49.00"),
      maxVariantPrice: money("110.00"),
    },
    isDemo: true,
  };
}

// ── Local demo cart (localStorage backed) ──────────────────────

const DEMO_CART_KEY = "dawnly_demo_cart_id";
const DEMO_CART_PREFIX = "dawnly_demo_cart_";

function emptyDemoCart(): Cart {
  return {
    id: `demo-cart-${Date.now()}`,
    checkoutUrl: "#demo-checkout",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: money("0.00"),
      totalAmount: money("0.00"),
    },
    isDemo: true,
  };
}

function persistDemoCart(cart: Cart): Cart {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DEMO_CART_PREFIX + cart.id, JSON.stringify(cart));
    window.localStorage.setItem(DEMO_CART_KEY, cart.id);
  }
  return cart;
}

function recalcDemoCart(cart: Cart): Cart {
  let qty = 0;
  let subtotal = 0;
  for (const line of cart.lines) {
    qty += line.quantity;
    subtotal += Number(line.merchandise.price.amount) * line.quantity;
    line.cost = {
      totalAmount: money(
        (Number(line.merchandise.price.amount) * line.quantity).toFixed(2),
      ),
    };
  }
  cart.totalQuantity = qty;
  cart.cost = {
    subtotalAmount: money(subtotal.toFixed(2)),
    totalAmount: money(subtotal.toFixed(2)),
  };
  return cart;
}

async function createDemoCart(): Promise<Cart> {
  return persistDemoCart(emptyDemoCart());
}

async function readDemoCart(cartId: string): Promise<Cart | null> {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(DEMO_CART_PREFIX + cartId);
  return raw ? (JSON.parse(raw) as Cart) : null;
}

function demoLineFromVariant(
  variantId: string,
  quantity: number,
): CartLine | null {
  const product = getDemoProduct(PRODUCT_HANDLE);
  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) return null;
  return {
    id: `demo-line-${variantId}`,
    quantity,
    merchandise: {
      id: variant.id,
      title: variant.title,
      image: variant.image ?? product.featuredImage,
      price: variant.price,
      selectedOptions: variant.selectedOptions,
      product: { handle: product.handle, title: product.title },
    },
    cost: {
      totalAmount: money(
        (Number(variant.price.amount) * quantity).toFixed(2),
      ),
    },
  };
}

async function demoAddToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const cart = (await readDemoCart(cartId)) ?? emptyDemoCart();
  for (const { merchandiseId, quantity } of lines) {
    const existing = cart.lines.find(
      (l) => l.merchandise.id === merchandiseId,
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      const line = demoLineFromVariant(merchandiseId, quantity);
      if (line) cart.lines.push(line);
    }
  }
  return persistDemoCart(recalcDemoCart(cart));
}

async function demoUpdateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  const cart = (await readDemoCart(cartId)) ?? emptyDemoCart();
  for (const { id, quantity } of lines) {
    const line = cart.lines.find((l) => l.id === id);
    if (line) line.quantity = Math.max(0, quantity);
  }
  cart.lines = cart.lines.filter((l) => l.quantity > 0);
  return persistDemoCart(recalcDemoCart(cart));
}

async function demoRemoveCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const cart = (await readDemoCart(cartId)) ?? emptyDemoCart();
  cart.lines = cart.lines.filter((l) => !lineIds.includes(l.id));
  return persistDemoCart(recalcDemoCart(cart));
}
