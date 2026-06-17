import Reveal from "./Reveal";
import Accordion, { type AccordionItem } from "./Accordion";

const FAQ_ITEMS: AccordionItem[] = [
  {
    title: "Is Dawnly good for a bedroom?",
    content:
      "Absolutely — it's designed specifically for bedrooms. The warm, low-blue-light glow helps your room feel calm in the evening and makes a gentle companion for reading, relaxing, or drifting off.",
  },
  {
    title: "Is the light harsh?",
    content:
      "Not at all. Dawnly gives a soft, flicker-free amber light with no cold glare. You can touch-dim it from a candle-soft glow up to a comfortable reading brightness.",
  },
  {
    title: "Is it suitable as a gift?",
    content:
      "It's one of our most-gifted items. The minimal design, premium feel, and ready-to-use setup make it a thoughtful gift for housewarmings, birthdays, and the holidays.",
  },
  {
    title: "How long does shipping take?",
    content:
      "Orders are processed within 1–2 business days. Delivery typically takes 5–9 business days depending on your location. You'll receive tracking as soon as your Dawnly ships.",
  },
  {
    title: "What if I do not like it?",
    content:
      "You're covered by our 30-day cozy-guarantee. If Dawnly isn't right for your space, reach out and we'll arrange a hassle-free return or exchange.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-pad">
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
              Good questions, warm answers
            </h2>
            <p className="mt-4 text-charcoal-soft">
              Everything you might want to know before bringing Dawnly home.
              Still curious? Reach us anytime via the contact section below.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card">
              <Accordion items={FAQ_ITEMS} defaultOpen={0} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
