import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductSection from "@/components/ProductSection";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Comparison from "@/components/Comparison";
import FinalCTA from "@/components/FinalCTA";
import StickyBuyBar from "@/components/StickyBuyBar";
import { getProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/utils";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) {
    return { title: "Product not found" };
  }

  const image = product.featuredImage?.url ?? "/images/product-studio.png";
  const price = formatMoney(product.priceRange.minVariantPrice);

  return {
    title: product.title,
    description: `${product.description} From ${price}.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: image, alt: product.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  // Product structured data for richer search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Dawnly" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2400",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductSection product={product} className="pt-10 sm:pt-14" />
      <Comparison />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <StickyBuyBar product={product} />
    </>
  );
}
