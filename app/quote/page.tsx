import Image from "next/image";
import { ReadyProjectCta, SiteFooter } from "@/components/FooterSections";
import QuoteForm from "@/components/QuoteForm";
import SiteHeader from "@/components/SiteHeader";

const solutionCards = [
  ["Custom Size", "Tailored to your exact dimensions", "▧"],
  ["Custom Color", "Multiple colors and finishes", "▥"],
  ["OEM / ODM Service", "Design and develop as your brand", "⚙"],
  ["Logo & Packaging", "Custom logo and packaging", "▤"],
  ["Bulk Order Support", "Large quantity with best terms", "▣"],
];

const footerBenefits = [
  ["Factory Direct Price", "Competitive pricing from our own factory.", "▥"],
  ["OEM & ODM Support", "Professional team to support your brand.", "◇"],
  ["Fast Production", "Efficient lead time and stable quality.", "◷"],
  ["On-time Delivery", "Reliable logistics to your destination.", "▭"],
];

type QuotePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedProduct = first(params.product);
  const selectedCategory = first(params.category);
  const defaultMessage =
    first(params.message) ||
    (selectedProduct
      ? [
          `I am interested in your ${selectedProduct}.`,
          first(params.link) ? `Product link: ${first(params.link)}` : "",
          selectedCategory ? `Category: ${selectedCategory}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "");

  return (
    <main className="quote-page">
      <SiteHeader />

      <section className="quote-hero">
        <Image
          src="/images/slide-pergola.webp"
          alt="Custom outdoor pergola project"
          fill
          priority
          sizes="100vw"
        />
        <div className="quote-hero-copy">
          <h1>Start Your Custom Project</h1>
          <p>
            OEM/ODM outdoor structure solutions with custom size, color,
            packaging and bulk supply.
          </p>
        </div>
      </section>

      <section className="quote-cards">
        {solutionCards.map(([title, text, icon]) => (
          <article key={title}>
            <span>{icon}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="quote-form-panel">
        <div className="quote-form-heading">
          <span>▤</span>
          <div>
            <h2>Custom Outdoor Structure Inquiry</h2>
            <p>Please fill in the form below. Our sales team will contact you within 24 hours.</p>
          </div>
        </div>

        <QuoteForm
          defaultMessage={defaultMessage}
          selectedCategory={selectedCategory}
          selectedProduct={selectedProduct}
        />
      </section>

      <section className="quote-benefits">
        {footerBenefits.map(([title, text, icon]) => (
          <article key={title}>
            <span>{icon}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <ReadyProjectCta />
      <SiteFooter />
    </main>
  );
}
