import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  country: string;
  productCategory: string;
  quantity: string;
  message: string;
  attachmentUrl?: string;
};

function value(formData: FormData, key: string) {
  const entry = formData.get(key);
  return typeof entry === "string" ? entry.trim() : "";
}

async function uploadAttachment(file: File) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "inquiry-files";

  if (!supabaseUrl || !serviceKey || file.size === 0) {
    return undefined;
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Attachment is larger than 10MB.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filePath = `contact/${Date.now()}-${safeName}`;
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${bucket}/${filePath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "false",
      },
      body: Buffer.from(await file.arrayBuffer()),
    },
  );

  if (!response.ok) {
    throw new Error("Attachment upload failed.");
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
}

async function saveInquiry(payload: InquiryPayload) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_INQUIRIES_TABLE || "contact_inquiries";

  if (!supabaseUrl || !serviceKey) {
    return;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      product_category: payload.productCategory,
      quantity: payload.quantity,
      message: payload.message,
      attachment_url: payload.attachmentUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Inquiry save failed.");
  }
}

async function sendInquiryEmail(payload: InquiryPayload) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM || "SeeYes Garden <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL_TO || "edison@seeyesgarden.com";

  if (!resendKey) {
    return;
  }

  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    `Country: ${payload.country || "-"}`,
    `Product Category: ${payload.productCategory || "-"}`,
    `Quantity: ${payload.quantity || "-"}`,
    "",
    payload.message,
    "",
    `Attachment: ${payload.attachmentUrl || "No attachment"}`,
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
      subject: `New SeeYes Garden inquiry from ${payload.name}`,
      text: lines.join("\n"),
      reply_to: payload.email,
    }),
  });

  if (!response.ok) {
    throw new Error("Inquiry email failed.");
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = value(formData, "name");
    const email = value(formData, "email");
    const message = value(formData, "message");

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please complete name, email and message." },
        { status: 400 },
      );
    }

    const attachment = formData.get("attachment");
    const attachmentUrl =
      attachment instanceof File ? await uploadAttachment(attachment) : undefined;

    const payload: InquiryPayload = {
      name,
      email,
      message,
      attachmentUrl,
      phone: value(formData, "phone"),
      country: value(formData, "country"),
      productCategory: value(formData, "productCategory"),
      quantity: value(formData, "quantity"),
    };

    await saveInquiry(payload);
    await sendInquiryEmail(payload);

    return NextResponse.json({ ok: true });
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
