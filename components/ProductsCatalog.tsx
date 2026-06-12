"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  getCategoryCounts,
  getFilterCount,
  productFilterGroups,
  productsCatalog,
} from "@/data/productsCatalog";

type ProductsCatalogProps = {
  initialCategory?: string;
};

export default function ProductsCatalog({ initialCategory }: ProductsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>();
  const counts = getCategoryCounts();
  const materialGroup = productFilterGroups.find((group) => group.title === "Material");
  const products = useMemo(
    () =>
      productsCatalog.filter((item) => {
        const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
        const materialMatch = selectedMaterial ? item.materials.includes(selectedMaterial) : true;
        return categoryMatch && materialMatch;
      }),
    [selectedCategory, selectedMaterial],
  );

  return (
    <section className="products-layout">
      <div className="products-left">
        <nav className="sidebar-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Products</span>
        </nav>

        <aside className="products-sidebar">
          <div className="filter-block">
            <h3>Product Category</h3>
            <button
              className={!selectedCategory ? "active" : ""}
              type="button"
              onClick={() => setSelectedCategory(undefined)}
            >
              <span /> All Products ({productsCatalog.length})
            </button>
            {counts.map((item) => (
              <button
                className={selectedCategory === item.category ? "active" : ""}
                type="button"
                onClick={() => setSelectedCategory(item.category)}
                key={item.category}
              >
                <span /> {item.category} ({item.count})
              </button>
            ))}
          </div>

          {materialGroup ? (
            <div className="filter-block">
              <h3>Material</h3>
            {materialGroup.values.map((value) => (
                <button
                  className={selectedMaterial === value ? "active" : ""}
                  type="button"
                  onClick={() => setSelectedMaterial(selectedMaterial === value ? undefined : value)}
                  key={value}
                >
                  <span /> {value} ({getFilterCount(materialGroup.key, value)})
                </button>
              ))}
            </div>
          ) : null}
        </aside>
      </div>

      <div className="products-main">
        <div className="products-toolbar">
          <span>
            Showing 1-{products.length} of {products.length} products
          </span>
        </div>

        <div className="catalog-grid">
          {products.map((product) => (
            <article className="catalog-card" key={product.slug}>
              <div className="catalog-image">
                {product.mobileImage ? (
                  <picture>
                    <source media="(max-width: 760px)" srcSet={product.mobileImage} />
                    <img src={product.image} alt={product.title} />
                  </picture>
                ) : (
                  <Image src={product.image} alt={product.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
                )}
              </div>
              <div className="catalog-body">
                <h3>{product.title}</h3>
                <ul>
                  {product.highlights.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={`/products/${product.slug}`}>View Details →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
