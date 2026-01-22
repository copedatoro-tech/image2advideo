import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("images") as File[];

  const inputDir = path.join(process.cwd(), "video-engine", "input");

  // Curăță folderul input
  if (fs.existsSync(inputDir)) {
    fs.readdirSync(inputDir).forEach(f =>
      fs.unlinkSync(path.join(inputDir, f))
    );
  } else {
    fs.mkdirSync(inputDir, { recursive: true });
  }

  // Salvează imaginile ca 1.jpg, 2.jpg...
  let index = 1;
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(
      path.join(inputDir, `${index}.jpg`),
      buffer
    );
    index++;
  }

  return NextResponse.json({ success: true });
}
