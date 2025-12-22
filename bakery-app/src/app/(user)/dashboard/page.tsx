"use client";
import { useEffect, useState } from "react";
import UserNavbar from "../navbar/UserNavbar";
import ProductModal from "./ProductModal";
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
        onClick={() => setActiveCategory(cat)}
        style={{ cursor: "pointer" }} // Makes it clear it's clickable
      >
        <div className={`dashboard-category-icon-wrapper ${activeCategory === cat ? "active" : ""}`}>
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


      {/* Your existing products grid - enhanced */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
