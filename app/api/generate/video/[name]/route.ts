import { NextResponse } from "next/server";

type Params = {
  name: string;
};

export async function GET(
  request: Request,
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
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
