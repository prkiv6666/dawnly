"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire this to your email service / Shopify contact endpoint.
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad bg-warm-fade">
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
              We&apos;d love to help
            </h2>
            <p className="mt-4 max-w-md text-charcoal-soft">
              Questions about your order, shipping, or whether Dawnly is right
              for your space? Our team usually replies within one business day.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <p className="flex items-center gap-3 text-charcoal">
                <span className="font-semibold">Email</span>
                <a
                  href="mailto:hello@dawnly.shop"
                  className="text-amber-deep hover:underline"
                >
                  hello@dawnly.shop
                </a>
              </p>
              <p className="flex items-center gap-3 text-charcoal">
                <span className="font-semibold">Hours</span>
                <span className="text-charcoal-soft">Mon–Fri, 9am–5pm</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card">
              {sent ? (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber/15 text-2xl">
                    ✨
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-charcoal">
                    Message sent
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-soft">
                    Thanks for reaching out — we&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      type="text"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full resize-none rounded-2xl border border-black/10 bg-surface px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button type="submit" className="btn-amber w-full">
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-black/10 bg-surface px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20"
      />
    </div>
  );
}
