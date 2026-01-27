import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, videoUrl } = await req.json();

    if (!email || !videoUrl) {
      return NextResponse.json(
        { error: "Missing email or videoUrl" },
        { status: 400 }
      );
    }

    /**
     * 📧 Transporter email
     * Recomand Gmail pentru MVP
     */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const fullVideoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${videoUrl}`;

    await transporter.sendMail({
      from: `"Image2AdVideo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎬 Video-ul tău promoțional este gata",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>Video-ul tău este gata 🎉</h2>
          <p>Mulțumim pentru comandă!</p>
          <p>Poți descărca videoclipul tău promoțional folosind linkul de mai jos:</p>
          <p>
            <a href="${fullVideoUrl}" target="_blank">
              👉 Descarcă video-ul
            </a>
          </p>
          <p><strong>⚠️ Linkul este valabil 72 de ore.</strong></p>
          <hr />
          <p style="font-size: 12px; color: #777">
            Image2AdVideo – AI Video Generator
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}
