const OUTLETS = [
  "VOGUE",
  "Architectural Digest",
  "Wirecutter",
  "GOOP",
  "Dwell",
  "Kinfolk",
  "The Spruce",
  "Apartment Therapy",
];

/**
 * Infinite, edge-faded marquee of press mentions. The track is duplicated so
 * the -50% keyframe loops seamlessly.
 */
export default function PressMarquee() {
  return (
    <section className="py-10 sm:py-12">
      <div className="container-px">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal-soft/70">
          As featured in
        </p>
        <div className="marquee-mask mt-6 flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
            {[...OUTLETS, ...OUTLETS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= OUTLETS.length}
                className="whitespace-nowrap font-serif text-xl text-charcoal/45 transition-colors hover:text-charcoal/70 sm:text-2xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
