"use client";
import AddProductModal from "./AddProductModal";
import AdminNavbar from "../navbar/AdminNavbar";
import { Plus } from "lucide-react"; // For a nice plus icon
import { useState } from "react";
import bread from "@/constants/breads.png";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminNavbar />

      {/* Full-screen centered layout with subtle bakery background */}
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12"
        style={{ 
          backgroundImage: bread.src, 
          backgroundColor: "#FAF7F2" 
        }}
      >
        <div className="text-center">
          {/* Welcome Text */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#4A2C0B] mb-4">
            Welcome to Admin Panel
          </h1>
          <p className="text-lg text-[#6D4C41] mb-12 max-w-2xl mx-auto">
            Manage your bakery items effortlessly. Add new delicious creations to delight your customers.
          </p>

          {/* Centered Add Button */}
          <button
            onClick={() => setOpen(true)}
            className="group relative inline-flex items-center gap-4 px-8 py-5 
                       bg-gradient-to-r from-[#D2691E] to-[#8B4513] 
                       hover:from-[#A0522D] hover:to-[#6d3f0b] 
                       text-white text-xl font-semibold rounded-2xl 
                       shadow-2xl hover:shadow-3xl 
                       transform hover:-translate-y-1 
                       transition-all duration-500 ease-out
                       overflow-hidden"
          >
            <Plus size={32} className="stroke-white" />
            <span>Add Bakery Item</span>

            {/* Shine Effect on Hover */}
            <span className="absolute inset-0 -translate-x-full bg-white/30 skew-x-12 
                             group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && <AddProductModal onClose={() => setOpen(false)} />}
    </>
  );
}