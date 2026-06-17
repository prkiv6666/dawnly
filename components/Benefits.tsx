import Reveal from "./Reveal";
import { Feather, Gift, SunGlow, Sparkle } from "./icons";

const BENEFITS = [
  {
    Icon: SunGlow,
    title: "Soft warm glow",
    body: "A gentle amber light with no harsh blue tones — easy on tired eyes before sleep.",
  },
  {
    Icon: Feather,
    title: "Better bedroom atmosphere",
    body: "Instantly turns any room into a calm, cozy space made for winding down.",
  },
  {
    Icon: Sparkle,
    title: "Minimal modern design",
    body: "A smooth egg-shaped silhouette that looks beautiful on any nightstand.",
  },
  {
    Icon: Gift,
    title: "Perfect gift idea",
    body: "Thoughtful, aesthetic, and universally loved — ready to gift straight out of the box.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section-pad">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why people love it</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Small light, big difference
          </h2>
          <p className="mt-4 text-charcoal-soft">
            Everything about Dawnly is designed to help your evenings feel
            softer and your space feel more like home.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="card h-full transition-transform duration-300 hover:-translate-y-1">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-sunrise text-white shadow-soft">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-serif text-xl text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
