"use client";

import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/constants/productCategories"

export default function AddProductModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          Add Bakery Item
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              placeholder="e.g. Chocolate Truffle Cake"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none resize-none h-24"
              placeholder="A rich, moist chocolate cake topped with smooth truffle frosting..."
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Category */}
         <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Category
  </label>

  <select
    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200
      focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
      transition-all duration-300 outline-none bg-white"
    value={form.category}
    onChange={(e) =>
      setForm({ ...form, category: e.target.value })
    }
  >
    <option value="">Select category</option>

    {PRODUCT_CATEGORIES.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
              placeholder="e.g. 499"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImage(e.target.files[0])
            }
          />
          
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
