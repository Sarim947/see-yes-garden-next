# Raised Garden Bed 新产品上新步骤

这份文档只管 `Raised Garden Bed` 产品。

Raised Garden Bed 统一这样管理：

- 所有 Raised Garden Bed 文字、详情、图片链接：`data/productLines/raisedGardenBeds.ts`
- 所有 Raised Garden Bed 图片总文件夹：`public/images/products/raised-garden-bed/`
- 每个型号一个图片文件夹：`public/images/products/raised-garden-bed/产品型号slug/`

不要改组件文件，不要改页面文件。图片文件夹里面只放图片，不放文档，不放代码。

## 第 1 步：先确定产品 slug

`slug` 是这个产品的网址名字。

例子：

```text
raised-garden-bed-fc-c4c
```

以后页面地址就是：

```text
/products/raised-garden-bed-fc-c4c
```

要求：

- 只能用英文小写、数字、短横线。
- 不要用中文。
- 不要用空格。
- 不要和已有产品重复。

## 第 2 步：新建图片文件夹

打开 Raised Garden Bed 图片总文件夹：

```text
public/images/products/raised-garden-bed/
```

在里面新建一个文件夹，文件夹名字必须和 `slug` 一样。

例子：

```text
public/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/
```

然后在这个产品文件夹里新建 5 个小文件夹：

```text
product-card/
detail-carousel/
application-scenes/
related-products/
source/
```

最后结构应该像这样：

```text
public/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/
  product-card/
  detail-carousel/
  application-scenes/
  related-products/
  source/
```

## 第 3 步：按规格放图片

### 产品卡片图

放到：

```text
public/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/product-card/
```

建议命名：

```text
card.jpg
```

建议尺寸：

```text
1600x900px 或 2000x780px 左右
```

当前示范图尺寸：

```text
2006x784px
```

### 详情页顶部轮播图

放到：

```text
public/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/detail-carousel/
```

建议命名：

```text
01-main.jpg
02-detail.jpg
03-scene.jpg
```

建议尺寸：

```text
1536x784px 或 1600x900px
```

当前示范图尺寸：

```text
01-main.jpg：1536x784px
02-garden-scene.webp：800x400px
03-garden-scene.webp：800x400px
```

### 应用场景图

放到：

```text
public/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/application-scenes/
```

建议命名：

```text
01-backyard.jpg
02-residential.jpg
03-landscape.jpg
```

建议尺寸：

```text
1200x800px 或 800x400px
```

### 相关产品图

放到：

```text
public/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/related-products/
```

建议命名：

```text
01-related.jpg
02-related.jpg
03-related.jpg
```

建议尺寸：

```text
800x600px 或 800x400px
```

## 第 4 步：复制一个产品块

打开文件：

```text
data/productLines/raisedGardenBeds.ts
```

找到这一行注释：

```ts
// ===== 复制产品块开始
```

从它下面的 `{` 开始，按住鼠标拖选，一直选到：

```ts
// ===== 复制产品块结束
```

下面那个 `},` 为止。

然后按：

```text
Ctrl+C
```

如果你是 Mac，也可以按：

```text
Command+C
```

## 第 5 步：粘贴到产品列表最后

还是在 `data/productLines/raisedGardenBeds.ts`。

找到文件最下面的：

```ts
];
```

把光标放在 `];` 上面一行。

然后按：

```text
Ctrl+V
```

如果你是 Mac，也可以按：

```text
Command+V
```

正确样子大概是：

```ts
  },
  {
    slug: "你的新产品slug",
    ...
  },
];
```

## 第 6 步：改产品基本信息

先在刚粘贴的新产品块里，用查找替换把示范型号全部换成新型号。

查找：

```text
raised-garden-bed-fc-c4c
```

替换成你的新型号 `slug`，例如：

```text
raised-garden-bed-fc-p4c4j
```

这样图片路径会一起改掉。不要在文件顶部新增 `const xxxAssetPath`，所有图片路径都放在产品块里面。

### 改 slug

```ts
slug: "raised-garden-bed-fc-c4c",
```

这里必须和你的图片文件夹名字一致。

### 改 title

```ts
title: "Raised Garden Bed FC-C4C",
```

这是页面大标题。

### category 不要改

```ts
category: "Raised Garden Bed",
```

### template 不要改

```ts
template: "standard",
```

### 改 subtitle

```ts
subtitle: "这里写一句产品短介绍。",
```

### 改 description

```ts
description: "这里写产品详情页顶部的介绍文字。",
```

## 第 7 步：改产品卡片图链接

找到：

```ts
image: "...",
```

改成你的新图片：

```ts
image: "/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/product-card/card.webp",
```

注意：

- 前面必须是 `/images/products/raised-garden-bed/`
- 中间必须是你的产品 `slug`
- 后面必须和真实图片文件名一模一样

## 第 8 步：改顶部轮播图链接

找到：

```ts
gallery: [
  "...",
  "...",
  "...",
],
```

改成：

```ts
gallery: [
  "/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/detail-carousel/01-main.webp",
  "/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/detail-carousel/02-detail.jpg",
  "/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/detail-carousel/03-scene.jpg",
],
```

如果你只有 2 张图，也可以只留 2 行。

## 第 9 步：改卖点和筛选项

### highlights

产品卡片和详情页顶部会显示这些卖点：

```ts
highlights: ["Aluminum or galvanized steel", "Modular and customizable sizes", "Durable, eco-friendly and safe"],
```

### applications

这个影响产品列表筛选：

```ts
applications: ["Backyard & Garden", "Residential", "Public & Landscape"],
```

### materials

这个影响 Material 筛选：

```ts
materials: ["Galvanized Steel", "Aluminum"],
```

### customization

产品支持的定制项：

```ts
customization: ["Custom Size", "Custom Color", "Packaging"],
```

### oemSupport

OEM 支持项：

```ts
oemSupport: ["Private Label", "Packaging"],
```

## 第 10 步：改 Product Description 产品表

找到：

```ts
productDescription: [
  ["Item Number", "HMB-2020B"],
  ["Product Name", "Metal Raised Garden Bed"],
],
```

每一行就是表格里的一行。

格式必须保持：

```ts
["参数名", "参数内容"],
```

常用字段：

```ts
["Item Number", "HMB-2020B"],
["Product Name", "Metal Raised Garden Bed"],
["Material", "Galvanized Steel"],
["Overall Size", "200x60x45cm or Customized"],
["Color", "Customized"],
["Packing", "Carton"],
```

## 第 11 步：改 FAQ

找到：

```ts
faqs: [
  ["问题", "答案"],
],
```

格式必须保持：

```ts
["Can I customize the size?", "Yes. ..."],
```

注意：

- 一个问题一行。
- 左边是问题。
- 右边是答案。
- 每一行最后保留逗号。

## 第 12 步：改 Related Products

找到：

```ts
relatedProducts: [
  {
    title: "...",
    image: "...",
  },
],
```

改成你的新产品相关图：

```ts
relatedProducts: [
  {
    title: "Modular Raised Garden Bed",
    image: "/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/related-products/01-related.jpg",
    slug: "modular-raised-garden-bed",
  },
  {
    title: "Residential Garden Bed",
    image: "/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/related-products/02-related.jpg",
    slug: "residential-raised-garden-bed",
  },
  {
    title: "Landscape Garden Bed",
    image: "/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/related-products/03-related.jpg",
    slug: "landscape-raised-garden-bed",
  },
],
```

`slug` 是点击 Related Products 后要跳转的产品页面。这个产品必须已经在 `raisedGardenBeds.ts` 里面存在，否则会跳到不存在的页面。

## 第 13 步：保存文件

在编辑器里保存：

```text
Ctrl+S
```

如果你是 Mac，也可以按：

```text
Command+S
```

## 第 14 步：启动网站预览

在项目目录运行：

```bash
npm run dev
```

打开提示里的本地网址。

然后访问你的产品页面：

```text
/products/raised-garden-bed-fc-c4c
```

## 第 15 步：检查这 7 件事

1. 产品列表里有没有新产品卡片。
2. 产品卡片图片有没有显示。
3. 详情页顶部轮播图有没有显示。
4. Product Description 产品表有没有显示。
5. FAQ 有没有显示。
6. Related Products 图片有没有显示。
7. 询盘按钮打开后，产品名和链接是不是新产品。

## 最容易错的地方

### 图片文件名不一致

代码里写：

```text
card.jpg
```

文件夹里就必须真的叫：

```text
card.jpg
```

`card.JPG`、`Card.jpg`、`card.webp` 都不是同一个名字。

### slug 不一致

代码里写：

```ts
slug: "raised-garden-bed-fc-c4c",
```

图片路径也必须写：

```text
/images/products/raised-garden-bed/raised-garden-bed-fc-c4c/
```

### 图片链接不要写电脑路径

不要写：

```text
/Users/liuxun/Documents/...
```

网页里只写：

```text
/images/products/raised-garden-bed/产品slug/文件夹/图片名.jpg
```
