import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Return Policy",
  description:
    "Dawnly's 30-day return and exchange policy, including eligibility and how to start a return.",
};

export default function ReturnPolicyPage() {
  return (
    <LegalLayout title="Return Policy" updated="June 2026">
      <LegalSection heading="Our 30-day cozy guarantee">
        <p>
          We want Dawnly to feel right in your space. If you&apos;re not
          completely happy, you may return your order within 30 days of delivery
          for a refund or exchange.
        </p>
      </LegalSection>

      <LegalSection heading="Eligibility">
        <p>
          To be eligible, items should be in their original condition and
          packaging where possible. Items that are damaged through misuse may
          not qualify for a full refund.
        </p>
      </LegalSection>

      <LegalSection heading="How to start a return">
        <p>
          Email{" "}
          <a className="text-amber-deep hover:underline" href="mailto:hello@dawnly.shop">
            hello@dawnly.shop
          </a>{" "}
          with your order number and reason for return. We&apos;ll reply with
          simple return instructions within one business day.
        </p>
      </LegalSection>

      <LegalSection heading="Refunds">
        <p>
          Once your return is received and inspected, we&apos;ll process your
          refund to the original payment method within 5–10 business days. You
          will be notified by email when the refund is issued.
        </p>
      </LegalSection>

      <LegalSection heading="Damaged or faulty items">
        <p>
          If your Dawnly arrives damaged or faulty, please contact us with a
          photo within 48 hours of delivery and we&apos;ll arrange a free
          replacement right away.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
