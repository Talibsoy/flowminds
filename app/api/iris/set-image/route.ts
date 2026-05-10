import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-iris-key");
  if (auth !== process.env.IRIS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contentKey, imageUrl } = await req.json();
  if (!contentKey || !imageUrl) {
    return NextResponse.json({ error: "Missing contentKey or imageUrl" }, { status: 400 });
  }

  const db = getDb();
  const snap = await db.collection("iris_queue").where("key", "==", contentKey).limit(1).get();
  if (snap.empty) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  await snap.docs[0].ref.update({ image_url: imageUrl });
  return NextResponse.json({ success: true });
}
