import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Storytelling from "@/components/Storytelling";
import ProductSection from "@/components/ProductSection";
import LifestyleBanner from "@/components/LifestyleBanner";
import Comparison from "@/components/Comparison";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import { getProductByHandle, PRODUCT_HANDLE } from "@/lib/shopify";

export default async function HomePage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  return (
    <>
      <Hero />
      <Benefits />
      <Storytelling />
      {product && <ProductSection product={product} className="bg-warm-fade" />}
      <LifestyleBanner />
      <Comparison />
      <Reviews />
      <FAQ />
      <Contact />
      <FinalCTA />
    </>
  );
}
