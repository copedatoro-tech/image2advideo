import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      message: "Render started successfully",
      payload: body,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Render request failed",
      },
      { status: 500 }
    );
  }
}
