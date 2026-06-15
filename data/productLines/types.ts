export type ProductItem = {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  applications: string[];
  materials: string[];
  customization: string[];
  oemSupport: string[];
  template?: "standard" | "door";
  productDescription?: string[][];
  faqs?: string[][];
  relatedProducts?: Array<{
    title: string;
    image: string;
    slug?: string;
  }>;
};

export type DoorProduct = ProductItem & {
  category: "Entry Door";
  template: "door";
  cardImage: string;
  quickSpecs: string[][];
  overview: string;
  parameters: string[][];
  applicationScenes: Array<{
    title: string;
    image: string;
  }>;
  factorySteps: Array<{
    title: string;
    image: string;
  }>;
  faqs: string[][];
  relatedProducts: Array<{
    title: string;
    image: string;
    slug?: string;
  }>;
};
