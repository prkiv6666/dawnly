import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of the Dawnly store.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="June 2026">
      <LegalSection heading="Agreement to terms">
        <p>
          By accessing or using the Dawnly website and placing an order, you
          agree to be bound by these Terms of Service. If you do not agree,
          please do not use the site.
        </p>
      </LegalSection>

      <LegalSection heading="Products & pricing">
        <p>
          We strive to display product details, colors, and prices as
          accurately as possible. Prices are subject to change without notice,
          and we reserve the right to correct any errors or to limit order
          quantities.
        </p>
      </LegalSection>

      <LegalSection heading="Orders">
        <p>
          When you place an order, you make an offer to purchase. We reserve the
          right to accept or decline any order. A confirmation email does not
          guarantee acceptance of your order.
        </p>
      </LegalSection>

      <LegalSection heading="Payments & checkout">
        <p>
          Payments are processed securely through Shopify&apos;s checkout. By
          submitting payment information, you represent that you are authorized
          to use the chosen payment method.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          All content on this site—including text, images, logos, and the
          Dawnly name—is our property or used with permission, and may not be
          reused without consent.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Dawnly is not liable for any
          indirect or consequential damages arising from your use of the site or
          products.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a className="text-amber-deep hover:underline" href="mailto:hello@dawnly.shop">
            hello@dawnly.shop
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
