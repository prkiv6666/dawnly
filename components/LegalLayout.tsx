import type { ReactNode } from "react";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="section-pad">
      <div className="container-px">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Dawnly</p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-charcoal-soft">
            Last updated: {updated}
          </p>

          <div className="legal mt-10 space-y-8 text-charcoal-soft">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl text-charcoal sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed sm:text-base">
        {children}
      </div>
    </section>
  );
}
