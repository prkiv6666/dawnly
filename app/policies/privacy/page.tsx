import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Dawnly collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <LegalSection heading="Overview">
        <p>
          This Privacy Policy describes how Dawnly (&quot;we&quot;,
          &quot;us&quot;) collects, uses, and shares your personal information
          when you visit or make a purchase from our store.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <p>
          When you place an order we collect details such as your name, billing
          and shipping address, email address, and payment information. Payment
          details are processed securely by our payment provider and are never
          stored on our servers.
        </p>
        <p>
          We also automatically collect certain device and usage information
          (such as browser type and pages viewed) to help improve our store.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>
          We use your information to fulfill orders, process payments, provide
          customer support, send order updates, and—where you&apos;ve opted
          in—share occasional product news.
        </p>
      </LegalSection>

      <LegalSection heading="Sharing your information">
        <p>
          We share information with trusted service providers who help us run
          our store, including our e-commerce platform (Shopify), payment
          processors, and shipping partners. We never sell your personal
          information.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You may request access to, correction of, or deletion of your
          personal information at any time by contacting{" "}
          <a className="text-amber-deep hover:underline" href="mailto:hello@dawnly.shop">
            hello@dawnly.shop
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          For any privacy-related questions, reach us at{" "}
          <a className="text-amber-deep hover:underline" href="mailto:hello@dawnly.shop">
            hello@dawnly.shop
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
