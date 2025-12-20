"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const phone =
    typeof window !== "undefined"
      ? localStorage.getItem("phone")
      : null;

  useEffect(() => {
    if (!phone) router.push("/login");
  }, [phone, router]);

  const handleVerify = async () => {
    if (!otp) return alert("Enter OTP");

    setLoading(true);

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "CHEF") router.push("/chef/dashboard");
      else if (data.role === "ADMIN") router.push("/admin/dashboard");
      else router.push("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Verify OTP 🔐
        </h1>
        <p className="text-sm text-center text-gray-500 mt-1">
          Enter the 6-digit OTP sent to your phone
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            OTP
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full text-center tracking-widest text-lg rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="mt-4 text-xs text-center text-gray-400">
          DEV OTP: <span className="font-semibold">123456</span>
        </p>
      </div>
    </div>
  );
}
