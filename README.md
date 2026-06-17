# Dawnly — Premium One-Product Storefront

A custom-coded, conversion-focused storefront for **Dawnly**, a warm egg-shaped
bedside lamp. Built to feel like a real wellness/sleep/light brand — cozy,
modern, and fast.

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS** with a warm sunrise palette
- **Framer Motion** for subtle, lightweight animations
- **Shopify Storefront API** for products, cart, and checkout
- Fully responsive, mobile-first, iPhone-polished
- **Runs out of the box on demo data** when Shopify isn't configured yet

---

## 1. How to install dependencies

You need **Node 18.18+** (Node 20+ recommended).

```bash
cd dawnly
npm install
```

> Add your product photos first — see **Product images** below.

---

## 2. How to add your Shopify API keys

1. Copy the example env file:

   ```bash
   cp .env.example .env.local      # macOS / Linux
   copy .env.example .env.local    # Windows (cmd)
   ```

2. In **Shopify admin → Settings → Apps and sales channels → Develop apps**,
   create (or open) a custom app and **install** it on your store.

3. Under **API credentials**, enable the **Storefront API** and grant at least:
   `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`,
   `unauthenticated_write_checkouts`, and `unauthenticated_read_checkouts`.
   Copy the **Storefront API access token**.

4. Fill in `.env.local`:

   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
   NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE=dawnly
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

   - `NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE` must match the product's handle in
     Shopify (the slug in the product URL).
   - If these values are **blank or missing**, the site automatically serves
     built-in **demo product data** so you can develop locally.

---

## 3. How to run locally

```bash
npm run dev
```

Open <http://localhost:3000>. Edit any file and it hot-reloads.

Production check locally:

```bash
npm run build
npm run start
```

### Product images

Drop your 6 photos into `public/images/` using the exact filenames listed in
[`public/images/README.md`](public/images/README.md). They power the hero,
storytelling blocks, lifestyle banner, and product gallery (in demo mode).
When Shopify is connected, the **product gallery** uses your Shopify images,
while the marketing sections keep using these local lifestyle photos.

---

## 4. How to deploy on Vercel

1. Push this folder to a GitHub/GitLab repo.
2. Go to <https://vercel.com/new> and **import** the repo.
3. Vercel auto-detects Next.js — no build settings needed.
4. Add your **Environment Variables** (same keys as `.env.local`):
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE`
   - `NEXT_PUBLIC_SITE_URL` (your final domain)
5. Click **Deploy**. Add your custom domain under **Settings → Domains**.

> Re-deploy after changing env vars so the new values are baked in.

---

## 5. How DSers fits in through Shopify

You do **not** connect DSers to this codebase directly — it lives entirely
inside Shopify. The flow:

1. **Customer** browses this Next.js storefront and checks out via Shopify's
   secure hosted checkout (`cart.checkoutUrl`).
2. The order lands in your **Shopify admin** as a normal order.
3. **DSers** (installed from the Shopify App Store and linked to your AliExpress
   supplier) syncs that order and lets you fulfill it to the supplier in a few
   clicks.
4. DSers pushes **tracking numbers** back to Shopify, which emails the customer.

So the responsibility split is:

| Layer            | Handles                                             |
| ---------------- | --------------------------------------------------- |
| This storefront  | Branding, product page, cart, redirect to checkout  |
| Shopify          | Payments, orders, customer emails, product catalog  |
| DSers            | Supplier fulfillment + tracking sync (inside Shopify)|

Nothing about DSers needs to change in this code. Just keep your product's
handle in sync between Shopify and `NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE`.

---

## Project structure

```
app/
  layout.tsx                 Root layout, fonts, SEO + OG metadata, providers
  page.tsx                   Homepage (all sections)
  product/[handle]/page.tsx  Product page (+ dynamic metadata, JSON-LD)
  cart/page.tsx              Full cart page
  policies/                  shipping · returns · privacy · terms
  sitemap.ts / robots.ts     SEO routes
components/                  Header, Footer, Hero, Benefits, ProductSection,
                             CartDrawer, Comparison, Reviews, FAQ, etc.
context/CartContext.tsx      Cart state (Shopify or local demo cart)
lib/
  shopify.ts                 Storefront API client + demo fallback
  types.ts                   Normalized domain types
  utils.ts                   Money formatting + helpers
public/images/               Your product/lifestyle photos
```

## Shopify helper functions (`lib/shopify.ts`)

`getProductByHandle()` · `createCart()` · `addToCart()` · `updateCartLines()` ·
`removeCartLines()` · `getCart()` · `redirectToCheckout()`

Each one talks to the Storefront API when configured, and transparently falls
back to local demo behavior when it isn't.
