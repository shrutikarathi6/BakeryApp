import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { verifyOtp } from "@/lib/otp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone, otp } = await req.json();

  if (!verifyOtp(otp)) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOneAndUpdate(
    { phone },
    { isVerified: true },
    { new: true }
  );

  const token = signToken({ userId: user._id, role: user.role });

  return NextResponse.json({
    success: true,
    token,
    role: user.role,
  });
}
