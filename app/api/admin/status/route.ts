import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";
import { cookies } from "next/headers";

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== process.env.ADMIN_COOKIE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || !["new", "read", "replied"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const db = getDb();
    await db.collection("inquiries").doc(id).update({ status });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
