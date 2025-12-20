"use client";
import { X, CreditCard, ShoppingBag } from "lucide-react";
import { useState } from "react";

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

    const handleSubmit = async () => {
  if (!form.name || !form.phone || !form.address) {
    alert("Please fill all required fields");
    return;
  }

  const userId = localStorage.getItem("userId");

  const res = await fetch("/api/user/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      customer: form,
      total
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Order placed successfully 🎉");
    onClose();
  }
};


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">
                    Checkout 🧾
                </h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none"
                        placeholder="John Doe"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none"
                        placeholder="+91 98765 43210"
                        onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none"
                        placeholder="example@email.com"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address
                    </label>
                    <textarea
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none resize-none h-28"
                        placeholder="House no., Street, Area, City, PIN Code"
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                </div>

                {/* Payment Method */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                    </label>
                    <div className="relative">
                        <select
                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none appearance-none pr-10"
                            value={form.paymentMethod}
                            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        >
                            <option value="ONLINE">Online Payment (UPI / Card)</option>
                            {/* Add more options later if needed */}
                        </select>
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                </div>
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">Total Amount</p>
        <p className="text-2xl font-bold text-rose-600">
          ₹{total}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onClose}
          className="px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3"
        >
          Pay & Place Order
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
    </div>

            </div>




        </div>

    );
}
