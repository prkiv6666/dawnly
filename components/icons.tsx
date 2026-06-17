import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function SunGlow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonStars(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
      <path d="M18 4l.6 1.4L20 6l-1.4.6L18 8l-.6-1.4L16 6l1.4-.6Z" />
    </svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
    </svg>
  );
}

export function Gift(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" />
      <path d="M2 8h20v4H2zM12 8v13" />
      <path d="M12 8S10.5 3.5 8 4.5 9 8 12 8ZM12 8s1.5-4.5 4-3.5S15 8 12 8Z" />
    </svg>
  );
}

export function Bed(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7v11M3 12h18a0 0 0 0 1 0 0v6M21 18V12a3 3 0 0 0-3-3H9v3" />
      <circle cx="6" cy="11" r="1.4" />
    </svg>
  );
}

export function Feather(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 5c-3 0-9 1.5-12 8l-3.5 6 6-3.5C17 12 18.5 8 20 5Z" />
      <path d="M16 8L8 16M14 9l-1 4 4-1" />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function Truck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}

export function Refresh(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" />
    </svg>
  );
}

export function Star({ filled = true, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3.5l2.5 5.4 5.9.6-4.4 4 1.3 5.8L12 16.9 6.7 19.3 8 13.5 3.6 9.5l5.9-.6Z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Bag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Eye(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function Bolt(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function TikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 3c.3 2 1.5 3.4 3.5 3.7v2.6c-1.3.1-2.5-.2-3.6-.8v5.6c0 3.1-2.3 5.4-5.2 5.4-2.7 0-4.9-2-4.9-4.8 0-2.8 2.3-4.9 5.4-4.6v2.7c-.4-.1-.9-.2-1.3-.1-1.1.1-1.9 1-1.8 2.1.1 1.1 1 1.9 2.1 1.8 1.2-.1 1.9-1 1.9-2.3V3h2.9Z" />
    </svg>
  );
}

export function Pinterest(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7c-2 0-3.3 1.3-3.3 3 0 .9.4 1.8 1.1 2.1.1 0 .2 0 .2-.1l.2-.7c0-.1 0-.2-.1-.3-.3-.3-.4-.7-.4-1.1 0-1.4 1-2.4 2.5-2.4 1.4 0 2.2.8 2.2 2 0 1.5-.7 2.8-1.7 2.8-.5 0-.9-.4-.8-1l.4-1.6c.1-.5-.1-.9-.6-.9-.6 0-1 .6-1 1.4 0 .5.2.8.2.8l-.7 3c-.2.8 0 1.8 0 1.9 0 .1.1.1.1 0 .1-.1.7-1 .9-1.7l.3-1.2c.2.3.7.6 1.3.6 1.7 0 2.9-1.6 2.9-3.7C15.7 8.4 14.2 7 12 7Z" />
    </svg>
  );
}
