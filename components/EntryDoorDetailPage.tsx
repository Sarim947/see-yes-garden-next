import Image from "next/image";
import EntryDoorCarousel from "@/components/EntryDoorCarousel";
import { SiteFooter } from "@/components/FooterSections";
import SiteHeader from "@/components/SiteHeader";
import { entryDoorPage } from "@/data/entryDoorPage";

function entryDoorInquiryHref(label: string, target: "contact" | "quote") {
  const params = new URLSearchParams({
    product: label,
    category: entryDoorPage.category,
    link: entryDoorPage.productPath,
    message: [`I am interested in your ${label}.`, `Product link: ${entryDoorPage.productPath}`, `Category: ${entryDoorPage.category}`].join(
      "\n",
    ),
  });

  return `/${target}?${params.toString()}${target === "contact" ? "#inquiry" : ""}`;
}

export default function EntryDoorDetailPage() {
  return (
    <main>
      <SiteHeader />

      <section className="entry-door-hero">
        <div className="entry-door-hero-inner">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/products">Products</a>
            <span>/</span>
            <span>{entryDoorPage.category}</span>
          </nav>

          <div className="entry-door-top">
            <EntryDoorCarousel images={entryDoorPage.gallery} title={entryDoorPage.productName} />

            <div className="entry-door-copy">
              <p className="eyebrow">{entryDoorPage.category}</p>
              <h1>{entryDoorPage.productName}</h1>
              <p>{entryDoorPage.subtitle}</p>
              <ul className="detail-check-list">
                {entryDoorPage.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="primary-btn" href={entryDoorInquiryHref(entryDoorPage.category, "quote")}>
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="entry-door-quick-specs">
        {entryDoorPage.quickSpecs.map(([title, text]) => (
          <article key={title}>
            <span>{title}</span>
            <strong>{text}</strong>
          </article>
        ))}
      </section>

      <section className="entry-door-content">
        <article className="entry-door-panel">
          <h2>Product Overview</h2>
          <p>{entryDoorPage.overview}</p>
        </article>

        <article className="entry-door-panel">
          <h2>Technical Parameters</h2>
          <div className="entry-door-table">
            {entryDoorPage.parameters.map(([label, value]) => (
              <div key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="entry-door-panel entry-door-media-panel">
          <h2>Application Scenes</h2>
          <div className="entry-door-image-grid three application-scenes">
            {entryDoorPage.applications.map((item) => (
              <article key={item.title}>
                <div>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 360px" />
                </div>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </article>

        <article className="entry-door-panel entry-door-media-panel">
          <h2>Factory & Quality Control</h2>
          <div className="entry-door-image-grid four factory-scenes">
            {entryDoorPage.factorySteps.map((item) => (
              <article key={item.title}>
                <div>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 260px" />
                </div>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </article>

        <article className="entry-door-panel">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {entryDoorPage.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </article>

        <article className="entry-door-panel entry-door-inquiry">
          <div>
            <h2>Send Entry Door Inquiry</h2>
            <p>
              We will include “I am interested in your Entry Door. Product link: /products/entry-door” in the form, so
              your customer can request a quotation faster.
            </p>
          </div>
          <div className="detail-actions">
            <a className="primary-btn" href={entryDoorInquiryHref(entryDoorPage.category, "contact")}>
              Send Inquiry
            </a>
            <a className="secondary-green" href={entryDoorInquiryHref(entryDoorPage.category, "quote")}>
              Get Quote
            </a>
          </div>
        </article>

        <article className="entry-door-panel">
          <h2>Related Products</h2>
          <div className="entry-door-related">
            {entryDoorPage.relatedProducts.map((item) => (
              <a key={item.title} href={entryDoorInquiryHref(item.title, "quote")}>
                <div>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 320px" />
                </div>
                <span>{item.title}</span>
                <strong>View Detail</strong>
              </a>
            ))}
          </div>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
