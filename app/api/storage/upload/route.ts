import { NextRequest, NextResponse } from "next/server";
import { getBucket } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-iris-key") || req.headers.get("x-admin-key");
  const validKeys = [process.env.IRIS_API_KEY, process.env.ADMIN_COOKIE_SECRET];
  if (!auth || !validKeys.includes(auth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "uploads";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Only images allowed (jpg, png, webp, gif)" }, { status: 400 });
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  try {
    const bucket = getBucket();
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileRef = bucket.file(filename);

    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
    });

    await fileRef.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return NextResponse.json({ success: true, url: publicUrl, filename });
  } catch (err) {
    console.error("Storage upload error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
