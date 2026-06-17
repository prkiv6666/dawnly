import Reveal from "./Reveal";
import LiveViewers from "./LiveViewers";
import CountdownTimer from "./CountdownTimer";
import { Bolt, Clock, Eye } from "./icons";

/**
 * Thin social-proof / scarcity band shown just above the product section.
 */
export default function UrgencyStrip() {
  return (
    <section className="container-px">
      <Reveal>
        <div className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-amber/20 bg-amber/[0.06] px-5 py-4 text-sm text-charcoal-soft sm:flex-row sm:gap-6">
          <span className="flex items-center gap-2 font-medium text-charcoal">
            <Eye className="h-4 w-4 text-amber-deep" />
            <LiveViewers />
          </span>

          <span className="hidden h-4 w-px bg-charcoal/10 sm:block" />

          <span className="flex items-center gap-2">
            <Bolt className="h-4 w-4 text-amber-deep" />
            Only{" "}
            <strong className="font-semibold text-charcoal">8 left</strong> in
            this batch
          </span>

          <span className="hidden h-4 w-px bg-charcoal/10 sm:block" />

          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-deep" />
            Today&apos;s deal ends in{" "}
            <strong className="font-semibold tabular-nums text-charcoal">
              <CountdownTimer />
            </strong>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
