"use client";
import { X, ShoppingCart } from "lucide-react";
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
   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-rose-100">
    {/* Close Button (top right) */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-rose-100 transition-colors duration-200 z-10"
    >
      <X className="w-5 h-5 text-gray-600" />
    </button>

    {/* Product Image */}
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="h-72 w-full object-cover"
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>

    {/* Content */}
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800">
        {product.name}
      </h2>

      {/* Optional category tag */}
      {product.category && (
        <span className="inline-block mt-3 px-4 py-1 bg-rose-100 text-rose-700 text-sm font-medium rounded-full">
          {product.category}
        </span>
      )}

      <p className="text-gray-600 mt-4 leading-relaxed">
        {product.description}
      </p>

      {/* Price */}
      <div className="mt-6">
        <p className="text-3xl font-bold text-rose-600">
          ₹{product.price}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 mt-8">
        <button
          onClick={onClose}
          className="flex-1 px-6 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300"
        >
          Close
        </button>

        <button
           onClick={() => addToCart(product._id)}
          className="flex-1 px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>
  );
}
