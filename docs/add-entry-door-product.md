# Entry Door 新产品上新步骤

这份文档只管门类详情页，也就是 `Entry Door` 产品。

入户门统一这样管理：

- 所有入户门文字、详情、图片链接：`data/productLines/doors.ts`
- 所有入户门图片总文件夹：`public/images/products/entry-door/`
- 每个型号一个图片文件夹：`public/images/products/entry-door/产品型号slug/`

不要改组件文件，不要改页面文件。

## 第 1 步：先确定产品 slug

`slug` 是这个产品的网址名字。

例子：

```text
pivot-door-sed-02
```

以后页面地址就是：

```text
/products/pivot-door-sed-02
```

要求：

- 只能用英文小写、数字、短横线。
- 不要用中文。
- 不要用空格。
- 不要和已有产品重复。

## 第 2 步：新建图片文件夹

打开入户门图片总文件夹：

```text
public/images/products/entry-door/
```

在里面新建一个文件夹，文件夹名字必须和 `slug` 一样。

例子：

```text
public/images/products/entry-door/pivot-door-sed-02/
```

然后在这个产品文件夹里新建 4 个小文件夹：

```text
product-card/
detail-carousel/
application-scenes/
related-products/
```

最后结构应该像这样：

```text
public/images/products/entry-door/pivot-door-sed-02/
  product-card/
  detail-carousel/
  application-scenes/
  related-products/
```

注意：这个产品图片文件夹里面只放图片，不放文档，不放代码。

## 第 3 步：把图片放进去

### 产品卡片图

放到：

```text
public/images/products/entry-door/pivot-door-sed-02/product-card/
```

建议命名：

```text
card.jpg
```

### 详情页顶部轮播图

放到：

```text
public/images/products/entry-door/pivot-door-sed-02/detail-carousel/
```

建议命名：

```text
01-main.jpg
02-detail.jpg
03-structure.jpg
04-hardware.jpg
```

### 应用场景图

放到：

```text
public/images/products/entry-door/pivot-door-sed-02/application-scenes/
```

建议命名：

```text
01-villa.jpg
02-apartment.jpg
03-commercial.jpg
```

### 相关产品图

放到：

```text
public/images/products/entry-door/pivot-door-sed-02/related-products/
```

建议命名：

```text
01-related.jpg
02-related.jpg
03-related.jpg
```

## 第 4 步：复制一个产品块

打开文件：

```text
data/productLines/doors.ts
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

还是在 `data/productLines/doors.ts`。

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

注意：新粘贴的产品块前后要保持逗号。正确样子大概是：

```ts
  },
  {
    slug: "你的新产品slug",
    ...
  },
];
```

## 第 6 步：改产品基本信息

在你刚粘贴的新产品块里，先改这几项。

### 改 slug

```ts
slug: "pivot-door-sed-02",
```

这里必须和你的图片文件夹名字一致。

### 改 title

```ts
title: "Pivot Door SED-02",
```

这是页面大标题。

### category 不要改

```ts
category: "Entry Door",
```

### template 不要改

```ts
template: "door",
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
cardImage: "...",
```

改成你的新图片：

```ts
image: "/images/products/entry-door/pivot-door-sed-02/product-card/card.jpg",
cardImage: "/images/products/entry-door/pivot-door-sed-02/product-card/card.jpg",
```

注意：

- 前面必须是 `/images/products/`
- 中间必须是你的产品 `slug`
- 后面必须和真实图片文件名一模一样

## 第 8 步：改顶部轮播图链接

找到：

```ts
gallery: [
  "...",
  "...",
  "...",
  "...",
],
```

改成：

```ts
gallery: [
  "/images/products/entry-door/pivot-door-sed-02/detail-carousel/01-main.jpg",
  "/images/products/entry-door/pivot-door-sed-02/detail-carousel/02-detail.jpg",
  "/images/products/entry-door/pivot-door-sed-02/detail-carousel/03-structure.jpg",
  "/images/products/entry-door/pivot-door-sed-02/detail-carousel/04-hardware.jpg",
],
```

如果你只有 3 张图，也可以只留 3 行。

## 第 9 步：改卖点和筛选项

### highlights

产品卡片和详情页顶部会显示这些卖点：

```ts
highlights: ["Security structure", "Custom size", "Weather resistant", "OEM & ODM support"],
```

你可以改成：

```ts
highlights: ["Thermal insulation", "Custom color", "Strong frame", "OEM & ODM support"],
```

### applications

这个影响产品列表筛选：

```ts
applications: ["Residential", "Commercial & Hospitality"],
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

## 第 10 步：改快速参数

找到：

```ts
quickSpecs: [
  ["Material", "..."],
  ["Door Type", "..."],
],
```

左边是参数名，右边是参数内容。

例子：

```ts
["Material", "Aluminum profile + tempered glass"],
```

## 第 11 步：改详情正文

找到：

```ts
overview: "...",
```

这里写 `Product Overview` 正文。

## 第 12 步：改技术参数表

找到：

```ts
parameters: [
  ["Material", "..."],
  ["Thickness", "..."],
],
```

每一行就是表格里的一行。

格式必须保持这样：

```ts
["参数名", "参数内容"],
```

## 第 13 步：改应用场景图片

找到：

```ts
applicationScenes: [
  {
    title: "...",
    image: "...",
  },
],
```

改成你的新产品图片：

```ts
applicationScenes: [
  {
    title: "Villa Entrance",
    image: "/images/products/entry-door/pivot-door-sed-02/application-scenes/01-villa.jpg",
  },
  {
    title: "Apartment Project",
    image: "/images/products/entry-door/pivot-door-sed-02/application-scenes/02-apartment.jpg",
  },
  {
    title: "Commercial Building",
    image: "/images/products/entry-door/pivot-door-sed-02/application-scenes/03-commercial.jpg",
  },
],
```

## 第 14 步：工厂和质检图片一般不用改

这段可以先不动：

```ts
factorySteps: [
  {
    title: "Workshop",
    image: "/images/production-workshop.webp",
  },
]
```

这些是全站通用工厂图。

## 第 15 步：改 FAQ

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

## 第 16 步：改相关产品

找到：

```ts
relatedProducts: [
  {
    title: "...",
    image: "...",
  },
],
```

如果你想用新产品自己的相关图，可以这样写：

```ts
relatedProducts: [
  {
    title: "Pivot Door",
    image: "/images/products/entry-door/pivot-door-sed-02/related-products/01-related.jpg",
  },
  {
    title: "Aluminum Glass Door",
    image: "/images/products/entry-door/pivot-door-sed-02/related-products/02-related.jpg",
  },
  {
    title: "Steel Door",
    image: "/images/products/entry-door/pivot-door-sed-02/related-products/03-related.jpg",
  },
],
```

## 第 17 步：保存文件

在编辑器里保存：

```text
Ctrl+S
```

如果你是 Mac，也可以按：

```text
Command+S
```

## 第 18 步：启动网站预览

在项目目录运行：

```bash
npm run dev
```

打开提示里的本地网址。

然后访问你的产品页面：

```text
/products/pivot-door-sed-02
```

## 第 19 步：检查这 5 件事

1. 产品列表里有没有新产品卡片。
2. 产品卡片图片有没有显示。
3. 详情页顶部轮播图有没有显示。
4. 应用场景图片有没有显示。
5. 询盘按钮打开后，产品名和链接是不是新产品。

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
slug: "pivot-door-sed-02",
```

图片路径也必须写：

```text
/images/products/entry-door/pivot-door-sed-02/
```

### 忘记逗号

每个产品块结束后要有：

```ts
},
```

数组里的每一行通常也要保留逗号。

### 图片链接不要写电脑路径

不要写：

```text
/Users/liuxun/Documents/...
```

网页里只写：

```text
/images/products/entry-door/产品型号slug/文件夹/图片名.jpg
```
