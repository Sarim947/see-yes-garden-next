import type { ProductItem } from "./types";

/*
  Raised Garden Bed 上新说明：

  1. 详细步骤看：docs/add-raised-garden-bed-product.md
  2. 新产品只需要做两件事：
     - 把图片放进 public/images/products/raised-garden-bed/产品型号slug/ 文件夹。
     - 在下面 raisedGardenBedProducts 数组里复制一个完整产品块，然后修改文字和图片链接。
  3. category 固定写 "Raised Garden Bed"，template 固定写 "standard"，不要改。
  4. 图片文件夹只放图片，不放说明文档、不放代码。
  5. 图片链接必须以 /images/products/raised-garden-bed/产品型号slug/ 开头，不能写电脑本地完整路径。
*/

const rgb02AssetPath = "/images/products/raised-garden-bed/raised-garden-bed/raised-garden-bed-rgb-02-fc-c4c";

export const raisedGardenBedProducts: ProductItem[] = [
  {
    // ===== 复制产品块开始：新增产品时，从这一行的 { 开始复制，到下面“复制产品块结束”的 }, 结束 =====
    // 必改：产品页面地址，不能和其他产品重复。例：raised-garden-bed-rgb-02
    slug: "raised-garden-bed-rgb-02-fc-c4c",
    // 必改：产品标题，会显示在产品卡片和详情页顶部。
    title: "Raised Garden Bed RGB-02 FC-C4C",
    // 固定：Raised Garden Bed 品类不要改。
    category: "Raised Garden Bed",
    // 固定：当前 Raised Garden Bed 使用标准详情页模板，不要改。
    template: "standard",
    // 可改：产品短标题/说明，用在详情页顶部。
    subtitle: "Galvanized steel raised garden bed for retail and backyard planting.",
    // 可改：产品简介，用在详情页顶部和询盘说明。
    description:
      "Factory direct raised garden bed solution for home gardens, retail channels and landscape projects, with options for size, color, panel style, carton packing and private label support.",
    // 必改：产品卡片图，只需要这一张，手机和电脑共用。
    image: `${rgb02AssetPath}/product-card/card.webp`,
    // 必改：详情页顶部轮播图，只保留一套图片，手机和电脑共用。
    gallery: [
      `${rgb02AssetPath}/detail-carousel/01-main.webp`,
      `${rgb02AssetPath}/detail-carousel/detail1.webp`,
      `${rgb02AssetPath}/detail-carousel/detail2.webp`,
      `${rgb02AssetPath}/detail-carousel/detail3.webp`,
    ],
    // 可改：产品卡片下面的 3 个卖点会优先显示这里的前三项。
    highlights: ["Galvanized steel", "Custom size", "Retail carton packaging", "OEM & ODM support"],
    // 可改：这些会影响左侧筛选统计。
    applications: ["Backyard & Garden", "Residential", "Public & Landscape"],
    // 可改：这些会影响左侧 Material 筛选统计。
    materials: ["Galvanized Steel"],
    // 可改：产品支持的定制项。
    customization: ["Custom Size", "Custom Color", "Packaging"],
    // 可改：OEM/ODM 支持项。
    oemSupport: ["Private Label", "Packaging"],
    // 可改：详情页 Product Description 表格，左边是参数名，右边是参数内容。
    productDescription: [
      ["Item Number", "RGB-02 FC-C4C"],
      ["Product Name", "Metal Raised Garden Bed"],
      ["Material", "Galvanized Steel"],
      ["Overall Size", "200x60x45cm or Customized"],
      ["Color", "Customized"],
      ["Packing", "Carton"],
    ],
    // 可改：FAQ，每一条答案尽量写得不同。语言风格对齐 Entry Door。
    faqs: [
      [
        "Can I customize the size?",
        "Yes. Send us your required length, width, height or technical drawing, and we can prepare a custom size plan for your project.",
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
    // 可改：底部相关产品卡片。image 必须写到当前型号文件夹里的 related-products 图片。
    relatedProducts: [
      {
        title: "FC-P4C4J Raised Garden Bed",
        image: `${rgb02AssetPath}/related-products/FC-P4C4J.webp`,
        slug: "raised-garden-bed-rgb-02-fc-c4c",
      },
      {
        title: "FC-P4C4Y Raised Garden Bed",
        image: `${rgb02AssetPath}/related-products/FC-P4C4Y.webp`,
        slug: "raised-garden-bed-rgb-02-fc-c4c",
      },
      {
        title: "FC-P6R4J Raised Garden Bed",
        image: `${rgb02AssetPath}/related-products/FC-P6R4J.webp`,
        slug: "raised-garden-bed-rgb-02-fc-c4c",
      },
    ],
    // ===== 复制产品块结束：新增产品时，复制到这一行下面的 }, 为止 =====
  },
];
