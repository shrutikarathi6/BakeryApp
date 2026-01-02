"use client";

import { useState, useEffect } from "react";
import UserNavbar from "../navbar/UserNavbar";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";
import { ShoppingBag, Package } from "lucide-react";
import breads from "@/constants/breads.png"

export default function CartPage() {
  const { cart } = useCart(); // Assuming your context has a refreshCart function
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   refreshCart(); 
  // }, [refreshCart]);

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );



  return (
    <>
      <UserNavbar />

      {/* Warm bakery background */}
      <div
        className="min-h-screen bg-[#FAF7F2] py-6 px-4"
        style={{
          backgroundImage: "url('/cart-bg.jpg')", // Optional: add a cozy bakery image in public/
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#4A2C0B] text-center mb-10 flex items-center justify-center gap-4">
            <ShoppingBag size={40} className="text-[#D2691E]" />
            Your Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
              <img
                src={breads.src} // Optional cute illustration
                alt="Empty Cart"
                className="w-64 mx-auto mb-8 opacity-80"
              />
              <p className="text-2xl text-[#6D4C41] font-medium">Your cart is empty</p>
              <p className="text-[#8B4513] mt-4">Add some delicious treats to get started! ☕🍰</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div
                    key={`${item.product._id}-${index}`}
                    className="flex items-center gap-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D2691E]/20"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-28 w-28 object-cover rounded-xl shadow-md"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#4A2C0B]">
                        {item.product.name}
                      </h3>
                      <p className="text-[#6D4C41] mt-1">
                        ₹{item.product.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="text-2xl font-bold text-[#8B4513]">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>


              {/* Total & Checkout */}
              <div className="mt-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-[#D2691E]/30">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-lg text-[#6D4C41]">Total Amount</p>
                    <p className="text-4xl font-bold text-[#8B4513]">₹{total}</p>
                  </div>

                  <button
                    onClick={() => setOpen(true)}
                    className="group relative px-10 py-5 bg-gradient-to-r from-[#D2691E] to-[#8B4513] 
                               hover:from-[#A0522D] hover:to-[#6d3f0b] text-white text-xl font-bold 
                               rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                               transition-all duration-400 flex items-center gap-4 overflow-hidden"
                  >
                    <Package size={28} className="group-hover:scale-110 transition-transform" />
                    Place Order
                    <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 
                                     group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {open && <CheckoutModal total={total} onClose={() => setOpen(false)} />}
    </>
  );
}