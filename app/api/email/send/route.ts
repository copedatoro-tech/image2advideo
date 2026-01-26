import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { sessionId, videoPath } = await req.json();

  const absolutePath = path.join(process.cwd(), "public", videoPath);
  const fileStats = fs.statSync(absolutePath);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const downloadLink = `https://siteul-tau.ro/download/${sessionId}`;

  const attachments =
    fileStats.size < 20 * 1024 * 1024
      ? [
          {
            filename: "video.mp4",
            path: absolutePath,
          },
        ]
      : [];

  await transporter.sendMail({
    from: `"Image2AdVideo" <${process.env.EMAIL_USER}>`,
    to: "client@email.com",
    subject: "Videoclipul tău este gata",
    html: `
      <p>Videoclipul tău este gata.</p>
      <p>Link descărcare (valabil 72h):</p>
      <a href="${downloadLink}">${downloadLink}</a>
    `,
    attachments,
  });

  return NextResponse.json({ success: true });
}
