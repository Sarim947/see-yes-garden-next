export type ProductItem = {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  mobileImage?: string;
  gallery: Array<string | { desktop: string; mobile?: string }>;
  highlights: string[];
  applications: string[];
  materials: string[];
  customization: string[];
  oemSupport: string[];
};

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

export const productsCatalog: ProductItem[] = [
  {
    slug: "aluminum-pergola",
    title: "Aluminum Pergola",
    category: "Aluminum Pergola",
    subtitle: "Premium shade structure for outdoor living projects.",
    description:
      "Aluminum pergolas for patios, villas, resorts and commercial outdoor spaces. We support custom size, color, roof options and OEM packaging for distributors and project buyers.",
    image: "/images/slide-pergola.webp",
    gallery: ["/images/slide-pergola.webp", "/images/projects/project-pergola-1.webp", "/images/projects/project-pergola-2.webp"],
    highlights: [
      "Minimalist design with premium aluminum",
      "Weather resistant and rust proof",
      "Custom sizes, colors and accessories",
    ],
    applications: ["Backyard & Garden", "Commercial & Hospitality", "Residential"],
    materials: ["Aluminum"],
    customization: ["Custom Size", "Custom Color", "OEM/ODM"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "metal-shed",
    title: "Metal Shed",
    category: "Metal Shed",
    subtitle: "Durable outdoor storage for tools and garden equipment.",
    description:
      "Metal sheds built for garden storage, backyard tools and distributor channels. The structure supports different sizes, panels, doors and packaging methods.",
    image: "/images/slide-tool-shed.jpg",
    gallery: ["/images/slide-tool-shed.jpg", "/images/product-shed.png", "/images/projects/project-pergola-3.webp"],
    highlights: [
      "Strong steel frame and panels",
      "Multiple sizes and roof styles",
      "Easy assembly and low maintenance",
    ],
    applications: ["Backyard & Garden", "Residential"],
    materials: ["Galvanized Steel"],
    customization: ["Custom Size", "Custom Color", "Packaging"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "raised-garden-bed",
    title: "Raised Garden Bed",
    category: "Raised Garden Bed",
    subtitle: "Modular garden beds for planting and retail channels.",
    description:
      "Raised garden beds made for home gardening, farms and retail supply. Available in multiple shapes, colors, heights and package sets.",
    image: "/images/slide-garden-bed.jpg",
    gallery: ["/images/slide-garden-bed.jpg", "/images/projects/project-garden-1.webp", "/images/projects/project-garden-2.webp"],
    highlights: [
      "Aluminum or galvanized steel",
      "Modular and customizable sizes",
      "Durable, eco-friendly and safe",
    ],
    applications: ["Backyard & Garden", "Residential", "Public & Landscape"],
    materials: ["Galvanized Steel", "Aluminum"],
    customization: ["Custom Size", "Custom Color", "Packaging"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "greenhouse",
    title: "Greenhouse",
    category: "Greenhouse",
    subtitle: "Polycarbonate greenhouse solutions for growers.",
    description:
      "Greenhouse structures for garden growing, planting projects and wholesale channels. We provide custom dimensions, frame options and shipment packaging.",
    image: "/images/slide-greenhouse.webp",
    gallery: ["/images/slide-greenhouse.webp", "/images/product-greenhouse.png", "/images/projects/project-garden-3.webp"],
    highlights: [
      "Aluminum frame and polycarbonate panels",
      "UV protection and good insulation",
      "Multi-span and custom design",
    ],
    applications: ["Backyard & Garden", "Commercial & Hospitality", "Public & Landscape"],
    materials: ["Aluminum", "Polycarbonate"],
    customization: ["Custom Size", "Custom Color", "OEM/ODM"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "carport",
    title: "Carport",
    category: "Carport",
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
  {
    slug: "custom-outdoor-solutions",
    title: "Custom Outdoor Solutions",
    category: "Custom Outdoor Solutions",
    subtitle: "OEM/ODM structure programs for your market.",
    description:
      "Custom outdoor product development for distributors, importers and project buyers. We help turn drawings, samples or ideas into stable production items.",
    image: "/images/banner-home.png",
    gallery: ["/images/banner-home.png", "/images/factory-about.webp", "/images/production-workshop.webp"],
    highlights: [
      "Bespoke design to match your market",
      "Full customization: size, color, function",
      "OEM branding and packaging available",
    ],
    applications: ["Commercial & Hospitality", "Public & Landscape", "Residential"],
    materials: ["Aluminum", "Galvanized Steel", "Polycarbonate"],
    customization: ["Custom Size", "Custom Color", "OEM/ODM", "Packaging"],
    oemSupport: ["Private Label", "Packaging", "Sample Development"],
  },
  {
    slug: "entry-door",
    title: "Pivot Door SED-01",
    category: "Pivot Door",
    subtitle: "Pivot doors for big open spaces demands.",
    description:
      "Factory direct entry door solutions for villas, apartments and project contractors, with options for size, color, handle, lock system, packaging and private label support.",
    image: "/images/products/pivot-door/product-card/pivot-door-card-desktop.jpg",
    mobileImage: "/images/products/pivot-door/product-card/pivot-door-card-mobile.jpg",
    gallery: [
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/01-scene-main.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/01-scene-main-mobile.jpg",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/02-white-main.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/02-white-main-mobile.jpg",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/03-pivot-structure-mobile.webp",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/03-pivot-structure-mobile.webp",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/04-pivot-hardware.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/04-pivot-hardware-mobile.webp",
      },
    ],
    highlights: ["Security structure", "Custom size", "Weather resistant", "OEM & ODM support"],
    applications: ["Residential", "Commercial & Hospitality"],
    materials: ["Galvanized Steel", "Aluminum"],
    customization: ["Custom Size", "Custom Color", "Packaging"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "entry-door",
    title: "Entry Door",
    category: "Entry Door",
    subtitle: "Secure entry doors for residential building projects.",
    description:
      "Factory direct entry door solutions for villas, apartments and project contractors, with options for size, color, handle, lock system, packaging and private label support.",
    image: "/images/products/pivot-door/product-card/pivot-door-card-desktop.jpg",
    mobileImage: "/images/products/pivot-door/product-card/pivot-door-card-mobile.jpg",
    gallery: [
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/01-scene-main.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/01-scene-main-mobile.jpg",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/02-white-main.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/02-white-main-mobile.jpg",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/03-pivot-structure-mobile.webp",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/03-pivot-structure-mobile.webp",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/04-pivot-hardware.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/04-pivot-hardware-mobile.jpg",
      },
    ],
    highlights: ["Security structure", "Custom size", "Weather resistant", "OEM & ODM support"],
    applications: ["Residential", "Commercial & Hospitality"],
    materials: ["Galvanized Steel", "Aluminum"],
    customization: ["Custom Size", "Custom Color", "Packaging"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "entry-door",
    title: "Entry Door",
    category: "Entry Door",
    subtitle: "Secure entry doors for residential building projects.",
    description:
      "Factory direct entry door solutions for villas, apartments and project contractors, with options for size, color, handle, lock system, packaging and private label support.",
    image: "/images/products/pivot-door/product-card/pivot-door-card-desktop.jpg",
    mobileImage: "/images/products/pivot-door/product-card/pivot-door-card-mobile.jpg",
    gallery: [
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/01-scene-main.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/01-scene-main-mobile.jpg",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/02-white-main.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/02-white-main-mobile.jpg",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/03-pivot-structure-mobile.webp",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/03-pivot-structure-mobile.webp",
      },
      {
        desktop: "/images/products/pivot-door/detail-carousel/desktop/04-pivot-hardware.jpg",
        mobile: "/images/products/pivot-door/detail-carousel/mobile/04-pivot-hardware-mobile.jpg",
      },
    ],
    highlights: ["Security structure", "Custom size", "Weather resistant", "OEM & ODM support"],
    applications: ["Residential", "Commercial & Hospitality"],
    materials: ["Galvanized Steel", "Aluminum"],
    customization: ["Custom Size", "Custom Color", "Packaging"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "aluminum-window",
    title: "Aluminum Window",
    category: "Aluminum Window",
    subtitle: "Aluminum windows for modern building supply.",
    description:
      "Aluminum window systems for project supply and building materials channels, with custom dimensions and packaging support.",
    image: "/images/slide-aluminum-window.webp",
    gallery: ["/images/slide-aluminum-window.webp", "/images/aluminum-window.webp"],
    highlights: ["Durable aluminum frame", "Custom size options", "Stable project supply"],
    applications: ["Residential", "Commercial & Hospitality"],
    materials: ["Aluminum", "Glass"],
    customization: ["Custom Size", "Custom Color", "Packaging"],
    oemSupport: ["Private Label", "Packaging"],
  },
  {
    slug: "metal-privacy-screen",
    title: "Metal Privacy Screen",
    category: "Metal Privacy Screen",
    subtitle: "Decorative privacy panels for outdoor spaces.",
    description:
      "Metal privacy screens for patios, garden dividers and landscape projects, with custom patterns, sizes and finishes.",
    image: "/images/slide-privacy-screen.webp",
    gallery: ["/images/slide-privacy-screen.webp", "/images/projects/project-screen-1.webp", "/images/projects/project-screen-2.webp"],
    highlights: ["Decorative panel patterns", "Outdoor powder coating", "Custom size and style"],
    applications: ["Backyard & Garden", "Commercial & Hospitality", "Public & Landscape"],
    materials: ["Aluminum", "Galvanized Steel"],
    customization: ["Custom Size", "Custom Color", "OEM/ODM"],
    oemSupport: ["Private Label", "Packaging"],
  },
];

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

export function getCategoryCounts(items = productsCatalog) {
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
  return productsCatalog.filter((item) => item[key].includes(value)).length;
}

export function getProductBySlug(slug: string) {
  return productsCatalog.find((item) => item.slug === slug);
}

export function inquiryText(product: ProductItem) {
  return [
    `I am interested in your ${product.title}.`,
    `Product link: /products/${product.slug}`,
    `Category: ${product.category}`,
    `Applications: ${product.applications.join(", ")}`,
  ].join("\n");
}
