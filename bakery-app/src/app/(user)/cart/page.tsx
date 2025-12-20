"use client";

import { useState } from "react";
import UserNavbar from "../navbar/UserNavbar";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";

export default function CartPage() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  return (
    <>
      <UserNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
                >
                  <img
                    src={item.productId.image}
                    className="h-20 w-20 object-cover rounded-lg"
                    alt={item.productId.name}
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.productId.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.productId.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-pink-600">
                    ₹{item.productId.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-xl font-bold">
                Total: ₹{total}
              </p>

              <button
                onClick={() => setOpen(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>

      {open && <CheckoutModal total={total} onClose={() => setOpen(false)} />}
    </>
  );
}
