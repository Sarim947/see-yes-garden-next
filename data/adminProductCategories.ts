export type AdminProductCategory = {
  label: string;
  productCategory: string;
  categorySlug: string;
  fileName: string;
  exportName: string;
  typeName: "ProductItem" | "DoorProduct";
  template: "standard" | "door";
  defaultApplications: string[];
  defaultMaterials: string[];
  defaultCustomization: string[];
  defaultOemSupport: string[];
  defaultFaqs: string[][];
};

const standardFaqs = (productName: string): string[][] => [
  [
    "Can I customize the size?",
    `Yes. Send us your required length, width, height or technical drawing, and we can prepare a custom ${productName.toLowerCase()} plan.`,
  ],
  [
    "Can I choose the color and finish?",
    "Yes. Color, surface finish and product details can be selected according to your market needs.",
  ],
  [
    "Do you support OEM packaging?",
    "Yes. We can support neutral packing, branded labels, instruction sheets, cartons and retail packaging for bulk orders.",
  ],
  [
    "What information is needed for quotation?",
    "Please provide size, quantity, destination country, material preference, finish color and any reference image or drawing.",
  ],
  [
    "Can you supply for project orders?",
    "Yes. We support retail, residential and project supply with production coordination, packing and export delivery.",
  ],
];

export const adminProductCategories: AdminProductCategory[] = [
  {
    label: "Aluminum Pergolas",
    productCategory: "Aluminum Pergola",
    categorySlug: "aluminum-pergola",
    fileName: "pergolas.ts",
    exportName: "pergolaProducts",
    typeName: "ProductItem",
    template: "standard",
    defaultApplications: ["Backyard & Garden", "Commercial & Hospitality", "Residential"],
    defaultMaterials: ["Aluminum"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging", "Sample Development"],
    defaultFaqs: standardFaqs("aluminum pergola"),
  },
  {
    label: "Aluminum Windows",
    productCategory: "Aluminum Window",
    categorySlug: "aluminum-window",
    fileName: "windows.ts",
    exportName: "windowProducts",
    typeName: "ProductItem",
    template: "standard",
    defaultApplications: ["Residential", "Commercial & Hospitality"],
    defaultMaterials: ["Aluminum", "Glass"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging", "Sample Development"],
    defaultFaqs: standardFaqs("aluminum window"),
  },
  {
    label: "Carports",
    productCategory: "Carport",
    categorySlug: "carport",
    fileName: "carports.ts",
    exportName: "carportProducts",
    typeName: "ProductItem",
    template: "standard",
    defaultApplications: ["Residential", "Commercial & Hospitality"],
    defaultMaterials: ["Galvanized Steel", "Aluminum"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging", "Sample Development"],
    defaultFaqs: standardFaqs("carport"),
  },
  {
    label: "Entry Doors",
    productCategory: "Entry Door",
    categorySlug: "entry-door",
    fileName: "doors.ts",
    exportName: "doorProducts",
    typeName: "DoorProduct",
    template: "door",
    defaultApplications: ["Residential", "Commercial & Hospitality"],
    defaultMaterials: ["Galvanized Steel", "Aluminum"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging", "Project Supply"],
    defaultFaqs: standardFaqs("entry door"),
  },
  {
    label: "Garden Raised Beds",
    productCategory: "Raised Garden Bed",
    categorySlug: "raised-garden-bed",
    fileName: "raisedGardenBeds.ts",
    exportName: "raisedGardenBedProducts",
    typeName: "ProductItem",
    template: "standard",
    defaultApplications: ["Backyard & Garden", "Residential", "Public & Landscape"],
    defaultMaterials: ["Galvanized Steel"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging"],
    defaultFaqs: [
      [
        "Can I customize the size?",
        "Yes. Send us your required length, width, height or technical drawing, and we can prepare a custom raised garden bed plan.",
      ],
      [
        "Can I choose the color and panel style?",
        "Yes. Color, panel style, panel height and surface finish can be selected according to your market needs.",
      ],
      [
        "Do you support OEM packaging?",
        "Yes. We can support neutral packing, branded labels, instruction sheets, cartons and retail packaging for bulk orders.",
      ],
      [
        "What information is needed for quotation?",
        "Please provide size, quantity, destination country, material preference, finish color and any reference image or drawing.",
      ],
      [
        "Can you supply for project orders?",
        "Yes. We support retail, residential and landscape project supply with production coordination, packing and export delivery.",
      ],
    ],
  },
  {
    label: "Garden Sheds",
    productCategory: "Metal Shed",
    categorySlug: "metal-shed",
    fileName: "sheds.ts",
    exportName: "shedProducts",
    typeName: "ProductItem",
    template: "standard",
    defaultApplications: ["Backyard & Garden", "Residential"],
    defaultMaterials: ["Galvanized Steel"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging", "Sample Development"],
    defaultFaqs: standardFaqs("garden shed"),
  },
  {
    label: "Greenhouses",
    productCategory: "Greenhouse",
    categorySlug: "greenhouse",
    fileName: "greenhouses.ts",
    exportName: "greenhouseProducts",
    typeName: "ProductItem",
    template: "standard",
    defaultApplications: ["Backyard & Garden", "Residential", "Commercial & Hospitality"],
    defaultMaterials: ["Aluminum", "Polycarbonate"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging", "Sample Development"],
    defaultFaqs: standardFaqs("greenhouse"),
  },
  {
    label: "Privacy Screen",
    productCategory: "Metal Privacy Screen",
    categorySlug: "metal-privacy-screen",
    fileName: "privacyScreens.ts",
    exportName: "privacyScreenProducts",
    typeName: "ProductItem",
    template: "standard",
    defaultApplications: ["Backyard & Garden", "Residential", "Public & Landscape"],
    defaultMaterials: ["Aluminum", "Galvanized Steel"],
    defaultCustomization: ["Custom Size", "Custom Color", "Packaging"],
    defaultOemSupport: ["Private Label", "Packaging", "Sample Development"],
    defaultFaqs: standardFaqs("privacy screen"),
  },
];

export function getAdminCategory(label: string) {
  return adminProductCategories.find((item) => item.label === label || item.productCategory === label);
}

export function slugifyProduct(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
