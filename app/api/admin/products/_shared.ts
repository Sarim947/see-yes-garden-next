import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { adminProductCategories, getAdminCategory, slugifyProduct } from "@/data/adminProductCategories";
import { productsCatalog } from "@/data/productLines";
import type { ProductItem } from "@/data/productLines";

export const runtime = "nodejs";

type RelatedProductInput = {
  title: string;
  image?: string;
  slug: string;
};

type ProductPayload = {
  originalSlug?: string;
  title: string;
  categoryLabel: string;
  description: string;
  slug?: string;
  model?: string;
  length?: string;
  width?: string;
  height?: string;
  grossWeight?: string;
  netWeight?: string;
  cartonLength?: string;
  cartonWidth?: string;
  cartonHeight?: string;
  packing?: string;
  moq?: string;
  mainImageExisting?: string;
  galleryExisting?: string[];
  specImageExisting?: string;
  applications?: string[];
  materials?: string[];
  customization?: string[];
  oemSupport?: string[];
  productDescription?: string[][];
  faqs?: string[][];
  relatedProducts?: RelatedProductInput[];
};

type FileChange = {
  repoPath: string;
  content: string | Buffer;
};

const projectRoot = process.cwd();

export function unauthorized() {
  return Response.json({ ok: false, message: "Password is not correct." }, { status: 401 });
}

export function isAuthorized(request: Request, formData?: FormData) {
  const configured = envValue("ADMIN_UPLOAD_PASSWORD");
  const fallback = process.env.NODE_ENV === "development" ? "seeyes" : undefined;
  const expected = configured || fallback;

  if (!expected) {
    return false;
  }

  const password =
    request.headers.get("x-admin-password") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    formData?.get("password")?.toString();

  return password === expected;
}

export function getAdminProducts() {
  return productsCatalog.map((product) => ({
    ...product,
    adminCategoryLabel:
      adminProductCategories.find((category) => category.productCategory === product.category)?.label ?? product.category,
  }));
}

export function parsePayload(formData: FormData) {
  const raw = formData.get("payload");
  if (!raw || typeof raw !== "string") {
    throw new Error("Missing product data.");
  }

  return JSON.parse(raw) as ProductPayload;
}

export async function saveDraft(request: Request) {
  const formData = await request.formData();
  if (!isAuthorized(request, formData)) {
    return unauthorized();
  }

  const payload = parsePayload(formData);
  const { product, changes } = await buildProductAndFileChanges(payload, formData, false);
  const draftRepoPath = `data/productDrafts/${product.slug}.json`;
  changes.push({
    repoPath: draftRepoPath,
    content: `${JSON.stringify({ savedAt: new Date().toISOString(), product }, null, 2)}\n`,
  });

  await writeChanges(changes, `Save draft product: ${product.title}`);
  return Response.json({ ok: true, mode: "draft", product });
}

export async function publishProduct(request: Request) {
  const formData = await request.formData();
  if (!isAuthorized(request, formData)) {
    return unauthorized();
  }

  const payload = parsePayload(formData);
  const { product, category, changes } = await buildProductAndFileChanges(payload, formData, true);

  const categoryProducts = productsCatalog.filter((item) => item.category === category.productCategory);
  const withoutOld = categoryProducts.filter((item) => item.slug !== product.slug && item.slug !== payload.originalSlug);
  const nextProducts = [...withoutOld, product];
  changes.push({
    repoPath: `data/productLines/${category.fileName}`,
    content: renderProductLineFile(category, nextProducts),
  });

  await writeChanges(changes, `Publish product: ${product.title}`);
  return Response.json({ ok: true, mode: "publish", product });
}

export async function softDeleteProduct(request: Request) {
  const formData = await request.formData();
  if (!isAuthorized(request, formData)) {
    return unauthorized();
  }

  const slug = formData.get("slug")?.toString();
  if (!slug) {
    return Response.json({ ok: false, message: "Missing product slug." }, { status: 400 });
  }

  const existing = productsCatalog.find((item) => item.slug === slug);
  if (!existing) {
    return Response.json({ ok: false, message: "Product not found." }, { status: 404 });
  }

  const category = adminProductCategories.find((item) => item.productCategory === existing.category);
  if (!category) {
    return Response.json({ ok: false, message: "Unsupported category." }, { status: 400 });
  }

  const categoryProducts = productsCatalog.filter((item) => item.category === existing.category);
  const nextProducts = categoryProducts.map((item) =>
    item.slug === slug ? ({ ...item, status: "deleted" } as ProductItem) : item,
  );

  await writeChanges(
    [
      {
        repoPath: `data/productLines/${category.fileName}`,
        content: renderProductLineFile(category, nextProducts),
      },
    ],
    `Soft delete product: ${existing.title}`,
  );

  return Response.json({ ok: true, slug });
}

async function buildProductAndFileChanges(payload: ProductPayload, formData: FormData, requirePublishReady: boolean) {
  const category = getAdminCategory(payload.categoryLabel);
  if (!category) {
    throw new Error("Unsupported category.");
  }

  const productSlug = slugifyProduct(payload.slug || payload.title);
  if (!productSlug) {
    throw new Error("Product title or slug is required.");
  }

  const productFolder = `images/products/${category.categorySlug}/${productSlug}`;
  const changes: FileChange[] = [];
  const mainFile = getSingleFile(formData, "mainImage");
  const galleryFiles = getFiles(formData, "gallery");
  const specFile = getSingleFile(formData, "specImage");
  const relatedProductsInput = payload.relatedProducts ?? [];
  const relatedImages = [0, 1, 2].map((index) => getSingleFile(formData, `relatedImage${index}`));
  const mainImage = mainFile
    ? await addUploadedFile(changes, productFolder, "product-card", mainFile, "card", "fixed")
    : payload.mainImageExisting;

  if (!mainImage) {
    throw new Error("Product card image is required.");
  }

  const gallery = [...(payload.galleryExisting ?? [])];
  for (let index = 0; index < galleryFiles.length; index += 1) {
    gallery.push(
      await addUploadedFile(
        changes,
        productFolder,
        "detail-carousel",
        galleryFiles[index],
        `${gallery.length + 1}`.padStart(2, "0"),
        "prefixed",
      ),
    );
  }

  if (specFile) {
    await addUploadedFile(changes, productFolder, "source", specFile, "reference", "prefixed");
  }

  const relatedProducts = [];
  for (let index = 0; index < 3; index += 1) {
    const item = relatedProductsInput[index];
    if (!item) continue;
    const relatedFile = relatedImages[index];
    const uploadedImage = relatedFile
      ? await addUploadedFile(
          changes,
          productFolder,
          "related-products",
          relatedFile,
          `${index + 1}`.padStart(2, "0"),
          "prefixed",
        )
      : undefined;
    const target = productsCatalog.find((product) => product.slug === item.slug?.trim());
    relatedProducts.push({
      title: item.title?.trim() || target?.title || "",
      image: uploadedImage || item.image?.trim() || "",
      slug: item.slug?.trim() || "",
    });
  }

  const size = buildSize(payload.length, payload.width, payload.height);
  const cbm = buildCbm(payload.cartonLength, payload.cartonWidth, payload.cartonHeight);
  const productDescription = normalizeTableRows(payload.productDescription).length
    ? normalizeTableRows(payload.productDescription)
    : buildProductDescription(payload, size, cbm, category.defaultMaterials);
  const applications = normalizeTextList(payload.applications, category.defaultApplications);
  const materials = normalizeTextList(payload.materials, category.defaultMaterials);
  const customization = normalizeTextList(payload.customization, category.defaultCustomization);
  const oemSupport = normalizeTextList(payload.oemSupport, category.defaultOemSupport);
  const faqs = normalizeTableRows(payload.faqs).length ? normalizeTableRows(payload.faqs) : category.defaultFaqs;

  const product: ProductItem = {
    slug: productSlug,
    title: payload.title.trim(),
    category: category.productCategory,
    template: category.template,
    subtitle: `${payload.model?.trim() || payload.title.trim()} for outdoor projects and wholesale supply.`,
    description: payload.description.trim(),
    image: mainImage,
    gallery,
    highlights: buildHighlights(payload, materials),
    applications,
    materials,
    customization,
    oemSupport,
    cardModel: payload.model?.trim(),
    cardSize: size,
    cardCbm: cbm,
    moq: payload.moq?.trim(),
    grossWeight: payload.grossWeight?.trim(),
    netWeight: payload.netWeight?.trim(),
    packing: payload.packing?.trim(),
    status: "published",
    productDescription,
    faqs,
    relatedProducts,
  };

  if (requirePublishReady) {
    validatePublishReady(product);
  }

  if (category.template === "door") {
    Object.assign(product, buildDoorFields(product, mainImage));
  }

  return { product, category, changes };
}

function validatePublishReady(product: ProductItem) {
  if (!product.title || !product.slug || !product.category || !product.description) {
    throw new Error("Product title, slug, category and description are required.");
  }
  if (!product.image.startsWith("/images/products/")) {
    throw new Error("Product card image must use /images/products/... path.");
  }
  if (product.gallery.length < 4 || product.gallery.length > 8) {
    throw new Error("Detail carousel must have 4 to 8 images.");
  }
  for (const image of product.gallery) {
    if (!image.startsWith("/images/products/")) {
      throw new Error("Detail carousel images must use /images/products/... paths.");
    }
  }
  for (const [label, values] of [
    ["Application", product.applications],
    ["Material", product.materials],
    ["Customization", product.customization],
    ["OEM/ODM Support", product.oemSupport],
  ] as const) {
    if (!values.length) {
      throw new Error(`${label} must have at least one value.`);
    }
  }
  if (!product.productDescription || product.productDescription.length < 6) {
    throw new Error("Product Description must have at least 6 complete rows.");
  }
  if (product.productDescription.some(([label, value]) => !label.trim() || !value.trim())) {
    throw new Error("Product Description rows cannot be empty.");
  }
  if (!product.faqs || product.faqs.length < 4 || product.faqs.some(([question, answer]) => !question.trim() || !answer.trim())) {
    throw new Error("FAQ must have at least 4 complete questions and answers.");
  }
  if (!product.relatedProducts || product.relatedProducts.length !== 3) {
    throw new Error("Related Products must have exactly 3 items.");
  }
  for (const related of product.relatedProducts) {
    if (!related.slug || !productsCatalog.some((item) => item.slug === related.slug && item.status !== "deleted")) {
      throw new Error(`Related product slug does not exist: ${related.slug || related.title}`);
    }
    if (!related.image || !related.image.startsWith("/images/")) {
      throw new Error(`Related product image is required: ${related.title || related.slug}`);
    }
  }
}

function getSingleFile(formData: FormData, name: string) {
  const file = formData.get(name);
  return file instanceof File && file.size > 0 ? file : undefined;
}

function getFiles(formData: FormData, name: string) {
  return formData.getAll(name).filter((file): file is File => file instanceof File && file.size > 0);
}

async function addUploadedFile(
  changes: FileChange[],
  folder: string,
  slot: string,
  file: File,
  fallbackName: string,
  naming: "fixed" | "prefixed",
) {
  const extension = path.extname(file.name).toLowerCase() || extensionFromType(file.type);
  const originalName = slugifyProduct(path.basename(file.name, path.extname(file.name)));
  const fileName = naming === "fixed" ? `${fallbackName}${extension}` : `${fallbackName}-${originalName || "image"}${extension}`;
  const repoPath = `public/${folder}/${slot}/${fileName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  changes.push({ repoPath, content: buffer });
  return `/${folder}/${slot}/${fileName}`;
}

function extensionFromType(type: string) {
  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  return ".jpg";
}

function buildSize(length?: string, width?: string, height?: string) {
  const values = [length, width, height].map((value) => value?.trim()).filter(Boolean);
  return values.length === 3 ? `${values[0]} x ${values[1]} x ${values[2]} cm` : undefined;
}

function buildCbm(length?: string, width?: string, height?: string) {
  const numbers = [length, width, height].map((value) => Number(value));
  if (numbers.some((value) => !Number.isFinite(value) || value <= 0)) {
    return undefined;
  }

  return `${((numbers[0] * numbers[1] * numbers[2]) / 1000000).toFixed(4)} m³`;
}

function buildProductDescription(
  payload: ProductPayload,
  size: string | undefined,
  cbm: string | undefined,
  defaultMaterials: string[],
) {
  const rows = [
    ["Item Number", payload.model?.trim()],
    ["Product Name", payload.title.trim()],
    ["Material", defaultMaterials.join(" / ")],
    ["Overall Size", size || "Customized"],
    ["Color", "Customized"],
    ["Packing", payload.packing?.trim() || "Carton"],
    ["MOQ", payload.moq?.trim()],
    ["Gross Weight", payload.grossWeight?.trim()],
    ["Net Weight", payload.netWeight?.trim()],
    ["CBM", cbm],
  ];

  return rows.filter((row): row is string[] => Boolean(row[1]));
}

function buildHighlights(payload: ProductPayload, materials: string[]) {
  return [
    materials[0],
    buildSize(payload.length, payload.width, payload.height) || "Custom size",
    payload.packing?.trim() || "Export packing",
    "OEM & ODM support",
  ].filter(Boolean) as string[];
}

function normalizeTextList(values: string[] | undefined, fallback: string[]) {
  const next = (values ?? []).map((item) => item.trim()).filter(Boolean);
  return next.length ? next : fallback;
}

function normalizeTableRows(rows?: string[][]) {
  return (rows ?? [])
    .map(([label, value]) => [label?.trim() || "", value?.trim() || ""])
    .filter(([label, value]) => label || value);
}

function buildDoorFields(product: ProductItem, mainImage: string) {
  return {
    cardImage: mainImage,
    quickSpecs: [
      ["Model", product.cardModel || product.title],
      ["Size", product.cardSize || "Custom size"],
      ["Material", product.materials.join(" / ")],
      ["Surface Finish", "Powder coating, wood grain or custom color"],
      ["Packing", product.packing || "Export packing"],
      ["Project Supply", "OEM packaging and bulk order support"],
    ],
    overview: product.description,
    parameters: product.productDescription ?? [],
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
    factorySteps: [
      { title: "Workshop", image: "/images/production-workshop.webp" },
      { title: "Surface Treatment", image: "/images/powder-coating.webp" },
      { title: "Inspection", image: "/images/quality-inspection.webp" },
      { title: "Export Packing", image: "/images/packing.webp" },
    ],
  };
}

function renderProductLineFile(category: NonNullable<ReturnType<typeof getAdminCategory>>, products: ProductItem[]) {
  const typeImport = category.typeName === "DoorProduct" ? "DoorProduct" : "ProductItem";
  const body = products.map((product) => renderValue(product, 2)).join(",\n");
  const doorHelper =
    category.typeName === "DoorProduct"
      ? `\n\nexport function getDoorProductBySlug(slug: string) {\n  return doorProducts.find((product) => product.slug === slug && product.status !== "deleted");\n}\n`
      : "\n";

  return `import type { ${typeImport} } from "./types";\n\nexport const ${category.exportName}: ${typeImport}[] = [\n${body},\n];${doorHelper}`;
}

function renderValue(value: unknown, indent = 0): string {
  const pad = " ".repeat(indent);
  const nextPad = " ".repeat(indent + 2);

  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map((item) => `${nextPad}${renderValue(item, indent + 2)}`).join(",\n")},\n${pad}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, entryValue]) => entryValue !== undefined);
    return `{\n${entries
      .map(([key, entryValue]) => `${nextPad}${key}: ${renderValue(entryValue, indent + 2)}`)
      .join(",\n")},\n${pad}}`;
  }

  return JSON.stringify(value);
}

async function writeChanges(changes: FileChange[], message: string) {
  const uniqueChanges = Array.from(new Map(changes.map((change) => [change.repoPath, change])).values());

  if (envValue("GITHUB_TOKEN") && envValue("GITHUB_OWNER") && envValue("GITHUB_REPO")) {
    await commitToGithub(uniqueChanges, message);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "GitHub environment variables are missing. Set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO and GITHUB_BRANCH in Vercel.",
    );
  }

  for (const change of uniqueChanges) {
    const absolutePath = path.join(projectRoot, change.repoPath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, change.content);
  }
}

async function commitToGithub(changes: FileChange[], message: string) {
  const owner = envValue("GITHUB_OWNER");
  const repo = envValue("GITHUB_REPO");
  const branch = envValue("GITHUB_BRANCH") || "main";
  const token = envValue("GITHUB_TOKEN");
  const apiBase = `https://api.github.com/repos/${owner}/${repo}`;

  const ref = await githubJson<{ object: { sha: string } }>(
    `${apiBase}/git/ref/heads/${branch}`,
    { headers: githubHeaders(token) },
    "GitHub branch lookup failed",
  );

  const baseCommit = await githubJson<{ tree: { sha: string } }>(
    `${apiBase}/git/commits/${ref.object.sha}`,
    { headers: githubHeaders(token) },
    "GitHub base commit lookup failed",
  );

  const tree = await Promise.all(
    changes.map(async (change) => {
      const content =
        typeof change.content === "string"
          ? Buffer.from(change.content).toString("base64")
          : change.content.toString("base64");

      const blob = await githubJson<{ sha: string }>(
        `${apiBase}/git/blobs`,
        {
          method: "POST",
          headers: githubHeaders(token),
          body: JSON.stringify({
            content,
            encoding: "base64",
          }),
        },
        `GitHub blob creation failed for ${change.repoPath}`,
      );

      return {
        path: change.repoPath,
        mode: "100644",
        type: "blob",
        sha: blob.sha,
      };
    }),
  );

  const nextTree = await githubJson<{ sha: string }>(
    `${apiBase}/git/trees`,
    {
      method: "POST",
      headers: githubHeaders(token),
      body: JSON.stringify({
        base_tree: baseCommit.tree.sha,
        tree,
      }),
    },
    "GitHub tree creation failed",
  );

  const nextCommit = await githubJson<{ sha: string }>(
    `${apiBase}/git/commits`,
    {
      method: "POST",
      headers: githubHeaders(token),
      body: JSON.stringify({
        message,
        tree: nextTree.sha,
        parents: [ref.object.sha],
      }),
    },
    "GitHub commit creation failed",
  );

  await githubJson(
    `${apiBase}/git/refs/heads/${branch}`,
    {
      method: "PATCH",
      headers: githubHeaders(token),
      body: JSON.stringify({
        sha: nextCommit.sha,
        force: false,
      }),
    },
    "GitHub branch update failed",
  );
}

async function githubJson<T = unknown>(url: string, init: RequestInit, label: string) {
  const response = await fetch(url, init);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${label}: ${text}`);
  }

  return (await response.json()) as T;
}

function githubHeaders(token?: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function envValue(name: string) {
  return process.env[name]?.trim();
}

export async function getExistingDraft(slug: string) {
  const draftPath = path.join(projectRoot, "data/productDrafts", `${slug}.json`);
  return JSON.parse(await readFile(draftPath, "utf8"));
}
