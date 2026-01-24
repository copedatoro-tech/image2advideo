// app/api/generate-video/route.ts

import { NextResponse } from 'next/server';
import { generateVideo } from 'video-engine/render'; // presupunem că ai un modul pentru procesul de generare video
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json(); // presupunem că primim sessionId de la client

    // Logica de validare a sesiunii Stripe, dacă este necesar

    // Lansează procesul de generare video cu AI
    const videoPath = await generateVideo(sessionId);

    // Salvează video-ul în public/videos/
    const outputPath = path.join(process.cwd(), 'public/videos', videoPath);
    fs.writeFileSync(outputPath, videoPath); // salvați fișierul generat

    // Răspunde cu calea video-ului
    return NextResponse.json({ videoPath });
  } catch (error) {
    console.error('Eroare la generarea video-ului:', error);
    return NextResponse.json({ error: 'A apărut o eroare la generarea video-ului.' }, { status: 500 });
  }
}
