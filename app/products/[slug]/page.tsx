import Image from "next/image";
import { notFound } from "next/navigation";
import EntryDoorDetailPage from "@/components/entry-door-detail";
import { ReadyProjectCta, SiteFooter } from "@/components/FooterSections";
import ProductGalleryCarousel from "@/components/ProductGalleryCarousel";
import SiteHeader from "@/components/SiteHeader";
import { getDoorProductBySlug } from "@/data/productLines";
import { getProductBySlug, inquiryText, productsCatalog } from "@/data/productsCatalog";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productsCatalog.map((product) => ({ slug: product.slug }));
}

function inquiryHref(product: NonNullable<ReturnType<typeof getProductBySlug>>, target: "contact" | "quote") {
  const params = new URLSearchParams({
    product: product.title,
    category: product.category,
    link: `/products/${product.slug}`,
    message: inquiryText(product),
  });

  return `/${target}?${params.toString()}${target === "contact" ? "#inquiry" : ""}`;
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const doorProduct = getDoorProductBySlug(slug);

  if (doorProduct) {
    return <EntryDoorDetailPage product={doorProduct} />;
  }

  if (!product) {
    notFound();
  }

  return (
    <main>
      <SiteHeader />

      <section className="product-detail-hero">
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/products">Products</a>
            <span>/</span>
            <span>{product.category}</span>
          </nav>
          <h1>{product.title}</h1>
          <p>{product.subtitle}</p>
        </div>
      </section>

      <section className="product-detail-layout">
        <ProductGalleryCarousel images={product.gallery.length ? product.gallery : [product.image]} title={product.title} />

        <div className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <ul className="detail-check-list">
            {product.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="detail-actions">
            <a className="primary-btn" href={inquiryHref(product, "contact")}>
              Send Inquiry
            </a>
            <a className="secondary-green" href={inquiryHref(product, "quote")}>
              Get Quote
            </a>
          </div>
        </div>
      </section>

      <section className="section product-spec-section">
        <div className="section-heading centered">
          <p className="eyebrow">Product Attributes</p>
          <h2>Built for Flexible Outdoor Projects</h2>
        </div>
        <div className="spec-grid">
          {[
            ["Application", product.applications],
            ["Material", product.materials],
            ["Customization", product.customization],
            ["OEM/ODM Support", product.oemSupport],
          ].map(([title, values]) => (
            <article key={title as string}>
              <h3>{title}</h3>
              <p>{(values as string[]).join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      {(product.productDescription || product.faqs || product.relatedProducts) && (
        <section className="product-detail-extra">
          {product.productDescription && (
            <article className="product-detail-panel">
              <h2>Product Description</h2>
              <div className="product-description-table">
                {product.productDescription.map(([label, value]) => (
                  <div key={label}>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {product.faqs && (
            <article className="product-detail-panel">
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
          )}

          {product.relatedProducts && (
            <article className="product-detail-panel">
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
          )}
        </section>
      )}

      <ReadyProjectCta />
      <SiteFooter />
    </main>
  );
}
