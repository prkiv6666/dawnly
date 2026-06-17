import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import PressMarquee from "@/components/PressMarquee";
import Benefits from "@/components/Benefits";
import Storytelling from "@/components/Storytelling";
import LampStudio from "@/components/LampStudio";
import UrgencyStrip from "@/components/UrgencyStrip";
import ProductSection from "@/components/ProductSection";
import LifestyleBanner from "@/components/LifestyleBanner";
import Comparison from "@/components/Comparison";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import StickyBuyBar from "@/components/StickyBuyBar";
import { getProductByHandle, PRODUCT_HANDLE } from "@/lib/shopify";

export default async function HomePage() {
  const product = await getProductByHandle(PRODUCT_HANDLE);

  return (
    <>
      <Hero />
      <StatsBand />
      <PressMarquee />
      <Benefits />
      <Storytelling />
      <LampStudio />
      {product && (
        <>
          <UrgencyStrip />
          <ProductSection product={product} className="bg-warm-fade" />
        </>
      )}
      <LifestyleBanner />
      <Comparison />
      <Reviews />
      <FAQ />
      <Contact />
      <FinalCTA />
      {product && <StickyBuyBar product={product} />}
    </>
  );
}
