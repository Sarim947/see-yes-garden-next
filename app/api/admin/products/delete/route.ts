import { softDeleteProduct } from "../_shared";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    return await softDeleteProduct(request);
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "Delete failed." },
      { status: 400 },
    );
  }
}
