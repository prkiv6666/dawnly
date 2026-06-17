"use client";

import { useEffect, useState } from "react";

/**
 * Playful "people viewing" indicator. Starts in a believable range and drifts
 * a little every few seconds so it feels live. Mount-gated to avoid hydration
 * mismatches from the random seed.
 */
export default function LiveViewers({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(18 + Math.floor(Math.random() * 22));
    const id = setInterval(() => {
      setCount((prev) => {
        const base = prev ?? 27;
        const next = base + (Math.floor(Math.random() * 7) - 3);
        return Math.min(46, Math.max(12, next));
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      <span className="relative mr-1.5 inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
      </span>
      {count === null ? "—" : count} people are viewing this now
    </span>
  );
}
