import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "users.json");

function readUsers() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ active: false });
  }

  const users = readUsers();

  return NextResponse.json({
    active: users[userId] === true,
  });
}
