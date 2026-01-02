"use client";

import { X, CreditCard, ShoppingBag, User, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import {useCart} from "@/context/CartContext";

export default function CheckoutModal({
  total,
  onClose,
}: {
  total: number;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "ONLINE",
  });

  const { cart,clearCart } = useCart();

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    const res = await fetch("/api/user/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart,
        customer: form,
        total,
      }),
    });

    const data = await res.json();

    if (data.success) {
      clearCart();
      alert("Order placed successfully 🎉");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-full my-8 border border-[#D2691E]/20">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/90 shadow-lg 
                     hover:bg-[#F5F0E6] hover:scale-110 transition-all duration-300 
                     border border-[#D2691E]/30 group"
        >
          <X className="w-5 h-5 text-[#8B4513] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header with Decorative Illustration */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/80 to-transparent" />
          <div className="flex items-center justify-center h-full">
            <ShoppingBag size={80} className="text-[#D2691E]/80" />
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 pb-8 -mt-10 relative z-10">
          <h2 className="text-3xl font-bold text-[#4A2C0B] text-center mb-8">
            Complete Your Order
          </h2>

          {/* Name */}
          <div className="relative mb-6">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D4C41]" />
            <input
              type="text"
              placeholder="Full Name *"
              className="w-full pl-12 pr-5 py-5 rounded-2xl border-2 border-[#D2691E]/30 
                         focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 
                         transition-all duration-300 outline-none text-[#4A2C0B] text-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="relative mb-6">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D4C41]" />
            <input
              type="tel"
              placeholder="Phone Number *"
              className="w-full pl-12 pr-5 py-5 rounded-2xl border-2 border-[#D2691E]/30 
                         focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 
                         transition-all duration-300 outline-none text-[#4A2C0B] text-lg"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
            />
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D4C41]" />
            <input
              type="email"
              placeholder="Email (optional)"
              className="w-full pl-12 pr-5 py-5 rounded-2xl border-2 border-[#D2691E]/30 
                         focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 
                         transition-all duration-300 outline-none text-[#4A2C0B] text-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Address */}
          <div className="relative mb-8">
            <MapPin className="absolute left-4 top-6 w-5 h-5 text-[#6D4C41]" />
            <textarea
              placeholder="Delivery Address *"
              rows={4}
              className="w-full pl-12 pr-5 pt-5 pb-4 rounded-2xl border-2 border-[#D2691E]/30 
                         focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 
                         transition-all duration-300 outline-none resize-none text-[#4A2C0B] text-lg"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          {/* Payment Method */}
          <div className="relative mb-10">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D4C41]" />
            <select
              className="w-full pl-12 pr-12 py-5 rounded-2xl border-2 border-[#D2691E]/30 
                         focus:border-[#D2691E] focus:ring-4 focus:ring-[#D2691E]/20 
                         transition-all duration-300 outline-none appearance-none text-[#4A2C0B] text-lg bg-white"
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            >
              <option value="ONLINE">Online Payment (UPI / Card)</option>
              <option value="COD">Cash on Delivery</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-[#6D4C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Total & Actions */}
          <div className="bg-[#F5F0E6]/80 rounded-2xl p-6 border border-[#D2691E]/30">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xl text-[#6D4C41]">Total Amount</p>
              <p className="text-4xl font-bold text-[#8B4513]">₹{total}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 border-2 border-[#D2691E]/50 text-[#8B4513] font-semibold rounded-2xl 
                           hover:bg-[#F5F0E6] hover:border-[#D2691E] transition-all duration-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#D2691E] to-[#8B4513] 
                           hover:from-[#A0522D] hover:to-[#6d3f0b] text-white font-bold rounded-2xl 
                           shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                           transition-all duration-400 flex items-center justify-center gap-3 
                           group overflow-hidden relative"
              >
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                <span>Pay & Place Order</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 
                                 group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}