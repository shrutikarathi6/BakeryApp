"use client";

import { usePathname, useRouter } from "next/navigation";
import { Cake, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function UserNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Cake className="w-10 h-10 text-rose-600 drop-shadow-md" strokeWidth={2} />

            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Shrutika's
              </span>{" "}
              <span className="text-gray-800">Bakery</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-10">
            <button
              onClick={() => router.push("/dashboard")}
              className={`
            relative px-4 py-2 text-sm font-medium uppercase tracking-wider rounded-lg
            transition-all duration-300
            ${pathname === "/dashboard"
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                }
          `}
            >
              Available Products

              {/* Animated Active Indicator */}
              <span
                className={`
              absolute bottom-0 left-0 w-full h-1 bg-rose-500 rounded-full
              transition-transform duration-300 origin-left
              ${pathname === "/dashboard" ? "scale-x-100" : "scale-x-0"}
            `}
              />
            </button>

            <button
              onClick={() => router.push("/cart")}
              className={`
            relative px-4 py-2 text-sm font-medium uppercase tracking-wider rounded-lg flex items-center gap-2
            transition-all duration-300
            ${pathname === "/cart"
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                }
          `}
            >
              Cart
              <span className="relative">
                🛒
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 rounded-full">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </span>

              <span
                className={`
              absolute bottom-0 left-0 w-full h-1 bg-rose-500 rounded-full
              transition-transform duration-300 origin-left
              ${pathname === "/cart" ? "scale-x-100" : "scale-x-0"}
            `}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
