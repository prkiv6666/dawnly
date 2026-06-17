import Reveal from "./Reveal";
import { Star } from "./icons";

const REVIEWS = [
  {
    name: "Maya R.",
    location: "Portland, OR",
    text: "It completely changed my evenings. The glow is so warm and calming — I actually look forward to winding down now.",
  },
  {
    name: "Daniel K.",
    location: "Austin, TX",
    text: "Looks far more expensive than it is. Sits perfectly on my nightstand and the dimming is buttery smooth.",
  },
  {
    name: "Sofia L.",
    location: "Brooklyn, NY",
    text: "Bought one for myself and three as gifts. Everyone keeps asking where it's from. Genuinely the coziest light.",
  },
  {
    name: "Aiden M.",
    location: "Seattle, WA",
    text: "No harsh blue light before bed anymore. My partner and I both sleep better with this on low.",
  },
  {
    name: "Priya S.",
    location: "San Diego, CA",
    text: "Minimal, beautiful, and the battery lasts forever. It's the little detail that makes the whole room feel calmer.",
  },
  {
    name: "Liam B.",
    location: "Denver, CO",
    text: "The warm light is unreal. Feels like a tiny sunrise in the corner of the room. Worth every penny.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section-pad">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Loved in 12,000+ rooms</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Warm words from cozy people
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex text-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5" />
              ))}
            </div>
            <span className="text-sm font-medium text-charcoal-soft">
              4.9 average from 2,400+ reviews
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={(i % 3) * 0.08}>
              <figure className="card flex h-full flex-col">
                <div className="flex text-amber">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-charcoal">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sunrise text-sm font-semibold text-white">
                    {review.name.charAt(0)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-charcoal">
                      {review.name}
                    </span>
                    <span className="text-charcoal-soft">{review.location}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
