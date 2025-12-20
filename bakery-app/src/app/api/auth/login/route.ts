import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone } = await req.json();

  await connectDB();

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  return NextResponse.json({
    success: true,
    message: "OTP sent (DEV MODE)",
  });
}
