import { productsCatalog } from "@/data/productLines";
import type { ProductItem } from "@/data/productLines";

export type { ProductItem };
export { productsCatalog };

export const publicProductsCatalog = productsCatalog.filter((item) => item.status !== "deleted");

export const categoryLabels = [
  "Aluminum Pergola",
  "Metal Shed",
  "Raised Garden Bed",
  "Greenhouse",
  "Carport",
  "Custom Outdoor Solutions",
  "Entry Door",
  "Aluminum Window",
  "Metal Privacy Screen",
];

export function categorySlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const productFilterGroups = [
  {
    title: "Application",
    key: "applications",
    values: ["Backyard & Garden", "Commercial & Hospitality", "Residential", "Public & Landscape"],
  },
  {
    title: "Material",
    key: "materials",
    values: ["Aluminum", "Galvanized Steel", "Polycarbonate", "Glass"],
  },
  {
    title: "Customization",
    key: "customization",
    values: ["Custom Size", "Custom Color", "OEM/ODM", "Packaging"],
  },
  {
    title: "OEM/ODM Support",
    key: "oemSupport",
    values: ["Private Label", "Packaging", "Sample Development"],
  },
] as const;

export function getCategoryCounts(items = publicProductsCatalog) {
  return categoryLabels
    .map((category) => ({
      category,
      count: items.filter((item) => item.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

export function categoryFromSlug(slug?: string) {
  if (!slug) {
    return undefined;
  }

  return categoryLabels.find((category) => categorySlug(category) === slug);
}

export function getFilterCount(key: (typeof productFilterGroups)[number]["key"], value: string) {
  return publicProductsCatalog.filter((item) => item[key].includes(value)).length;
}

export function getProductBySlug(slug: string) {
  return publicProductsCatalog.find((item) => item.slug === slug);
}

export function inquiryText(product: ProductItem) {
  return [
    `I am interested in your ${product.title}.`,
    `Product link: /products/${product.slug}`,
    `Category: ${product.category}`,
    `Applications: ${product.applications.join(", ")}`,
  ].join("\n");
}
