"use client";
import { useEffect, useState } from "react";
import UserNavbar from "../navbar/UserNavbar";
import ProductModal from "./ProductModal";
import { Star } from 'lucide-react';
import bread from "@/constants/breads.png"
// import catSpecials from '@/constants/cat-specials.png';
import catDonuts from '@/constants/cat-donut.png';
import catCookies from '@/constants/cat-cookies.png';
import catCakes from '@/constants/cat-cake.png';
import catPastry from '@/constants/cat-pastry.png';
import catBreads from '@/constants/cat-breads.png';

// Create a mapping object
const categoryImages: Record<string, string> = {
  // "Specials": catSpecials,
  "Donuts": catDonuts.src,
  "Cookies": catCookies.src,
  "Cakes": catCakes.src,
  "Pastry": catPastry.src,
  "Breads": catBreads.src,
  // Add more categories if PRODUCT_CATEGORIES has extra ones
};

import { PRODUCT_CATEGORIES } from "@/constants/productCategories"

const categories = PRODUCT_CATEGORIES;

export default function UserDashboard() {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, any[]>>({});
  ;
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/products")
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.products.reduce(
          (acc: Record<string, any[]>, product: any) => {
            if (!acc[product.category]) {
              acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
          },
          {}
        );

        setProductsByCategory(grouped);
      });
  }, []);


  return (
    <>
      <UserNavbar />

      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <div className="dashboard-hero-text">
            <h1 className="dashboard-hero-title">
              Freshly Baked Delights,<br />Every Day
            </h1>
            <p className="dashboard-hero-subtitle">
              Discover the magic of freshly baked goodness. Handcrafted with love and the finest ingredients. Delight in every bite.
            </p>
            <button className="dashboard-hero-btn">
              Shop Now
            </button>
          </div>
          <img
            src={bread.src}
            alt="Fresh breads"
            className="dashboard-hero-img"
          />
        </div>
      </div>

      <div className="dashboard-categories">
        <h2 className="dashboard-categories-title">Categories</h2>
        <div className="dashboard-categories-grid">
          {PRODUCT_CATEGORIES.map((cat) => (
            <div
              key={cat}
              className="dashboard-category-item"
              style={{ cursor: "pointer" }} // Makes it clear it's clickable
            >
              <div className={`dashboard-category-icon-wrapper "active" : ""}`}>
                <img
                  src={categoryImages[cat]}
                  alt={cat}
                  className="dashboard-category-icon"
                />
              </div>
              <p className="dashboard-category-label">{cat}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {PRODUCT_CATEGORIES.map((category) => {
          const products = productsByCategory[category] || [];

          if (products.length === 0) return null;

          return (
            <div key={category} className="mb-16">
              {/* Category Title */}
              <h2 className="text-3xl font-bold text-[#4A2C0B] mb-6 pl-2">
                {category}
              </h2>

              {/* Horizontal Scrollable Row */}
              <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
                {products.map((product) => {
                  const rating = product.rating || 4.5;
                  const fullStars = Math.floor(rating);
                  const hasHalfStar = rating % 1 >= 0.5;
                  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                  return (
                    <div
                      key={product._id}
                      onClick={() => setSelectedProduct(product)}
                      className="flex-shrink-0 w-60 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    >
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-52 object-cover"
                      />

                      {/* Product Info */}
                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-[#4A2C0B] mb-2">
                          {product.name}
                        </h3>

                        <p className="text-gray-600 text-base mb-4">
                          ₹{product.price} <span className="text-gray-500">({product.unit || '500gm'})</span>
                        </p>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1">
                          {/* Filled Stars */}
                          {[...Array(fullStars)].map((_, i) => (
                            <Star
                              key={`full-${i}`}
                              size={20}
                              fill="#f59e0b"
                              className="text-amber-500"
                            />
                          ))}

                          {/* Half Star */}
                          {hasHalfStar && (
                            <div className="relative">
                              <Star size={20} className="text-gray-300" />
                              <Star
                                size={20}
                                fill="#f59e0b"
                                className="text-amber-500 absolute top-0 left-0 overflow-hidden w-10 clip-half"
                                style={{ clipPath: 'inset(0 50% 0 0)' }}
                              />
                            </div>
                          )}

                          {/* Empty Stars */}
                          {[...Array(emptyStars)].map((_, i) => (
                            <Star
                              key={`empty-${i}`}
                              size={20}
                              className="text-gray-300"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional: Hide scrollbar on webkit browsers */}
      <style jsx>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>



      {/* Your existing products grid - enhanced */}
      {/* <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="dashboard-products-grid">
          {products.map((product) => (
            <div key={product._id} className="dashboard-product-card" onClick={() => setSelectedProduct(product)}>
              <img src={product.image} alt={product.name} className="dashboard-product-img" />
              <div className="dashboard-product-info">
                <h3 className="dashboard-product-name">{product.name}</h3>
                <p className="dashboard-product-category">{product.category}</p>
                <p className="dashboard-product-price">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
