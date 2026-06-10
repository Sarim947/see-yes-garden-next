import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { ReadyProjectCta, SiteFooter } from "@/components/FooterSections";
import ProductsCatalog from "@/components/ProductsCatalog";
import { categoryFromSlug } from "@/data/productsCatalog";

type ProductsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedCategory = categoryFromSlug(first(params.category));

  return (
    <main>
      <SiteHeader />

      <section className="products-hero">
        <Image src="/images/projects/project-pergola-1.webp" alt="Outdoor structure products" fill priority sizes="100vw" />
        <div>
          <h1>Our Products</h1>
          <h2>Outdoor Structure Solutions for Global Distributors</h2>
          <p>
            Factory direct supply of premium outdoor structures with
            customizable designs, durable materials, and global delivery.
          </p>
        </div>
      </section>

      <section className="products-benefits">
        {[
          ["Factory Direct", "Competitive pricing, no middlemen", "▥"],
          ["OEM/ODM Support", "Custom design, branding and packaging", "◇"],
          ["Bulk Supply", "Large capacity, stable delivery", "▦"],
          ["Fast Production", "Efficient manufacturing and on-time ship", "◷"],
        ].map(([title, text, icon]) => (
          <article key={title}>
            <span>{icon}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <ProductsCatalog initialCategory={selectedCategory} />

      <ReadyProjectCta />
      <SiteFooter />
    </main>
  );
}
