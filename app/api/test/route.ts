import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getDb } = await import("@/lib/firebase");
    const db = getDb();
    await db.collection("test").limit(1).get();
    return NextResponse.json({ ok: true, firebase: "connected" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
