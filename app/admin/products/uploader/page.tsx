"use client";

import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import { adminProductCategories, getAdminCategory, slugifyProduct } from "@/data/adminProductCategories";
import type { ProductItem } from "@/data/productLines";

type AdminProduct = ProductItem & {
  adminCategoryLabel?: string;
};

type RelatedRow = { title: string; image: string; slug: string };

type FormState = {
  originalSlug: string;
  title: string;
  categoryLabel: string;
  description: string;
  slug: string;
  model: string;
  length: string;
  width: string;
  height: string;
  grossWeight: string;
  netWeight: string;
  cartonLength: string;
  cartonWidth: string;
  cartonHeight: string;
  packing: string;
  moq: string;
  mainImageExisting: string;
  galleryExisting: string[];
  applications: string[];
  materials: string[];
  customization: string[];
  oemSupport: string[];
  productDescription: string[][];
  faqs: string[][];
  relatedProducts: RelatedRow[];
};

const emptyRelatedRows: RelatedRow[] = [
  { title: "", image: "", slug: "" },
  { title: "", image: "", slug: "" },
  { title: "", image: "", slug: "" },
];

const emptyForm: FormState = {
  originalSlug: "",
  title: "",
  categoryLabel: "",
  description: "",
  slug: "",
  model: "",
  length: "",
  width: "",
  height: "",
  grossWeight: "",
  netWeight: "",
  cartonLength: "",
  cartonWidth: "",
  cartonHeight: "",
  packing: "",
  moq: "",
  mainImageExisting: "",
  galleryExisting: [],
  applications: [],
  materials: [],
  customization: [],
  oemSupport: [],
  productDescription: defaultDescriptionRows(),
  faqs: [],
  relatedProducts: emptyRelatedRows,
};

export default function ProductUploaderPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All Categories");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [specImage, setSpecImage] = useState<File | null>(null);
  const [relatedImages, setRelatedImages] = useState<Array<File | null>>([null, null, null]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem("seeYesAdminPassword");
    if (saved) {
      setPassword(saved);
      loadProducts(saved);
    }
  }, []);

  const categoryTemplate = useMemo(() => getAdminCategory(form.categoryLabel), [form.categoryLabel]);
  const sizeText = useMemo(() => {
    return form.length && form.width && form.height ? `${form.length} x ${form.width} x ${form.height} cm` : "Enter dimensions above";
  }, [form.length, form.width, form.height]);
  const cbmText = useMemo(() => {
    const values = [form.cartonLength, form.cartonWidth, form.cartonHeight].map(Number);
    if (values.some((value) => !Number.isFinite(value) || value <= 0)) {
      return "Auto-calculated";
    }
    return `${((values[0] * values[1] * values[2]) / 1000000).toFixed(4)} m³`;
  }, [form.cartonLength, form.cartonWidth, form.cartonHeight]);

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => product.status !== "deleted")
      .filter((product) => (filter === "All Categories" ? true : product.adminCategoryLabel === filter))
      .filter((product) => {
        const text = `${product.title} ${product.category} ${product.cardModel ?? ""}`.toLowerCase();
        return text.includes(query.trim().toLowerCase());
      });
  }, [products, query, filter]);

  const relatedProductOptions = useMemo(() => {
    return adminProductCategories
      .map((category) => ({
        label: category.label,
        products: products.filter(
          (product) =>
            product.status !== "deleted" &&
            product.adminCategoryLabel === category.label &&
            product.slug !== form.slug,
        ),
      }))
      .filter((group) => group.products.length > 0);
  }, [products, form.slug]);

  async function loadProducts(nextPassword = password) {
    const response = await fetch("/api/admin/products", {
      headers: { "x-admin-password": nextPassword },
    });
    const data = await response.json();
    if (!response.ok) {
      setAuthed(false);
      setMessage(data.message || "Password is not correct.");
      return;
    }

    window.sessionStorage.setItem("seeYesAdminPassword", nextPassword);
    setAuthed(true);
    setProducts(data.products);
    setMessage("");
  }

  function patchForm(update: Partial<FormState>) {
    setForm((current) => ({ ...current, ...update }));
  }

  function handleTitle(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug || slugifyProduct(value),
    }));
  }

  function applyCategoryTemplate(categoryLabel: string) {
    const template = getAdminCategory(categoryLabel);
    setForm((current) => ({
      ...current,
      categoryLabel,
      applications: template?.defaultApplications ?? [],
      materials: template?.defaultMaterials ?? [],
      customization: template?.defaultCustomization ?? [],
      oemSupport: template?.defaultOemSupport ?? [],
      faqs: template?.defaultFaqs ?? [],
      productDescription: buildDescriptionRows(current, template?.defaultMaterials ?? []),
    }));
  }

  function refreshDescriptionRows() {
    setForm((current) => ({
      ...current,
      productDescription: buildDescriptionRows(current, categoryTemplate?.defaultMaterials ?? current.materials),
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setMode("add");
    setMainImage(null);
    setGallery([]);
    setSpecImage(null);
    setRelatedImages([null, null, null]);
    setMessage("");
  }

  function editProduct(product: AdminProduct) {
    const model = product.cardModel || getDescriptionValue(product, "Item Number");
    const size = parseSize(product.cardSize || getDescriptionValue(product, "Overall Size"));
    setMode("edit");
    setMainImage(null);
    setGallery([]);
    setSpecImage(null);
    setRelatedImages([null, null, null]);
    setForm({
      ...emptyForm,
      originalSlug: product.slug,
      title: product.title,
      categoryLabel: product.adminCategoryLabel || "",
      description: product.description,
      slug: product.slug,
      model,
      length: size[0] || "",
      width: size[1] || "",
      height: size[2] || "",
      grossWeight: product.grossWeight || getDescriptionValue(product, "Gross Weight"),
      netWeight: product.netWeight || getDescriptionValue(product, "Net Weight"),
      packing: product.packing || getDescriptionValue(product, "Packing"),
      moq: product.moq || getDescriptionValue(product, "MOQ"),
      mainImageExisting: product.image,
      galleryExisting: product.gallery || [],
      applications: product.applications || [],
      materials: product.materials || [],
      customization: product.customization || [],
      oemSupport: product.oemSupport || [],
      productDescription: product.productDescription?.length ? product.productDescription : defaultDescriptionRows(),
      faqs: product.faqs?.length ? product.faqs : getAdminCategory(product.adminCategoryLabel || "")?.defaultFaqs ?? [],
      relatedProducts: fillRelatedRows(product.relatedProducts),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitProduct(action: "draft" | "publish" | "edit") {
    setSaving(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.set("password", password);
      fd.set("payload", JSON.stringify(form));
      if (mainImage) fd.set("mainImage", mainImage);
      if (specImage) fd.set("specImage", specImage);
      gallery.forEach((file) => fd.append("gallery", file));
      relatedImages.forEach((file, index) => {
        if (file) fd.set(`relatedImage${index}`, file);
      });

      const endpoint = action === "draft" ? "draft" : mode === "edit" ? "edit" : "publish";
      const response = await fetch(`/api/admin/products/${endpoint}`, {
        method: "POST",
        body: fd,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Save failed.");
      }

      setMessage(action === "draft" ? "Draft saved." : "Product saved. Frontend files have been updated.");
      await loadProducts();
      if (action !== "draft") resetForm();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(product: AdminProduct) {
    const confirmed = window.confirm(`Delete "${product.title}"?\n\nThis cannot be undone.`);
    if (!confirmed) return;

    const fd = new FormData();
    fd.set("password", password);
    fd.set("slug", product.slug);
    const response = await fetch("/api/admin/products/delete", { method: "POST", body: fd });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message || "Delete failed.");
      return;
    }

    setMessage("Product deleted from frontend. Data is kept as deleted.");
    await loadProducts();
  }

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadProducts(password);
  }

  if (!authed) {
    return (
      <main className="admin-shell admin-login">
        <form onSubmit={login} className="admin-login-card">
          <span className="admin-icon">□</span>
          <h1>Catalog Manager</h1>
          <p>Enter the internal upload password to manage SeeYes Garden products.</p>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Admin password" />
          <button type="submit">Open Uploader</button>
          {message ? <p className="admin-message">{message}</p> : null}
          <small>Local default password: seeyes. Online please set ADMIN_UPLOAD_PASSWORD.</small>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <span className="admin-icon">□</span>
          <strong>Catalog Manager</strong>
        </div>
        <span>{visibleProducts.length} products</span>
      </header>

      <div className="admin-layout">
        <section className="admin-form-panel">
          <div className="admin-title-row">
            <div>
              <h1>{mode === "edit" ? "Edit Product" : "Add Product"}</h1>
              <p>{mode === "edit" ? "Update the details below and save" : "Fill in the required fields and any optional details"}</p>
            </div>
            {mode === "edit" ? (
              <button className="admin-cancel" type="button" onClick={resetForm} aria-label="Cancel edit">
                x
              </button>
            ) : null}
          </div>

          {mode === "edit" ? <div className="editing-strip">Editing: {form.title}</div> : null}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitProduct(mode === "edit" ? "edit" : "publish");
            }}
          >
            <details className="admin-section" open>
              <summary>Core Information <b>*</b></summary>
              <label>
                Product Title *
                <input required value={form.title} onChange={(event) => handleTitle(event.target.value)} placeholder="e.g. Raised Garden Bed FC-C4C" />
              </label>
              <label>
                Product URL Slug *
                <input required value={form.slug} onChange={(event) => patchForm({ slug: slugifyProduct(event.target.value) })} placeholder="auto-generated-from-title" />
              </label>
              <label>
                Category *
                <select required value={form.categoryLabel} onChange={(event) => applyCategoryTemplate(event.target.value)}>
                  <option value="">— Select category —</option>
                  {adminProductCategories.map((category) => (
                    <option key={category.label} value={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              {categoryTemplate ? (
                <p className="template-note">已使用 {categoryTemplate.label} 模板：大参数和 FAQ 可以直接沿用，产品特殊时再修改。</p>
              ) : null}
              <label>
                Description *
                <textarea required value={form.description} onChange={(event) => patchForm({ description: event.target.value })} placeholder="Product description..." rows={7} />
              </label>
            </details>

            <details className="admin-section" open>
              <summary>1. 产品列表卡片图 <b>*</b></summary>
              <FileBox
                label="Card Image"
                hint="用于 products 列表小卡片，建议 1200x900，主体居中。保存到 product-card/card.*"
                existing={form.mainImageExisting}
                files={mainImage ? [mainImage] : []}
                onChange={(files) => setMainImage(files[0] || null)}
              />
            </details>

            <details className="admin-section" open>
              <summary>2. 详情页顶部轮播图 <b>*</b></summary>
              <FileBox
                label="Detail Carousel Images"
                hint="用于详情页顶部大轮播，建议 1600x1200，必须 4-8 张；第一张是默认首图。保存到 detail-carousel/"
                multiple
                existingList={form.galleryExisting}
                files={gallery}
                onChange={setGallery}
              />
              {form.galleryExisting.length ? (
                <div className="existing-gallery">
                  {form.galleryExisting.map((image, index) => (
                    <div className="existing-image-row" key={image}>
                      <span>{index + 1}. {image.split("/").pop()}</span>
                      <button type="button" onClick={() => moveGalleryImage(index, -1, setForm)}>Up</button>
                      <button type="button" onClick={() => moveGalleryImage(index, 1, setForm)}>Down</button>
                      <button type="button" onClick={() => patchForm({ galleryExisting: form.galleryExisting.filter((item) => item !== image) })}>Remove</button>
                    </div>
                  ))}
                </div>
              ) : null}
            </details>

            <details className="admin-section" open>
              <summary>3. 大参数 Product Attributes <b>*</b></summary>
              <p className="field-help">显示在详情页 Product Attributes 四个大卡片里。选择 Category 后会自动套用品类模板，可直接沿用。</p>
              <TagInput label="Application" values={form.applications} onChange={(values) => patchForm({ applications: values })} />
              <TagInput label="Material" values={form.materials} onChange={(values) => patchForm({ materials: values })} />
              <TagInput label="Customization" values={form.customization} onChange={(values) => patchForm({ customization: values })} />
              <TagInput label="OEM/ODM Support" values={form.oemSupport} onChange={(values) => patchForm({ oemSupport: values })} />
            </details>

            <details className="admin-section" open>
              <summary>4. Product Description 参数表 <b>*</b></summary>
              <p className="field-help">显示在详情页 Product Description 表格里。先填型号、尺寸、包装后，可点下面按钮刷新默认参数表。</p>
              <label>
                Model Number *
                <input required value={form.model} onChange={(event) => patchForm({ model: event.target.value })} placeholder="e.g. FC-C4C" />
              </label>
              <div className="admin-three">
                <label>
                  Length (cm)
                  <input type="number" value={form.length} onChange={(event) => patchForm({ length: event.target.value })} placeholder="L" />
                </label>
                <label>
                  Width (cm)
                  <input type="number" value={form.width} onChange={(event) => patchForm({ width: event.target.value })} placeholder="W" />
                </label>
                <label>
                  Height (cm)
                  <input type="number" value={form.height} onChange={(event) => patchForm({ height: event.target.value })} placeholder="H" />
                </label>
              </div>
              <p className="auto-result">Dimensions (L×W×H): {sizeText}</p>
              <div className="admin-two">
                <label>
                  Gross Weight (kg)
                  <input type="number" value={form.grossWeight} onChange={(event) => patchForm({ grossWeight: event.target.value })} placeholder="0.0" />
                </label>
                <label>
                  Net Weight (kg)
                  <input type="number" value={form.netWeight} onChange={(event) => patchForm({ netWeight: event.target.value })} placeholder="0.0" />
                </label>
              </div>
              <div className="admin-three">
                <label>
                  Carton Length (cm)
                  <input type="number" value={form.cartonLength} onChange={(event) => patchForm({ cartonLength: event.target.value })} placeholder="L" />
                </label>
                <label>
                  Carton Width (cm)
                  <input type="number" value={form.cartonWidth} onChange={(event) => patchForm({ cartonWidth: event.target.value })} placeholder="W" />
                </label>
                <label>
                  Carton Height (cm)
                  <input type="number" value={form.cartonHeight} onChange={(event) => patchForm({ cartonHeight: event.target.value })} placeholder="H" />
                </label>
              </div>
              <p className="auto-result">CBM: {cbmText}</p>
              <div className="admin-two">
                <label>
                  Packing
                  <input value={form.packing} onChange={(event) => patchForm({ packing: event.target.value })} placeholder="Carton" />
                </label>
                <label>
                  MOQ
                  <input value={form.moq} onChange={(event) => patchForm({ moq: event.target.value })} placeholder="e.g. 100 pcs" />
                </label>
              </div>
              <button className="inline-admin-btn" type="button" onClick={refreshDescriptionRows}>用当前型号和尺寸刷新参数表</button>
              <EditableRows rows={form.productDescription} setRows={(rows) => patchForm({ productDescription: rows })} addLabel="Add parameter row" />
            </details>

            <details className="admin-section" open>
              <summary>5. FAQ <b>*</b></summary>
              <p className="field-help">FAQ 会显示在详情页 Frequently Asked Questions。默认沿用品类模板，不需要每次手打。</p>
              {categoryTemplate ? (
                <div className="faq-template-preview">
                  <div className="faq-template-head">
                    <strong>{categoryTemplate.label} FAQ 模板预览</strong>
                    <button type="button" onClick={() => patchForm({ faqs: categoryTemplate.defaultFaqs })}>
                      用此模板替换当前 FAQ
                    </button>
                  </div>
                  {categoryTemplate.defaultFaqs.map(([question, answer], index) => (
                    <div className="faq-template-row" key={`${question}-${index}`}>
                      <span>{index + 1}. {question}</span>
                      <p>{answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="field-help">请先选择 Category，系统会显示这个品类的 FAQ 模板。</p>
              )}
              <EditableRows rows={form.faqs} setRows={(rows) => patchForm({ faqs: rows })} addLabel="Add FAQ row" largeValue />
            </details>

            <details className="admin-section" open>
              <summary>6. Related Products <b>*</b></summary>
              <p className="field-help">显示在详情页底部 Related Products。固定 3 个；直接从已上传产品里选择，会自动引用标题、页面地址和产品图片，不需要重新上传。</p>
              <div className="admin-repeat">
                {form.relatedProducts.map((item, index) => (
                  <div key={`related-${index}`} className="admin-repeat-row related-upload-row">
                    <strong>Related Product {index + 1}</strong>
                    <select value={item.slug} onChange={(event) => selectRelatedProduct(index, event.target.value, products, setForm)}>
                      <option value="">— Select existing product —</option>
                      {relatedProductOptions.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.products.map((product) => (
                            <option key={product.slug} value={product.slug}>
                              {product.title}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <input value={item.title} onChange={(event) => updateRelated(index, "title", event.target.value, setForm)} placeholder="Auto-filled product title" />
                    <input value={item.slug} readOnly placeholder="Auto-filled product slug" />
                    <input value={item.image} readOnly placeholder="Auto-filled product image path" />
                  </div>
                ))}
              </div>
            </details>

            <details className="admin-section">
              <summary>7. Reference / Source <span>(optional)</span></summary>
              <FileBox
                label="Reference / Specification Image"
                hint="只做内部留档，不显示在网页。可上传规格图、原图、参考图，保存到 source/"
                files={specImage ? [specImage] : []}
                onChange={(files) => setSpecImage(files[0] || null)}
              />
            </details>

            <div className="admin-actions">
              <button type="button" className="ghost-btn" onClick={resetForm}>
                Clear
              </button>
              <button type="button" className="secondary-admin-btn" disabled={saving} onClick={() => submitProduct("draft")}>
                Save Draft
              </button>
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : mode === "edit" ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
          {message ? <p className="admin-message">{message}</p> : null}
        </section>

        <section className="admin-products-panel">
          <div className="admin-products-head">
            <h2>Products</h2>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." />
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option>All Categories</option>
              {adminProductCategories.map((category) => (
                <option key={category.label}>{category.label}</option>
              ))}
            </select>
          </div>

          <div className="admin-product-grid">
            {visibleProducts.map((product) => (
              <article key={product.slug} className={form.originalSlug === product.slug ? "admin-product-card editing" : "admin-product-card"}>
                <div className="admin-product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="admin-product-body">
                  <span>{product.adminCategoryLabel || product.category}</span>
                  <h3>{product.title}</h3>
                  {product.cardModel ? <p>Model: {product.cardModel}</p> : null}
                  <div className="admin-tags">
                    {product.cardSize ? <em>{product.cardSize}</em> : null}
                    {product.cardCbm ? <em>CBM: {product.cardCbm}</em> : null}
                    {product.moq ? <em>MOQ: {product.moq}</em> : null}
                  </div>
                  <div className="admin-card-actions">
                    <button type="button" onClick={() => editProduct(product)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteProduct(product)}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function FileBox({
  label,
  hint,
  existing,
  existingList,
  files,
  multiple,
  onChange,
}: {
  label: string;
  hint: string;
  existing?: string;
  existingList?: string[];
  files: File[];
  multiple?: boolean;
  onChange: (files: File[]) => void;
}) {
  const previewText = files.length ? files.map((file) => file.name).join(", ") : existing || existingList?.join(", ");

  return (
    <label className="file-box">
      {label}
      <input type="file" accept="image/*" multiple={multiple} onChange={(event) => onChange(Array.from(event.target.files ?? []))} />
      <span>Click to upload or drag & drop</span>
      <small>{previewText || hint}</small>
    </label>
  );
}

function TagInput({ label, values, onChange }: { label: string; values: string[]; onChange: (values: string[]) => void }) {
  return (
    <label>
      {label}
      <input value={values.join(", ")} onChange={(event) => onChange(splitList(event.target.value))} placeholder="Separate values with comma" />
      <small className="field-help-inline">用英文逗号分开；可直接沿用品类模板。</small>
    </label>
  );
}

function EditableRows({
  rows,
  setRows,
  addLabel,
  largeValue,
}: {
  rows: string[][];
  setRows: (rows: string[][]) => void;
  addLabel: string;
  largeValue?: boolean;
}) {
  return (
    <div className="admin-repeat">
      {rows.map((row, index) => (
        <div className="admin-repeat-row table-row-editor" key={`${row[0]}-${index}`}>
          <input value={row[0]} onChange={(event) => updateRow(rows, setRows, index, 0, event.target.value)} placeholder="Label / Question" />
          {largeValue ? (
            <textarea value={row[1]} onChange={(event) => updateRow(rows, setRows, index, 1, event.target.value)} placeholder="Value / Answer" rows={2} />
          ) : (
            <input value={row[1]} onChange={(event) => updateRow(rows, setRows, index, 1, event.target.value)} placeholder="Value / Answer" />
          )}
          <button type="button" onClick={() => setRows(rows.filter((_, rowIndex) => rowIndex !== index))}>Remove</button>
        </div>
      ))}
      <button className="inline-admin-btn" type="button" onClick={() => setRows([...rows, ["", ""]])}>{addLabel}</button>
    </div>
  );
}

function getDescriptionValue(product: ProductItem, label: string) {
  return product.productDescription?.find(([key]) => key === label)?.[1] || "";
}

function parseSize(size?: string) {
  if (!size) return [];
  return size.match(/\d+(\.\d+)?/g) ?? [];
}

function fillRelatedRows(items?: ProductItem["relatedProducts"]) {
  const rows = (items ?? []).map((item) => ({
    title: item.title,
    image: item.image,
    slug: item.slug || "",
  }));
  while (rows.length < 3) rows.push({ title: "", image: "", slug: "" });
  return rows.slice(0, 3);
}

function updateRelated(
  index: number,
  field: "title" | "image" | "slug",
  value: string,
  setForm: Dispatch<SetStateAction<FormState>>,
) {
  setForm((current) => {
    const relatedProducts = current.relatedProducts.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item));
    return { ...current, relatedProducts };
  });
}

function selectRelatedProduct(
  index: number,
  slug: string,
  products: AdminProduct[],
  setForm: Dispatch<SetStateAction<FormState>>,
) {
  const product = products.find((item) => item.slug === slug);
  setForm((current) => {
    const relatedProducts = current.relatedProducts.map((item, itemIndex) =>
      itemIndex === index
        ? {
            title: product?.title || "",
            image: product?.image || "",
            slug: product?.slug || "",
          }
        : item,
    );
    return { ...current, relatedProducts };
  });
}

function updateRelatedImage(index: number, file: File | null, setRelatedImages: Dispatch<SetStateAction<Array<File | null>>>) {
  setRelatedImages((current) => current.map((item, itemIndex) => (itemIndex === index ? file : item)));
}

function updateRow(rows: string[][], setRows: (rows: string[][]) => void, index: number, field: 0 | 1, value: string) {
  setRows(rows.map((row, rowIndex) => (rowIndex === index ? [field === 0 ? value : row[0], field === 1 ? value : row[1]] : row)));
}

function moveGalleryImage(index: number, direction: -1 | 1, setForm: Dispatch<SetStateAction<FormState>>) {
  setForm((current) => {
    const target = index + direction;
    if (target < 0 || target >= current.galleryExisting.length) return current;
    const galleryExisting = [...current.galleryExisting];
    const [item] = galleryExisting.splice(index, 1);
    galleryExisting.splice(target, 0, item);
    return { ...current, galleryExisting };
  });
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function defaultDescriptionRows() {
  return [
    ["Item Number", "To be confirmed"],
    ["Product Name", "To be confirmed"],
    ["Material", "To be confirmed"],
    ["Overall Size", "Customized"],
    ["Color", "Customized"],
    ["Packing", "Carton"],
  ];
}

function buildDescriptionRows(form: FormState, materials: string[]) {
  const size = form.length && form.width && form.height ? `${form.length} x ${form.width} x ${form.height} cm or Customized` : "Customized";
  const cbm = buildCbmText(form.cartonLength, form.cartonWidth, form.cartonHeight);
  return [
    ["Item Number", form.model || "To be confirmed"],
    ["Product Name", form.title || "To be confirmed"],
    ["Material", materials.join(" / ") || "To be confirmed"],
    ["Overall Size", size],
    ["Color", "Customized"],
    ["Packing", form.packing || "Carton"],
    ["MOQ", form.moq || "To be confirmed"],
    ["Gross Weight", form.grossWeight ? `${form.grossWeight} kg` : "To be confirmed"],
    ["Net Weight", form.netWeight ? `${form.netWeight} kg` : "To be confirmed"],
    ["CBM", cbm === "Auto-calculated" ? "To be confirmed" : cbm],
  ];
}

function buildCbmText(length?: string, width?: string, height?: string) {
  const values = [length, width, height].map(Number);
  if (values.some((value) => !Number.isFinite(value) || value <= 0)) {
    return "Auto-calculated";
  }
  return `${((values[0] * values[1] * values[2]) / 1000000).toFixed(4)} m³`;
}
