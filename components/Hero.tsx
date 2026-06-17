"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PRODUCT_PATH } from "@/lib/shopify";
import { Bed, MoonStars, SunGlow } from "./icons";

const TRUST_BADGES = [
  { Icon: SunGlow, label: "Warm ambient glow" },
  { Icon: Bed, label: "Minimal bedside design" },
  { Icon: MoonStars, label: "Cozy sleep-friendly mood" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Glow blobs drift at different speeds for a soft parallax depth effect.
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const peachY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Warm sunrise backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-peach/40 via-cream to-cream" />
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[460px] w-[460px] rounded-full bg-amber/25 blur-3xl animate-soft-pulse"
      />
      <motion.div
        style={{ y: peachY }}
        className="pointer-events-none absolute -left-32 top-40 -z-10 h-[380px] w-[380px] rounded-full bg-peach/40 blur-3xl"
      />

      <div className="container-px grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-20">
        {/* Copy */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-4 py-1.5 text-xs font-medium text-amber-deep shadow-soft ring-1 ring-black/[0.03] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            The warm bedside glow loved by 12,000+ rooms
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-serif text-[2.75rem] leading-[1.05] tracking-tight text-charcoal sm:text-6xl lg:text-7xl"
          >
            Wake softer.
            <br />
            Sleep calmer.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-charcoal-soft sm:text-lg lg:mx-0"
          >
            A warm bedside glow designed to make your room feel peaceful, cozy,
            and effortless.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link href={PRODUCT_PATH} className="btn-amber w-full sm:w-auto">
              Shop Dawnly
            </Link>
            <Link href="/#benefits" className="btn-outline w-full sm:w-auto">
              See benefits
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
          >
            {TRUST_BADGES.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-charcoal-soft"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface/70 text-amber-deep shadow-soft ring-1 ring-black/[0.03]">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-6xl shadow-soft-lg lg:max-w-none">
            <div className="absolute inset-0 -z-10 bg-amber/30 blur-2xl" />
            <Image
              src="/images/hero-morning-stretch.png"
              alt="Woman waking softly beside a warm, glowing Dawnly bedside lamp"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Floating rating chip */}
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-3xl bg-surface/90 px-5 py-3 shadow-soft-lg backdrop-blur sm:left-8">
            <div className="flex -space-x-1 text-amber">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-sm">
                  {s}
                </span>
              ))}
            </div>
            <div className="text-xs leading-tight text-charcoal">
              <p className="font-semibold">4.9 / 5</p>
              <p className="text-charcoal-soft">2,400+ reviews</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
