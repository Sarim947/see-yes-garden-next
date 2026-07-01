import type { DoorProduct } from "./types";

/*
  Entry Door 上新说明：

  1. 详细步骤看：docs/add-entry-door-product.md
  2. 新产品只需要做两件事：
     - 把图片放进 public/images/products/entry-door/产品型号slug/ 文件夹。
     - 在下面 doorProducts 数组里复制一个完整产品块，然后修改文字和图片链接。
  3. category 固定写 "Entry Door"，template 固定写 "door"，不要改。
  4. 图片文件夹只放图片，不放说明文档、不放代码。
  5. 图片链接必须以 /images/products/entry-door/产品型号slug/ 开头，不能写电脑本地完整路径。
*/

export const doorProducts: DoorProduct[] = [
  {
    // ===== 复制产品块开始：新增产品时，从这一行的 { 开始复制，到下面“复制产品块结束”的 }, 结束 =====
    // 必改：产品页面地址，不能和其他产品重复。例：pivot-door-sed-02
    slug: "pivot-door-sed-01",
    // 必改：产品标题，会显示在产品卡片和详情页顶部。
    title: "Pivot Door SED-01",
    category: "Entry Door",
    template: "door",
    // 可改：产品短标题/说明，用在详情页顶部。
    subtitle: "Pivot doors for big open spaces demands.",
    // 可改：产品简介，用在详情页顶部和询盘说明。
    description:
      "Factory direct entry door solutions for villas, apartments and project contractors, with options for size, color, handle, lock system, packaging and private label support.",
    // 必改：二级 products 页面卡片图，只需要这一张，手机和电脑共用。
    image: "/images/products/entry-door/pivot-door-SED-01/product-card/pivot-door-card-desktop.jpg",
    cardImage: "/images/products/entry-door/pivot-door-SED-01/product-card/pivot-door-card-desktop.jpg",
    // 必改：详情页顶部轮播图，只保留一套图片，手机和电脑共用。
    gallery: [
      "/images/products/entry-door/pivot-door-SED-01/detail-carousel/desktop/01-scene-main.jpg",
      "/images/products/entry-door/pivot-door-SED-01/detail-carousel/desktop/02-white-main.jpg",
      "/images/products/entry-door/pivot-door-SED-01/detail-carousel/desktop/03-pivot-structure.webp",
      "/images/products/entry-door/pivot-door-SED-01/detail-carousel/desktop/04-pivot-hardware.jpg",
    ],
    // 可改：产品卡片下面的 3 个卖点会优先显示这里的前三项。
    highlights: ["Security structure", "Custom size", "Weather resistant", "OEM & ODM support"],
    // 可改：这些会影响左侧筛选统计。
    applications: ["Residential", "Commercial & Hospitality"],
    // 可改：这些会影响左侧 Material 筛选统计。
    materials: ["Galvanized Steel", "Aluminum"],
    // 可改：产品支持的定制项。
    customization: ["Custom Size", "Custom Color", "Packaging"],
    // 可改：OEM/ODM 支持项。
    oemSupport: ["Private Label", "Packaging"],
    // 可改：详情页顶部下方的快速参数栏。
    quickSpecs: [
      ["Material", "Galvanized steel / aluminum options"],
      ["Door Type", "Single leaf, double leaf, project custom type"],
      ["Surface Finish", "Powder coating, wood grain, custom color"],
      ["Opening Direction", "Inward / outward, left or right hand"],
      ["Custom Size", "Made to project drawings or opening size"],
      ["Project Supply", "OEM packaging and bulk order support"],
    ],
    // 可改：Product Overview 正文。
    overview:
      "SeeYes Garden entry doors are made for residential houses, villas, apartment projects and commercial building supply. We support custom dimensions, panel styles, colors, handles, lock systems, export packaging and private label cooperation for distributors and contractors.",
    // 可改：Technical Parameters 参数表。
    parameters: [
      ["Material", "Galvanized steel, aluminum profile or project-specified material"],
      ["Thickness", "Custom door leaf and frame thickness by project requirement"],
      ["Frame Depth", "Standard or custom frame depth available"],
      ["Surface Finish", "Powder coating, wood grain finish or custom color"],
      ["Opening Direction", "Left hand, right hand, inward or outward opening"],
      ["Standard Size", "Common residential and villa door sizes available"],
      ["Custom Size", "Produced according to drawings or opening measurement"],
      ["Hardware", "Handle, hinges, cylinder and optional lock system"],
      ["Packing", "Protective film, carton, pallet or wooden packing"],
      ["Application", "Villa entrance, apartment door, residential project and commercial building"],
    ],
    // 必改/可改：使用场景图片。
    applicationScenes: [
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
    ],
    // 可改：工厂和质检图片。
    factorySteps: [
      {
        title: "Workshop",
        image: "/images/production-workshop.webp",
      },
      {
        title: "Surface Treatment",
        image: "/images/powder-coating.webp",
      },
      {
        title: "Inspection",
        image: "/images/quality-inspection.webp",
      },
      {
        title: "Export Packing",
        image: "/images/packing.webp",
      },
    ],
    // 可改：FAQ，每一条答案尽量写得不同。
    faqs: [
      [
        "Can I customize the size?",
        "Yes. Send us your opening size or technical drawing, and we can prepare a custom size plan for your project.",
      ],
      [
        "Can I choose the lock and handle?",
        "Yes. Handle style, lock system, hinge type and hardware finish can be selected according to your market needs.",
      ],
      [
        "Do you support OEM packaging?",
        "Yes. We can support neutral packing, branded labels, cartons and project packaging for bulk orders.",
      ],
      [
        "What information is needed for quotation?",
        "Please provide door size, quantity, destination country, material preference, finish color and any reference image or drawing.",
      ],
      [
        "Can you supply for project orders?",
        "Yes. We support residential and commercial project supply with production coordination, packing and export delivery.",
      ],
    ],
    // 可改：底部相关产品卡片。
    relatedProducts: [
      {
        title: "Pivot Door",
        image: "/images/products/entry-door/pivot-door-SED-01/related-products/pivot-door-related.jpg",
      },
      {
        title: "Steel Door",
        image: "/images/products/entry-door/pivot-door-SED-01/related-products/aluminum-profile-door.webp",
      },
      {
        title: "Aluminum Glass Door",
        image: "/images/products/entry-door/pivot-door-SED-01/related-products/glass-door-related.webp",
      },
    ],
    // ===== 复制产品块结束：新增产品时，复制到这一行下面的 }, 为止 =====
  },
  {
    // 必改：产品页面地址，不能和其他产品重复。例：pivot-door-sed-02
    slug: "aluminum-glass-door-SED-3808",
    // 必改：产品标题，会显示在产品卡片和详情页顶部。
    title: "Aluminum Glass Door SED-3808",
    category: "Entry Door",
    template: "door",
    // 可改：产品短标题/说明，用在详情页顶部。
    subtitle: "Aluminum glass doors for lite demands.",
    // 可改：产品简介，用在详情页顶部和询盘说明。
    description:
      "Factory direct entry door solutions for villas, apartments and project contractors, with options for size, color, handle, lock system, packaging and private label support.",
    // 必改：二级 products 页面卡片图，只需要这一张，手机和电脑共用。
    image: "/images/products/entry-door/aluminum-glass-door-SED-3808/product-card/01-scene-main.webp",
    cardImage: "/images/products/entry-door/aluminum-glass-door-SED-3808/product-card/01-scene-main.webp",
    // 必改：详情页顶部轮播图，只保留一套图片，手机和电脑共用。
    gallery: [
      "/images/products/entry-door/aluminum-glass-door-SED-3808/detail-carousel/desktop/01-scene-main.webp",
      "/images/products/entry-door/aluminum-glass-door-SED-3808/detail-carousel/desktop/02-white-main.webp",
      "/images/products/entry-door/aluminum-glass-door-SED-3808/detail-carousel/desktop/03-alumium-structure.webp",
      "/images/products/entry-door/aluminum-glass-door-SED-3808/detail-carousel/desktop/04-aluminum-hardware.webp",
    ],
    // 可改：产品卡片下面的 3 个卖点会优先显示这里的前三项。
    highlights: ["Security structure", "Custom size", "Weather resistant", "OEM & ODM support"],
    // 可改：这些会影响左侧筛选统计。
    applications: ["Residential", "Commercial & Hospitality"],
    // 可改：这些会影响左侧 Material 筛选统计。
    materials: ["Galvanized Steel", "Aluminum"],
    // 可改：产品支持的定制项。
    customization: ["Custom Size", "Custom Color", "Packaging"],
    // 可改：OEM/ODM 支持项。
    oemSupport: ["Private Label", "Packaging"],
    // 可改：详情页顶部下方的快速参数栏。
    quickSpecs: [
      ["Material", "Galvanized steel / aluminum options"],
      ["Door Type", "Single leaf, double leaf, project custom type"],
      ["Surface Finish", "Powder coating, wood grain, custom color"],
      ["Opening Direction", "Inward / outward, left or right hand"],
      ["Custom Size", "Made to project drawings or opening size"],
      ["Project Supply", "OEM packaging and bulk order support"],
    ],
    // 可改：Product Overview 正文。
    overview:
      "SeeYes Garden entry doors are made for residential houses, villas, apartment projects and commercial building supply. We support custom dimensions, panel styles, colors, handles, lock systems, export packaging and private label cooperation for distributors and contractors.",
    // 可改：Technical Parameters 参数表。
    parameters: [
      ["Material", "Galvanized steel, aluminum profile or project-specified material"],
      ["Thickness", "Custom door leaf and frame thickness by project requirement"],
      ["Frame Depth", "Standard or custom frame depth available"],
      ["Surface Finish", "Powder coating, wood grain finish or custom color"],
      ["Opening Direction", "Left hand, right hand, inward or outward opening"],
      ["Standard Size", "Common residential and villa door sizes available"],
      ["Custom Size", "Produced according to drawings or opening measurement"],
      ["Hardware", "Handle, hinges, cylinder and optional lock system"],
      ["Packing", "Protective film, carton, pallet or wooden packing"],
      ["Application", "Villa entrance, apartment door, residential project and commercial building"],
    ],
    // 必改/可改：使用场景图片。
    applicationScenes: [
      {
        title: "Office Workplace",
        image: "/images/products/entry-door/aluminum-glass-door-SED-3808/application-scenes/01-office-workplace-scene.jpg",
      },
      {
        title: "Luxury Villa",
        image: "/images/products/entry-door/aluminum-glass-door-SED-3808/application-scenes/02-luxury-villa-scene.jpg",
      },
      {
        title: "Luxury Apartment",
        image: "/images/products/entry-door/aluminum-glass-door-SED-3808/application-scenes/03-luxury-apartment-scene.jpg",
      },
    ],
    // 可改：工厂和质检图片。
    factorySteps: [
      {
        title: "Workshop",
        image: "/images/production-workshop.webp",
      },
      {
        title: "Surface Treatment",
        image: "/images/powder-coating.webp",
      },
      {
        title: "Inspection",
        image: "/images/quality-inspection.webp",
      },
      {
        title: "Export Packing",
        image: "/images/packing.webp",
      },
    ],
    // 可改：FAQ，每一条答案尽量写得不同。
    faqs: [
      [
        "Can I customize the size?",
        "Yes. Send us your opening size or technical drawing, and we can prepare a custom size plan for your project.",
      ],
      [
        "Can I choose the lock and handle?",
        "Yes. Handle style, lock system, hinge type and hardware finish can be selected according to your market needs.",
      ],
      [
        "Do you support OEM packaging?",
        "Yes. We can support neutral packing, branded labels, cartons and project packaging for bulk orders.",
      ],
      [
        "What information is needed for quotation?",
        "Please provide door size, quantity, destination country, material preference, finish color and any reference image or drawing.",
      ],
      [
        "Can you supply for project orders?",
        "Yes. We support residential and commercial project supply with production coordination, packing and export delivery.",
      ],
    ],
    // 可改：底部相关产品卡片。
    relatedProducts: [
      {
        title: "Pivot Door",
        image: "/images/products/entry-door/aluminum-glass-door-SED-3808/related-products/pivot-door-related.jpg",
      },
      {
        title: "Aluminum Profile Door",
        image: "/images/products/entry-door/aluminum-glass-door-SED-3808/related-products/aluminum-profile-door.webp",
      },
      {
        title: "Steel Door",
        image: "/images/products/entry-door/aluminum-glass-door-SED-3808/related-products/steel-door.webp",
      },
    ],
  },
];

export function getDoorProductBySlug(slug: string) {
  return doorProducts.find((product) => product.slug === slug && product.status !== "deleted");
}
