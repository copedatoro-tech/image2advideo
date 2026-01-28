import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { sessionId } = body;

  console.log("Trimitem email pentru sesiunea:", sessionId);

  // Aici vei integra serviciul real de email (SendGrid, Resend, Mailgun etc.)

  return NextResponse.json({ success: true });
}
