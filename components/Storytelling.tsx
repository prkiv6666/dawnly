import Image from "next/image";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

const STORIES = [
  {
    title: "Designed for calm nights",
    body: "Dawnly's warm tone tells your body it's time to slow down. Dim it low as the evening settles and let the room soften around you.",
    image: "/images/lifestyle-couple-reading.png",
    alt: "Couple relaxing and reading in bed beside a glowing Dawnly lamp at night",
  },
  {
    title: "Soft light without harsh brightness",
    body: "No cold glare, no flicker — just a gentle glow you can touch-dim from candle-soft to a comfortable reading light.",
    image: "/images/lifestyle-woman-reading.png",
    alt: "Woman reading in bed with a warm Dawnly lamp and a coffee mug nearby",
  },
  {
    title: "Beautiful on any nightstand",
    body: "The smooth egg shape and matte finish feel intentional next to a book, a candle, or a morning coffee. It simply belongs.",
    image: "/images/product-nightstand-dark.png",
    alt: "Dawnly lamp glowing on a wooden nightstand in a dark, cozy bedroom",
  },
  {
    title: "Simple, smooth, and aesthetic",
    body: "Rechargeable and cordless, with one effortless touch control. No clutter, no complicated apps — just warm light when you want it.",
    image: "/images/product-sofa-living.png",
    alt: "Dawnly lamp on a round side table in front of a beige sofa",
  },
];

export default function Storytelling() {
  return (
    <section id="how-it-works" className="section-pad bg-warm-fade">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
            A softer way to light your room
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {STORIES.map((story, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={story.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  className={cn(reversed && "lg:order-2")}
                  delay={0.05}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-5xl shadow-soft-lg">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>

                <Reveal className={cn(reversed && "lg:order-1")} delay={0.12}>
                  <div className="max-w-md">
                    <span className="text-sm font-semibold text-amber-deep">
                      0{i + 1}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl text-charcoal sm:text-3xl">
                      {story.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-charcoal-soft">
                      {story.body}
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
