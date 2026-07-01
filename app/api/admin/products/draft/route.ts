import { saveDraft } from "../_shared";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    return await saveDraft(request);
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "Draft save failed." },
      { status: 400 },
    );
  }
}
