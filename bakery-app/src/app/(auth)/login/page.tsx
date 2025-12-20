"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type Role = "USER" | "CHEF" | "ADMIN";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("USER");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    setError("");

    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, role }),
    });

    setStep("OTP");
  };

  const verifyOtp = async () => {
    // if (otp !== "123456") {
    //   setError("Invalid OTP");
    //   return;
    // }

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp, role }),
    });
 // Debugging line

    const data = await res.json();
    

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // ✅ FIX
      localStorage.setItem("role", data.role);
      if (role === "CHEF") router.push("/chefdashboard");
      else if (role === "ADMIN") router.push("/admindashboard");
      else router.push("/dashboard");
    }
  };

  return (
    <>
      <Navbar role={role} setRole={setRole} />

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-rose-100 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {role === "USER" ? "Customer" : role === "CHEF" ? "Chef" : "Admin"} Login
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Secure login using phone number & OTP
              </p>
            </div>

            {/* Phone Input */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none text-lg"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // optional: only numbers
                  disabled={step === "OTP"}
                />
              </div>
            </div>

            {/* OTP Input */}
            {step === "OTP" && (
              <div className="mt-6 animate-fadeIn">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  One-Time Password
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none text-center text-2xl tracking-widest font-mono"
                  placeholder="••••••"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                />
                <p className="text-xs text-gray-500 text-center mt-3">
                  Check your SMS for the 6-digit code
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center animate-shake">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={step === "PHONE" ? sendOtp : verifyOtp}
              className="w-full mt-8 py-4 rounded-xl font-semibold text-white text-lg tracking-wide
                   bg-gradient-to-r from-rose-500 to-pink-600 
                   hover:from-rose-600 hover:to-pink-700 
                   shadow-lg hover:shadow-xl 
                   transform hover:-translate-y-0.5 
                   transition-all duration-300"
            >
              {step === "PHONE" ? "Send OTP" : "Verify OTP"}
            </button>

            {/* Footer Hint */}
            <p className="text-center text-xs text-gray-400 mt-6">
              Powered by Sweet Bliss Bakery 🍰
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
