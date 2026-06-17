"use client";

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
  const coreColor = useMemo(
    () => mix(WARM_DEEP, [255, 252, 245], Math.min(1, w + 0.25)),
    [w],
  );

  const activePreset = PRESETS.find(
    (p) => Math.abs(p.brightness - brightness) < 4 && Math.abs(p.warmth - warmth) < 4,
  )?.label;

  // Stage darkens as the lamp dims, so the glow reads against it.
  const stageBg = `radial-gradient(120% 90% at 50% 78%, ${mix(
    [38, 31, 27],
    glowColor.match(/\d+/g)!.map(Number),
    b * 0.55,
  )} 0%, rgb(26, 21, 18) 70%)`;

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
          {/* Lamp stage */}
          <Reveal className="overflow-hidden rounded-5xl shadow-soft-lg ring-1 ring-black/[0.04]">
            <div
              className="relative flex h-full min-h-[360px] items-end justify-center p-10 transition-[background] duration-500 sm:min-h-[440px]"
              style={{ background: stageBg }}
            >
              {/* Ambient glow halo — egg-shaped so it hugs the lamp instead
                  of reading as a ball. */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"
                animate={{
                  width: 150 + b * 170,
                  height: 200 + b * 230,
                  opacity: 0.22 + b * 0.5,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                style={{
                  backgroundColor: glowColor,
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                }}
              />

              {/* The egg lamp */}
              <div className="relative mb-6 flex flex-col items-center">
                <motion.div
                  className="relative"
                  animate={{
                    width: 116,
                    height: 168,
                    boxShadow: `0 0 ${24 + b * 70}px ${2 + b * 12}px ${glowColor}`,
                    opacity: 0.6 + b * 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 16 }}
                  style={{
                    // Classic egg: a touch pointed at the top, round at the base.
                    borderRadius: "50% 50% 50% 50% / 64% 64% 36% 36%",
                    background: `radial-gradient(58% 60% at 50% 42%, ${coreColor} 0%, ${glowColor} 52%, ${mix(
                      glowColor.match(/\d+/g)!.map(Number),
                      [120, 70, 40],
                      0.5,
                    )} 100%)`,
                  }}
                >
                  {/* Soft top highlight to read as a glossy shell. */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[14%] h-10 w-7 -translate-x-1/2 rounded-full bg-white/35 blur-md"
                  />
                </motion.div>
                {/* Base */}
                <div className="mt-[-5px] h-3 w-14 rounded-b-2xl rounded-t-md bg-black/40 blur-[1px]" />
              </div>

              {/* Readout */}
              <div className="absolute left-5 top-5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur">
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
