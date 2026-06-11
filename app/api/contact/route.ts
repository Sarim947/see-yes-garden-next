import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const DEFAULT_BUCKET = "inquiry-files";
const DEFAULT_TABLE = "inquiries";

type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  country: string;
  productCategory: string;
  productType: string;
  material: string;
  quantity: string;
  customization: string;
  message: string;
  fileUrl: string;
  storagePath: string;
  status: string;
  formType: string;
};

function getRequiredEnv(key: string) {
  const value = process.env[key]?.trim().replace(/^["']|["']$/g, "");
  if (!value) {
    throw new Error(`Missing server environment variable: ${key}`);
  }
  return value;
}

function getSupabaseServiceKey() {
  const key = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  return key;
}

function supabaseHeaders(contentType?: string) {
  const key = getSupabaseServiceKey();
  const headers: Record<string, string> = {
    apikey: key,
  };

  if (!key.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${key}`;
  }

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
}

function textValue(formData: FormData, key: string) {
  const entry = formData.get(key);
  return typeof entry === "string" ? entry.trim() : "";
}

function textValues(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function safeExtension(name: string) {
  const match = name.toLowerCase().match(/\.([a-z0-9]{1,12})$/);
  return match ? `.${match[1]}` : "";
}

async function ensureStorageBucket(supabaseUrl: string, bucket: string) {
  const response = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
    method: "POST",
    headers: supabaseHeaders("application/json"),
    body: JSON.stringify({
      id: bucket,
      name: bucket,
      public: true,
    }),
  });

  if (response.ok || response.status === 409) {
    return;
  }

  throw new Error(`Storage bucket setup failed: ${await response.text()}`);
}

async function createSignedFileUrl(supabaseUrl: string, bucket: string, filePath: string) {
  const response = await fetch(`${supabaseUrl}/storage/v1/object/sign/${bucket}/${filePath}`, {
    method: "POST",
    headers: supabaseHeaders("application/json"),
    body: JSON.stringify({
      expiresIn: 60 * 60 * 24 * 90,
    }),
  });

  if (!response.ok) {
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
  }

  const result = (await response.json()) as { signedURL?: string; signedUrl?: string };
  const signedPath = result.signedURL || result.signedUrl;

  return signedPath ? `${supabaseUrl}${signedPath}` : `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
}

async function uploadFileToSupabase(file: File) {
  if (!file || file.size === 0) {
    return { url: "", path: "" };
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Attachment is larger than 20MB.");
  }

  const supabaseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_BUCKET;
  const filePath = `inquiries/${Date.now()}-${crypto.randomUUID()}${safeExtension(file.name)}`;

  async function upload() {
    return fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${filePath}`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(file.type || "application/octet-stream"),
        "x-upsert": "false",
      },
      body: Buffer.from(await file.arrayBuffer()),
    });
  }

  let uploadResponse = await upload();

  if (uploadResponse.status === 404) {
    await ensureStorageBucket(supabaseUrl, bucket);
    uploadResponse = await upload();
  }

  if (!uploadResponse.ok) {
    throw new Error(`Attachment upload failed: ${await uploadResponse.text()}`);
  }

  return {
    url: await createSignedFileUrl(supabaseUrl, bucket, filePath),
    path: `${bucket}/${filePath}`,
  };
}

async function saveInquiry(payload: InquiryPayload) {
  const supabaseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const table = process.env.SUPABASE_INQUIRIES_TABLE || DEFAULT_TABLE;

  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      ...supabaseHeaders("application/json"),
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      product_category: payload.productCategory,
      product_type: payload.productType,
      material: payload.material,
      quantity: payload.quantity,
      customization: payload.customization,
      message: payload.message,
      file_url: payload.fileUrl,
      status: payload.status,
    }),
  });

  if (!response.ok) {
    throw new Error(`Inquiry save failed: ${await response.text()}`);
  }
}

async function sendInquiryEmail(payload: InquiryPayload) {
  const resendKey = getRequiredEnv("RESEND_API_KEY");
  const from = process.env.CONTACT_EMAIL_FROM || "SeeYes Garden <onboarding@resend.dev>";
  const to = process.env.INQUIRY_TO_EMAIL || process.env.CONTACT_EMAIL_TO || "edison@seeyesgarden.com";

  const lines = [
    `Form: ${payload.formType}`,
    `Status: ${payload.status}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    `Country: ${payload.country || "-"}`,
    `Product Category: ${payload.productCategory || "-"}`,
    `Product Type: ${payload.productType || "-"}`,
    `Material: ${payload.material || "-"}`,
    `Quantity: ${payload.quantity || "-"}`,
    `Customization: ${payload.customization || "-"}`,
    "",
    "Message:",
    payload.message,
    "",
    `File URL: ${payload.fileUrl || "No file uploaded"}`,
    `Storage Path: ${payload.storagePath || "-"}`,
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New SeeYes Garden ${payload.formType} from ${payload.name}`,
      text: lines.join("\n"),
      reply_to: payload.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Inquiry email failed: ${await response.text()}`);
  }
}

function buildPayload(formData: FormData, file: { url: string; path: string }): InquiryPayload {
  const productType = textValues(formData, "productType").join(", ");
  const customization = textValues(formData, "customization").join(", ");
  const productCategory = textValue(formData, "productCategory") || textValue(formData, "category");
  const material = textValue(formData, "materialPreference") || textValue(formData, "material");

  return {
    name: textValue(formData, "name"),
    email: textValue(formData, "email"),
    phone: textValue(formData, "phone"),
    country: textValue(formData, "country"),
    productCategory,
    productType: productType || productCategory,
    material,
    quantity: textValue(formData, "quantity"),
    customization,
    message: textValue(formData, "message"),
    fileUrl: file.url,
    storagePath: file.path,
    status: "new",
    formType: textValue(formData, "formType") || "inquiry",
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const attachment = formData.get("attachment");
    const file = attachment instanceof File ? await uploadFileToSupabase(attachment) : { url: "", path: "" };
    const payload = buildPayload(formData, file);

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { message: "Please complete name, email and message." },
        { status: 400 },
      );
    }

    await saveInquiry(payload);
    await sendInquiryEmail(payload);

    return NextResponse.json({
      ok: true,
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Could not submit your inquiry.",
      },
      { status: 500 },
    );
  }
}
