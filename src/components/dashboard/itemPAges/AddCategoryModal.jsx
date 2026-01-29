// src/components/dashboard/itemPages/AddCategoryModal.jsx

import React, { useState, useEffect } from "react";

const AddCategoryModal = ({ onClose, editCategory, onSubmit }) => {
  const [name, setName] = useState("");

  // LOAD EXISTING CATEGORY FOR EDIT
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name || "");
    }
  }, [editCategory]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    onSubmit(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl animate-fadeIn">

        <h2 className="text-xl font-semibold mb-4">
          {editCategory ? "Edit Category" : "Add Category"}
        </h2>

        {/* NAME INPUT */}
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={handleSubmit}
          >
            {editCategory ? "Save" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCategoryModal;
