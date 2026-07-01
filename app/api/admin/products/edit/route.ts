import { publishProduct } from "../_shared";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    return await publishProduct(request);
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "Edit failed." },
      { status: 400 },
    );
  }
}
