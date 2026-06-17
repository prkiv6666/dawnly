import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "How and when Dawnly orders ship, delivery timeframes, and tracking details.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping Policy" updated="June 2026">
      <LegalSection heading="Processing time">
        <p>
          All orders are processed within 1–2 business days (excluding weekends
          and holidays) after your order is placed. You&apos;ll receive a
          confirmation email with tracking once your Dawnly has shipped.
        </p>
      </LegalSection>

      <LegalSection heading="Delivery estimates">
        <p>
          Standard delivery typically takes 5–9 business days depending on your
          location. Remote regions may take slightly longer. Delivery times are
          estimates and begin once the order has been dispatched.
        </p>
      </LegalSection>

      <LegalSection heading="Shipping costs">
        <p>
          We offer free standard shipping on every order. Any applicable import
          duties or taxes for international destinations are the responsibility
          of the recipient.
        </p>
      </LegalSection>

      <LegalSection heading="Tracking your order">
        <p>
          As soon as your order ships, we&apos;ll email you a tracking number.
          Please allow up to 48 hours for tracking information to update after
          dispatch.
        </p>
      </LegalSection>

      <LegalSection heading="Lost or delayed packages">
        <p>
          If your order hasn&apos;t arrived within the estimated window, reach
          out to{" "}
          <a className="text-amber-deep hover:underline" href="mailto:hello@dawnly.shop">
            hello@dawnly.shop
          </a>{" "}
          and we&apos;ll help track it down or arrange a replacement.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
