import { adminProductCategories } from "@/data/adminProductCategories";
import { getAdminProducts, isAuthorized, unauthorized } from "./_shared";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  return Response.json({
    ok: true,
    categories: adminProductCategories,
    products: getAdminProducts(),
  });
}
