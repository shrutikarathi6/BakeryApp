"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

  // ✅ Read localStorage ONLY on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      if (id) setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch("/api/user/cart/get", {
      headers: { "x-user-id": userId },
    })
      .then((res) => res.json())
      .then((data) => setCart(data.items));
  }, [userId]);

  const addToCart = async (productId: string) => {
    await fetch("/api/user/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });

    setCart((prev) => {
      const item = prev.find(
        (p: any) => p.productId._id === productId
      );

      if (item) {
        return prev.map((p: any) =>
          p.productId._id === productId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { productId: { _id: productId }, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
