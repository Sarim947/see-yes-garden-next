# SeeYes Garden 产品上传后台使用说明

后台地址：

```text
/admin/products/uploader
```

本地测试密码：

```text
seeyes
```

正式上线前，请在 Vercel 环境变量里设置：

```text
ADMIN_UPLOAD_PASSWORD=你的后台密码
GITHUB_TOKEN=GitHub personal access token
GITHUB_OWNER=GitHub 用户名或组织名
GITHUB_REPO=仓库名
GITHUB_BRANCH=main
```

## 上传前准备

每个新产品先准备这些内容：

```text
1 张产品列表卡片图
4-8 张详情页轮播图
产品标题
产品型号
产品描述
尺寸、包装、MOQ、重量、CBM 信息
3 个相关产品的页面 slug
```

FAQ 和大参数不用每次手打。选择 Category 后，后台会自动套用品类模板，需要特殊说明时再修改。

## 上传一个新产品

1. 打开 `/admin/products/uploader`。
2. 输入后台密码。
3. 填 `Core Information`：
   - `Product Title`：产品标题。
   - `Product URL Slug`：产品页面地址，会自动生成，也可以手动改。
   - `Category`：选择产品品类。
   - `Description`：产品详情页说明文字。
4. 上传 `1. 产品列表卡片图`：
   - 用在 `/products` 产品列表小卡片。
   - 建议 1200x900。
   - 主体居中。
   - 自动保存到 `product-card/card.*`。
5. 上传 `2. 详情页顶部轮播图`：
   - 用在详情页顶部大图和缩略图。
   - 必须 4-8 张。
   - 建议 1600x1200。
   - 第一张是详情页默认首图。
   - 自动保存到 `detail-carousel/`。
6. 检查 `3. 大参数 Product Attributes`：
   - 选择 Category 后会自动填好。
   - 可以直接沿用。
   - 如果产品特殊，再改 Application、Material、Customization、OEM/ODM Support。
7. 填 `4. Product Description 参数表`：
   - 先填型号、尺寸、包装、MOQ、重量、纸箱尺寸。
   - 点 `用当前型号和尺寸刷新参数表`。
   - 再检查表格内容。
8. 检查 `5. FAQ`：
   - 默认沿用品类模板。
   - 不需要每次手打。
   - 如果产品有特殊问题，再修改。
9. 填 `6. Related Products`：
   - 固定 3 个。
   - 直接从下拉里选择已经上传过的产品。
   - 选择后会自动引用产品标题、页面 slug 和产品主图。
   - 不需要重新上传 Related Products 图片。
10. 可选上传 `7. Reference / Source`：
   - 只做内部留档。
   - 不显示在网页。
   - 自动保存到 `source/`。
11. 点 `Save Draft` 可以先保存草稿。
12. 点 `Add Product` 发布产品。

## 图片文件夹规则

后台会自动按这个结构放图片：

```text
public/images/products/<categorySlug>/<productSlug>/
  product-card/
  detail-carousel/
  source/
```

网页里最终使用的图片路径会自动写成：

```text
/images/products/<categorySlug>/<productSlug>/product-card/card.webp
```

不要填写电脑本地路径。

## 发布前检查规则

发布时后台会检查：

```text
Product Title、Slug、Category、Description 必填
卡片图必须有
详情轮播图必须 4-8 张
大参数四项至少各有 1 个值
Product Description 至少 6 行
FAQ 至少 4 条完整问答
Related Products 必须 3 条
Related Products 的 slug 必须已经存在
Related Products 必须从已上传产品里选择
所有网页图片路径必须以 /images/products/... 开头
```

## 编辑产品

1. 在右侧 Products 里找到产品。
2. 点 `Edit`。
3. 左侧会进入 `Edit Product`，并回填文字、分类、尺寸、主图、轮播图、大参数、参数表、FAQ、Related Products。
4. 轮播图可以 Up / Down 调整顺序。
5. 改完后点 `Save Changes`。

## 删除产品

1. 点产品卡片上的 `Delete`。
2. 确认弹窗会显示：

```text
Delete "产品标题"?

This cannot be undone.
```

3. 确认后是软删除：
   - 前台产品列表隐藏。
   - 详情页不能再打开。
   - 图片不物理删除。
   - 数据保留 `status: "deleted"`。

## 第一版不包含

- Pricing Matrix
- 图片裁剪
- Reference Image 前台展示
- Supabase Storage
