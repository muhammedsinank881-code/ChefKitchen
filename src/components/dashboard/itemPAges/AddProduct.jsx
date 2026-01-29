// src/components/dashboard/itemPages/AddProduct.jsx

import React, { useState, useEffect } from "react";
import { useDishes } from "../../DishContext";
import { v4 as uuidv4 } from "uuid";

const AddProductModal = ({ onClose, editDish }) => {
  const { addDish, updateDish, categories: categoryList } = useDishes();

  const isEdit = Boolean(editDish);

  const [name, setName] = useState("");
  const [bowls, setBowls] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [prices, setPrices] = useState({ S: "", M: "", L: "" });
  const [img, setImg] = useState("");

  // ----------------------------
  // LOAD EDIT DATA
  // ----------------------------
  useEffect(() => {
    if (isEdit) {
      setName(editDish.name || "");
      setBowls(editDish.bowls || "");
      setCategoryIds(Array.isArray(editDish.categoryIds) ? editDish.categoryIds : []);
      setPrices(editDish.price || { S: "", M: "", L: "" });
      setImg(editDish.img || "");
    }
  }, [isEdit, editDish]);

  // ----------------------------
  // CATEGORY TOGGLE
  // ----------------------------
  const toggleCategory = (id) => {
    setCategoryIds((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
    );
  };

  // ----------------------------
  // IMAGE COMPRESSION
  // ----------------------------
  const uploadImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const imgEl = new Image();
      imgEl.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const scale = MAX_WIDTH / imgEl.width;

        canvas.width = MAX_WIDTH;
        canvas.height = imgEl.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);

        const compressed = canvas.toDataURL("image/jpeg", 0.5);
        setImg(compressed);
      };
      imgEl.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  // ----------------------------
  // SUBMIT
  // ----------------------------
  const handleSubmit = () => {
    if (!name.trim()) return alert("Dish name is required");
    if (!img) return alert("Please upload a product image");

    const data = {
      id: isEdit ? editDish.id : uuidv4(),
      name,
      bowls: Number(bowls),
      categoryIds,
      img,
      price: {
        S: Number(prices.S) || 0,
        M: Number(prices.M) || 0,
        L: Number(prices.L) || 0,
      },
    };

    isEdit ? updateDish(editDish.id, data) : addDish(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-lg p-6 rounded-xl shadow-xl animate-fadeIn">

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        {/* Dish Name */}
        <div className="mb-3">
          <label className="font-medium">Dish Name</label>
          <input
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Eg: Chicken Biriyani"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="font-medium">Stock (Bowls)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Eg: 10"
            value={bowls}
            onChange={(e) => setBowls(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-3">
          <label className="font-medium">Categories</label>

          {categoryList.length === 0 && (
            <p className="text-sm text-red-500 mt-1">
              ⚠️ No categories found. Please add categories first.
            </p>
          )}

          <div className="flex flex-wrap gap-4 mt-2">
            {categoryList.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={categoryIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        {/* Prices */}
        <div className="mb-3">
          <label className="font-medium">Prices (S / M / L)</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {["S", "M", "L"].map((size) => (
              <input
                key={size}
                type="number"
                placeholder={`${size} Price`}
                className="w-full border rounded px-2 py-1"
                value={prices[size]}
                onChange={(e) =>
                  setPrices({ ...prices, [size]: e.target.value })
                }
              />
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1"
            onChange={uploadImage}
          />

          {img && (
            <img
              src={img}
              className="mt-3 w-24 h-24 rounded object-cover border"
              alt="Preview"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={handleSubmit}
          >
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductModal;
