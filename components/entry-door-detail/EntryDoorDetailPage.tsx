import Image from "next/image";
import { SiteFooter } from "@/components/FooterSections";
import SiteHeader from "@/components/SiteHeader";
import type { DoorProduct } from "@/data/productLines";
import EntryDoorCarousel from "./EntryDoorCarousel";

function entryDoorInquiryHref(product: DoorProduct, label: string, target: "contact" | "quote") {
  const params = new URLSearchParams({
    product: label,
    category: product.category,
    link: `/products/${product.slug}`,
    message: [`I am interested in your ${label}.`, `Product link: /products/${product.slug}`, `Category: ${product.category}`].join(
      "\n",
    ),
  });

  return `/${target}?${params.toString()}${target === "contact" ? "#inquiry" : ""}`;
}

const entryDoorApplicationScenes = [
  {
    title: "Office Workplace",
    image: "/images/products/entry-door/pivot-door-SED-01/application-scenes/01-office-workplace-scene.jpg",
  },
  {
    title: "Luxury Villa",
    image: "/images/products/entry-door/pivot-door-SED-01/application-scenes/02-luxury-villa-scene.jpg",
  },
  {
    title: "Luxury Apartment",
    image: "/images/products/entry-door/pivot-door-SED-01/application-scenes/03-luxury-apartment-scene.jpg",
  },
];

export default function EntryDoorDetailPage({ product }: { product: DoorProduct }) {
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
            <span>{product.category}</span>
          </nav>

          <div className="entry-door-top">
            <EntryDoorCarousel images={product.gallery} title={product.title} />

            <div className="entry-door-copy">
              <p className="eyebrow">{product.category}</p>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <ul className="detail-check-list">
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="primary-btn" href={entryDoorInquiryHref(product, product.category, "quote")}>
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="entry-door-quick-specs">
        {product.quickSpecs.map(([title, text]) => (
          <article key={title}>
            <span>{title}</span>
            <strong>{text}</strong>
          </article>
        ))}
      </section>

      <section className="entry-door-content">
        <article className="entry-door-panel">
          <h2>Product Overview</h2>
          <p>{product.overview}</p>
        </article>

        <article className="entry-door-panel">
          <h2>Technical Parameters</h2>
          <div className="entry-door-table">
            {product.parameters.map(([label, value]) => (
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
            {entryDoorApplicationScenes.map((item) => (
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
            {product.factorySteps.map((item) => (
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
            {product.faqs.map(([question, answer]) => (
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
              We will include “I am interested in your {product.title}. Product link: /products/{product.slug}” in the form, so
              your customer can request a quotation faster.
            </p>
          </div>
          <div className="detail-actions">
            <a className="primary-btn" href={entryDoorInquiryHref(product, product.title, "contact")}>
              Send Inquiry
            </a>
            <a className="secondary-green" href={entryDoorInquiryHref(product, product.title, "quote")}>
              Get Quote
            </a>
          </div>
        </article>

        <article className="entry-door-panel">
          <h2>Related Products</h2>
          <div className="entry-door-related">
            {product.relatedProducts.map((item) => (
              <a key={item.title} href={`/products/${item.slug ?? product.slug}`}>
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
