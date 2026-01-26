import { NextResponse } from "next/server";

const JOBS: Record<string, { status: string }> = {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ status: "processing" });
  }

  return NextResponse.json(JOBS[id] ?? { status: "processing" });
}
