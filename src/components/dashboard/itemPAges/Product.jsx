import React, { useState } from "react";
import { useDishes } from "../../DishContext";
import AddProductModal from "./AddProduct";

const Product = () => {
  const { dishes, deleteDish, categories } = useDishes();

  const [showModal, setShowModal] = useState(false);
  const [editDish, setEditDish] = useState(null);

  const openAddModal = () => {
    setEditDish(null);
    setShowModal(true);
  };

  const openEditModal = (dish) => {
    setEditDish(dish);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditDish(null);
  };

  // Convert categoryIds → names safely
  const getCategoryNames = (dish) => {
    if (!Array.isArray(dish.categoryIds)) return "—";

    const names = dish.categoryIds
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean);

    return names.length ? names.join(", ") : "—";
  };

  return (
    <div className="flex flex-col px-6 pt-6 pb-2 w-full">

      {showModal && (
        <AddProductModal onClose={closeModal} editDish={editDish} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-gray-800 text-2xl font-semibold">Products</h1>

        <button
          onClick={openAddModal}
          className="bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-700 active:scale-95"
        >
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm font-semibold hidden md:table-header-group">
            <tr>
              <th className="p-4 w-24">Image</th>
              <th className="p-4 w-64">Name</th>
              <th className="p-4 w-40">Category</th>
              <th className="p-4 w-20">Stock</th>
              <th className="p-4 w-40">Sizes</th>
              <th className="p-4 w-32">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">

            {dishes.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No Products Added Yet
                </td>
              </tr>
            )}

            {dishes.map((dish) => (
              <tr key={dish.id} className="border-t border-gray-100 hover:bg-gray-50
              grid grid-cols-1 md:table-row md:grid-cols-none ">

                {/* Image */}
                <td className="p-4 flex items-center gap-4 md:table-cell md:flex-row">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <span className="font-medium md:hidden">{dish.name}</span>
                </td>

                {/* Name */}
                <td className="p-4 font-medium hidden md:table-cell">{dish.name}</td>

                {/* Category Names */}
                <td className="p-4">
                  <span className="md:hidden font-bold pr-2">Category :</span>
                  {getCategoryNames(dish)}</td>

                {/* Stock */}
                <td className="p-4">
                  <span className="md:hidden font-bold pr-2">Size :</span>
                  {dish.bowls}</td>

                {/* Prices */}
                <td className="p-4 flex flex-wrap gap-2">
                  {dish.price &&
                    Object.entries(dish.price).map(([size, amount]) => (
                      <span
                        key={size}
                        className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full"
                      >
                        {size} = {amount}
                      </span>
                    ))}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditModal(dish)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDish(dish.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Product;
