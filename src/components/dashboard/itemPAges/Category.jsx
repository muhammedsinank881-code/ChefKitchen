// src/components/dashboard/itemPages/Category.jsx

import React, { useState } from "react";
import { useDishes } from "../../DishContext";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {
  const {
    dishes,
    categories,
    addCategory,
    editCategory,
    deleteCategory,
  } = useDishes();

  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const openAddModal = () => {
    setSelectedCat(null);
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    setSelectedCat(cat);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCat(null);
    setShowModal(false);
  };

  // ---------------------------------------------
  // SAFE category stats (supports old dish format)
  // ---------------------------------------------
  const categoryStats = categories.map((cat) => {
    const related = dishes.filter(
      (d) => Array.isArray(d.categoryIds) && d.categoryIds.includes(cat.id)
    );

    return {
      ...cat,
      products: related.length,
      stock: related.reduce((sum, d) => sum + (d.bowls || 0), 0),
    };
  });

  return (
    <div className="flex flex-col p-6 w-full">

      {/* Modal */}
      {showModal && (
        <AddCategoryModal
          onClose={closeModal}
          editCategory={selectedCat}
          onSubmit={(name) =>
            selectedCat
              ? editCategory(selectedCat.id, name)
              : addCategory(name)
          }
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-gray-800 text-2xl font-semibold">Categories</h1>

        <button
          onClick={openAddModal}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">

          <thead className="bg-gray-100 text-gray-600 text-sm font-semibold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Products</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">

            {categoryStats.map((cat) => (
              <tr
                key={cat.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{cat.name}</td>
                <td className="p-4">{cat.products}</td>
                <td className="p-4">{cat.stock}</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Category;
