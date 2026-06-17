import Reveal from "./Reveal";
import { Check, Close } from "./icons";

const ROWS = [
  "Soft ambient glow",
  "Modern aesthetic",
  "Cozy bedroom mood",
  "Gift-ready design",
  "Minimal footprint",
];

export default function Comparison() {
  return (
    <section className="section-pad bg-warm-fade">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The difference</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Dawnly vs. a regular bedside lamp
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-4xl bg-white/70 shadow-soft ring-1 ring-black/[0.03]">
            {/* Header row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 border-b border-black/[0.06] bg-cream/60 px-5 py-5 sm:px-8">
              <span className="text-sm font-semibold text-charcoal-soft">
                Feature
              </span>
              <span className="text-center font-serif text-lg font-semibold text-amber-deep">
                Dawnly
              </span>
              <span className="text-center text-sm font-medium text-charcoal-soft">
                Regular lamp
              </span>
            </div>

            {ROWS.map((row, i) => (
              <div
                key={row}
                className={
                  "grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 px-5 py-4 sm:px-8 " +
                  (i % 2 === 1 ? "bg-cream/40" : "")
                }
              >
                <span className="text-sm font-medium text-charcoal sm:text-base">
                  {row}
                </span>
                <span className="flex justify-center">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber/15 text-amber-deep">
                    <Check className="h-5 w-5" />
                  </span>
                </span>
                <span className="flex justify-center">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] text-charcoal/30">
                    <Close className="h-4 w-4" />
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
