import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    // 🔥 Primim form-data (imagini + setări)
    const formData = await req.formData();

    const images = formData.getAll("images") as File[];
    const settings = JSON.parse(formData.get("settings") as string);

    if (!images.length) {
      return NextResponse.json({ error: "Nicio imagine trimisă" }, { status: 400 });
    }

    // 🔥 Generăm jobId
    const jobId = randomUUID();

    // 🔥 Creăm folderul jobului
    const jobDir = path.join("/tmp/jobs", jobId);
    fs.mkdirSync(jobDir, { recursive: true });

    // 🔥 Salvăm imaginile în folder
    for (let i = 0; i < images.length; i++) {
      const arrayBuffer = await images[i].arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePath = path.join(jobDir, `image_${i}.jpg`);
      fs.writeFileSync(filePath, buffer);
    }

    // 🔥 Salvăm setările într-un config.json
    fs.writeFileSync(
      path.join(jobDir, "config.json"),
      JSON.stringify(settings, null, 2)
    );

    return NextResponse.json({ jobId });
  } catch (error: any) {
    console.error("❌ Eroare job/create:", error);
    return NextResponse.json(
      { error: "Eroare la crearea jobului" },
      { status: 500 }
    );
  }
}
