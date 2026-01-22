import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  const filePath = path.join(
    process.cwd(),
    "video-engine/output",
    params.name
  );

  const stream = fs.createReadStream(filePath);

  return new Response(stream as any, {
    headers: {
      "Content-Type": "video/mp4",
    },
  });
}
