"use client";
import { useEffect, useState } from "react";
import UserNavbar from "../navbar/UserNavbar";
import ProductModal from "./ProductModal";

import { PRODUCT_CATEGORIES } from "@/constants/productCategories"

const categories = PRODUCT_CATEGORIES;

export default function UserDashboard() {
  const [activeCategory, setActiveCategory] = useState("Cake");
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/user/products?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [activeCategory]);

  return (
    <>
      <UserNavbar />

      <div className="max-w-7xl mx-auto p-6 lg:p-8">
  {/* Categories Filter */}
  <div className="flex flex-wrap gap-3 mb-10">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`
          px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider
          transition-all duration-300 transform hover:-translate-y-0.5
          shadow-md hover:shadow-lg
          ${activeCategory === cat
            ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-300"
            : "bg-white text-gray-700 border border-gray-200 hover:border-rose-300 hover:text-rose-600"
          }
        `}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* Products Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {products.map((product) => (
      <div
        key={product._id}
        onClick={() => setSelectedProduct(product)}
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Optional: show category subtly */}
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-2xl font-bold text-rose-600">
              ₹{product.price}
            </p>

            {/* Add to Cart Icon on Hover */}
            <div className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <div className="p-3 bg-rose-100 rounded-full">
                <svg
                  className="w-6 h-6 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Empty State (optional - you can add conditionally) */}
  {products.length === 0 && (
    <div className="text-center py-20">
      <p className="text-gray-500 text-lg">No products found in this category yet.</p>
      <p className="text-rose-600 mt-2">Check back soon for fresh delights! 🍰</p>
    </div>
  )}
</div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
