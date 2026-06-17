import Image from "next/image";
import Link from "next/link";
import { PRODUCT_PATH } from "@/lib/shopify";
import Reveal from "./Reveal";

export default function LifestyleBanner() {
  return (
    <section className="section-pad">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-6xl">
            <Image
              src="/images/lifestyle-couple-reading.png"
              alt="Couple relaxing together in bed beside a warm Dawnly lamp"
              width={1024}
              height={1024}
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="h-[420px] w-full object-cover object-center sm:h-[480px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/45 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-px">
                <div className="max-w-lg">
                  <h2 className="font-serif text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
                    Turn your room into a softer place to rest.
                  </h2>
                  <Link href={PRODUCT_PATH} className="btn-amber mt-8">
                    Get Dawnly
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
