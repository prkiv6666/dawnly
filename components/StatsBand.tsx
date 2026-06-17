import Reveal from "./Reveal";
import Counter from "./Counter";

const STATS: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}[] = [
  { to: 12000, suffix: "+", label: "Cozy rooms glowing" },
  { to: 4.9, decimals: 1, suffix: " / 5", label: "Average rating" },
  { to: 40, suffix: "h", label: "Battery per charge" },
  { to: 60, suffix: "s", label: "To set up, cord-free" },
];

export default function StatsBand() {
  return (
    <section className="border-y border-charcoal/[0.06] bg-warm-fade">
      <div className="container-px py-12 sm:py-14">
        <div className="grid grid-cols-2 gap-y-8 sm:gap-y-0 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <p className="font-serif text-4xl tracking-tight text-charcoal sm:text-5xl">
                <Counter
                  to={stat.to}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-charcoal-soft">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
