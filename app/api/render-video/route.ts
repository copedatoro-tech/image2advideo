import { generateVideo } from "@/lib/video-engine/render";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await generateVideo(body);
  return Response.json(result);
}
