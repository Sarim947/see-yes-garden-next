import type { ProductItem } from "./types";

export const carportProducts: ProductItem[] = [
  {
    slug: "carport",
    title: "Carport",
    category: "Carport",
    template: "standard",
    subtitle: "Vehicle shelter for residential and commercial use.",
    description:
      "Metal carports for vehicle protection, outdoor parking and distributor projects. Supports custom size, roof panels, colors and installation packages.",
    image: "/images/slide-carport.webp",
    gallery: ["/images/slide-carport.webp", "/images/projects/project-carport-1.webp", "/images/carport.webp"],
    highlights: [
      "Aluminum frame and strong structure",
      "Snow and wind load resistant",
      "Single or double car options",
    ],
    applications: ["Residential", "Commercial & Hospitality"],
    materials: ["Aluminum", "Galvanized Steel"],
    customization: ["Custom Size", "Custom Color", "OEM/ODM"],
    oemSupport: ["Private Label", "Packaging"],
  },
];
