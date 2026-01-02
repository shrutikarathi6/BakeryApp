"use client";
import { X, ShoppingCart,Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

// const addToCart = useCart().addToCart;

export default function ProductModal({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {

  const { addToCart } = useCart();
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
  <div className="bg-white/95 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#D2691E]/20 
                  relative animate-in fade-in zoom-in-95 duration-300">
    
    {/* Close Button - Coffee Style */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/90 shadow-lg 
                 hover:bg-[#F5F0E6] hover:scale-110 transition-all duration-300 
                 border border-[#D2691E]/30 group"
    >
      <X className="w-5 h-5 text-[#8B4513] group-hover:rotate-90 transition-transform duration-300" />
    </button>

    {/* Hero Image with Warm Overlay */}
    <div className="relative h-80 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C0B]/70 via-transparent to-transparent" />
      
      {/* Floating Price Badge */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl border border-[#D2691E]/30">
        <p className="text-3xl font-bold text-[#8B4513]">
          ₹{product.price}
        </p>
        <p className="text-sm text-[#6D4C41] font-medium">{product.unit || "500gm"}</p>
      </div>
    </div>

    {/* Content */}
    <div className="p-8 pt-6">
      {/* Name + Rating */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-3xl font-bold text-[#4A2C0B] leading-tight">
          {product.name}
        </h2>
        
        {/* Optional Rating Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={i < 4 ? "#f59e0b" : "#e5e7eb"}
              className={i < 4 ? "text-amber-500" : "text-gray-300"}
            />
          ))}
        </div>
      </div>

      {/* Category Tag */}
      {product.category && (
        <span className="inline-block mt-2 px-5 py-2 bg-[#F5F0E6] text-[#8B4513] text-sm font-semibold rounded-full border border-[#D2691E]/40">
          {product.category}
        </span>
      )}

      {/* Description */}
      <p className="text-[#6D4C41] mt-5 leading-relaxed text-lg">
        {product.description || "Freshly baked with love using the finest ingredients. A perfect treat for any occasion!"}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={onClose}
          className="flex-1 px-6 py-4 border-2 border-[#D2691E]/50 text-[#8B4513] font-semibold rounded-2xl 
                     hover:bg-[#F5F0E6] hover:border-[#D2691E] transition-all duration-300"
        >
          Close
        </button>

        <button
          onClick={() =>{ addToCart(product), alert("Added to cart!")}}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-[#D2691E] to-[#8B4513] 
                     hover:from-[#A0522D] hover:to-[#6d3f0b] text-white font-bold rounded-2xl 
                     shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                     transition-all duration-400 flex items-center justify-center gap-3 
                     group overflow-hidden relative"
        >
          <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
          <span>Add to Cart</span>
          
          {/* Shine Effect */}
          <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 
                           group-hover:translate-x-full transition-transform duration-700" />
        </button>
      </div>
    </div>
  </div>
</div>
  );
}
