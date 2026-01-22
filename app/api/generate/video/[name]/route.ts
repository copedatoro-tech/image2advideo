import { NextRequest, NextResponse } from "next/server";

type Params = {
  name: string;
};

export async function GET(
  request: NextRequest,
  context: { params: Params }
) {
  try {
    const { name } = context.params;

    return NextResponse.json({
      success: true,
      message: "Video generation endpoint working",
      videoName: name,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
