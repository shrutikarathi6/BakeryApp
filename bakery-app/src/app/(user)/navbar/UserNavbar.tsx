"use client";

import { usePathname, useRouter } from "next/navigation";
import { Cake, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/constants/logo.jpeg"


export default function UserNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Logo & Brand */}
          <div className="navbar-logo">
            <img
              src={logo.src}
              alt="KABRA'S BAKE WORLD Logo"
              className="navbar-logo-img"
            />
          </div>

          {/* Navigation Links */}
          <div className="navbar-tabs">
            <button
              onClick={() => router.push("/dashboard")}
              className={`navbar-tab ${pathname === "/dashboard"} ? "active" : ""}`}
            >
              Available Products
              <span className="navbar-tab-indicator" />

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
