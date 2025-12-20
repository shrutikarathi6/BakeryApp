"use client";
import AddProductModal from "./AddProductModal";
import AdminNavbar from "../navbar/AdminNavbar";

import { useState } from "react";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <AdminNavbar />
    <div className="p-6 lg:p-8"> 

    {/* Add Item Button */}
    <button
      onClick={() => setOpen(true)}
      className="group relative inline-flex items-center gap-3 px-6 py-3.5 
                 bg-gradient-to-r from-indigo-600 to-purple-600 
                 hover:from-indigo-700 hover:to-purple-700 
                 text-white font-semibold rounded-xl 
                 shadow-lg hover:shadow-xl 
                 transform hover:-translate-y-0.5 
                 transition-all duration-300 ease-out
                 overflow-hidden"
    >
      {/* Plus Icon */}
      <svg
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>

      <span>Add Bakery Item</span>

      {/* Shine Effect */}
      <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
    </button>
  </div>

  {/* Modal */}
  {open && <AddProductModal onClose={() => setOpen(false)} />}

    </>
  );
}
