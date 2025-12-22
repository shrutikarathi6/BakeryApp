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
    <div className="login-page">
  <div className="login-container">
    <div className="login-card">
      {/* Decorative bakery images */}
      <img src="/pastry1.jpg" alt="" className="login-decor login-decor-left" />   {/* Place images in public/ */}
      <img src="/pastry2.jpg" alt="" className="login-decor login-decor-right" />

      {/* Header */}
      <div className="login-header">
        <h2 className="login-title">
          {role === "USER" ? "Customer" : role === "CHEF" ? "Chef" : "Admin"} Login
        </h2>
        <p className="login-subtitle">Secure login using phone number & OTP</p>
      </div>

      {/* Phone Input */}
      <div className="login-form-group">
        <label className="login-label">Phone Number</label>
        <div className="login-input-wrapper">
          <span className="login-input-prefix">+91</span>
          <input
            type="tel"
            className="login-input"
            placeholder="Enter 10-digit number"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            disabled={step === "OTP"}
          />
        </div>
      </div>

      {/* OTP Input */}
      {step === "OTP" && (
        <div className="login-form-group">
          <label className="login-label">One-Time Password</label>
          <input
            type="text"
            className="login-input login-otp-input"
            placeholder="••••••"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />
          <p className="text-xs text-center mt-2 text-gray-500">
            Check your SMS for the 6-digit code
          </p>
        </div>
      )}

      {/* Error */}
      {error && <div className="login-error">{error}</div>}

      {/* Button */}
      <button
        onClick={step === "PHONE" ? sendOtp : verifyOtp}
        className="login-button"
      >
        {step === "PHONE" ? "Send OTP" : "Verify OTP"}
      </button>

      {/* Footer */}
      <p className="login-footer">
        Powered by KABRA'S BAKE WORLD ☕🍰
      </p>
    </div>
  </div>
</div>
    </>
  );
}
