"use client";

import { useState } from "react";

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
          <input
            className="form-input"
            placeholder="Item name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            className="form-input"
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="form-input"
            placeholder="Category (Cake, Bread, Pastry)"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            type="number"
            className="form-input"
            placeholder="Price"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

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
