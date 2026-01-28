import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
  }

  const jobDir = path.join("/tmp/jobs", jobId);
  const statusFile = path.join(jobDir, "status.json");

  if (!fs.existsSync(statusFile)) {
    return NextResponse.json({ status: "processing" });
  }

  const status = JSON.parse(fs.readFileSync(statusFile, "utf8"));

  return NextResponse.json(status);
}
