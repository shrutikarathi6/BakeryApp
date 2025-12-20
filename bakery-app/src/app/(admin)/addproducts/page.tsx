"use client";
import AddProductModal from "./AddProductModal";

import { useState } from "react";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard 🛡️
      </h1>

      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        + Add Bakery Item
      </button>

      {open && <AddProductModal onClose={() => setOpen(false)} />}
    </div>
  );
}
