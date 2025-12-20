import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { verifyOtp } from "@/lib/otp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone, otp ,role} = await req.json();

  if (!verifyOtp(otp)) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOneAndUpdate(
    { phone },
    { isVerified: true },
    { new: true }
  );

  
  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  const token = signToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return NextResponse.json({
    success: true,
    token,
    role: user.role,
    userId: user._id.toString(), // 🔥 IMPORTANT
  });

}
