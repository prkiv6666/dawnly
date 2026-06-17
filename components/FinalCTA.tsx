import Link from "next/link";
import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="section-pad">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-6xl bg-sunrise px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-amber-deep/20 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-white sm:text-5xl">
                Make every night feel softer.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-white/85">
                Bring home the warm glow that thousands fall asleep to.
              </p>
              <Link
                href="/product/dawnly"
                className="btn mt-8 bg-charcoal text-cream shadow-soft-lg hover:bg-charcoal-soft"
              >
                Shop Dawnly now
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
