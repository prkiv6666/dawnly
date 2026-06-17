"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PRODUCT_PATH } from "@/lib/shopify";
import Reveal from "./Reveal";
import { Bolt, MoonStars, SunGlow } from "./icons";

/** Linear-interpolate between two [r,g,b] colors. t in [0,1]. */
function mix(a: number[], b: number[], t: number): string {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

// Warmth axis: 0 = deep candle amber → 1 = soft warm white.
const WARM_DEEP = [201, 118, 59];
const WARM_SOFT = [255, 241, 220];

interface Preset {
  label: string;
  Icon: typeof SunGlow;
  brightness: number;
  warmth: number;
}

const PRESETS: Preset[] = [
  { label: "Candle", Icon: MoonStars, brightness: 28, warmth: 8 },
  { label: "Reading", Icon: SunGlow, brightness: 72, warmth: 45 },
  { label: "Sunrise", Icon: Bolt, brightness: 100, warmth: 80 },
];

export default function LampStudio() {
  const [brightness, setBrightness] = useState(72);
  const [warmth, setWarmth] = useState(45);

  const b = brightness / 100;
  const w = warmth / 100;

  const glowColor = useMemo(() => mix(WARM_DEEP, WARM_SOFT, w), [w]);

  const activePreset = PRESETS.find(
    (p) => Math.abs(p.brightness - brightness) < 4 && Math.abs(p.warmth - warmth) < 4,
  )?.label;

  return (
    <section id="try-it" className="section-pad">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Try it yourself</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Find your perfect glow
          </h2>
          <p className="mt-4 text-charcoal-soft">
            Dawnly dims from a candle-soft flicker to a gentle sunrise. Drag the
            sliders and watch the room change.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Lamp stage — the real product photo, dimmed and warmed live. */}
          <Reveal className="overflow-hidden rounded-5xl shadow-soft-lg ring-1 ring-black/[0.04]">
            <div className="relative h-full min-h-[360px] bg-[rgb(20,16,14)] sm:min-h-[440px]">
              {/* Real product photo, brightened/cooled by the sliders. */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  filter: `brightness(${0.42 + b * 0.85}) contrast(1.03) saturate(${
                    0.85 + (1 - w) * 0.55
                  })`,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
              >
                <Image
                  src="/images/product-nightstand-dark.png"
                  alt="Dawnly lamp glowing warmly on a nightstand in a dark bedroom"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Warm color wash for the temperature control. */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                animate={{ opacity: 0.2 + b * 0.45 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                style={{ backgroundColor: glowColor }}
              />

              {/* Glow bloom radiating from the lamp as brightness rises. */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                animate={{ opacity: 0.15 + b * 0.7 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                style={{
                  background: `radial-gradient(38% 42% at 50% 46%, ${glowColor} 0%, transparent 68%)`,
                }}
              />

              {/* Readout */}
              <div className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wide text-white/85 backdrop-blur">
                {brightness === 0 ? "Off" : `${Math.round(brightness)}% glow`}
              </div>
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal delay={0.08} className="card flex flex-col justify-center gap-7">
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-charcoal">
                <span className="flex items-center gap-2">
                  <SunGlow className="h-4 w-4 text-amber-deep" /> Brightness
                </span>
                <span className="tabular-nums text-charcoal-soft">
                  {Math.round(brightness)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                aria-label="Brightness"
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-beige accent-amber"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-medium text-charcoal">
                <span className="flex items-center gap-2">
                  <MoonStars className="h-4 w-4 text-amber-deep" /> Warmth
                </span>
                <span className="tabular-nums text-charcoal-soft">
                  {warmth < 40 ? "Candle" : warmth < 70 ? "Warm" : "Soft white"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={warmth}
                onChange={(e) => setWarmth(Number(e.target.value))}
                aria-label="Warmth"
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-amber-deep via-amber to-peach accent-amber-deep"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-soft">
                Quick scenes
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {PRESETS.map(({ label, Icon, brightness: pb, warmth: pw }) => {
                  const active = activePreset === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setBrightness(pb);
                        setWarmth(pw);
                      }}
                      aria-pressed={active}
                      className={
                        "flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-xs font-medium transition-all " +
                        (active
                          ? "border-amber bg-amber/10 text-amber-deep shadow-soft"
                          : "border-charcoal/10 bg-surface/60 text-charcoal-soft hover:border-amber/40 hover:text-charcoal")
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Link href={PRODUCT_PATH} className="btn-amber w-full">
              Bring this glow home
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
