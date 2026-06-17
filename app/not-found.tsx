import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
        This page drifted off to sleep
      </h1>
      <p className="mt-3 max-w-sm text-charcoal-soft">
        The page you&apos;re looking for can&apos;t be found. Let&apos;s get you
        back to something cozy.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/product/dawnly" className="btn-outline">
          Shop Dawnly
        </Link>
      </div>
    </div>
  );
}
