// src/components/HomePage.jsx

import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "./CartContext";
import { useOrder } from "./OrderContext";
import searchIcon from "../assets/img/search.svg";
import { useDishes } from "./DishContext";

const HomePage = ({ onViewOrder, showCart }) => {
  const { dishes, categories } = useDishes();
  const { addToCart, cartItems, count } = useCart();
  const { orderType, setOrderType } = useOrder();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState({});

  useEffect(() => {
    const initialSizes = Object.fromEntries(dishes.map(d => [d.id, "M"]));
    setSelectedSize(initialSizes);
  }, [dishes]);

  const handleSizeChange = (id, size) =>
    setSelectedSize(prev => ({ ...prev, [id]: size }));

  const filteredDishes = dishes.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const visibleDishes = filteredDishes.filter((dish) => {
    if (activeCategory === "all") return true;
    if (!Array.isArray(dish.categoryIds)) return false;
    return dish.categoryIds.includes(activeCategory);
  });

  const selectedSizePrize = (dish) => {
    const size = selectedSize[dish.id];
    if (!dish.price || dish.price[size] == null || isNaN(dish.price[size])) {
      return 0;
    }

    return Number(dish.price[size]);
  };

  const isDishInCart = (id, size) => {
    return cartItems.some(item => item.id === id && item.size === size);
  };

  const getCartQtyForDish = (id, size) => {
    return cartItems
      .filter(item => item.id === id && item.size === size)
      .reduce((total, item) => total + item.qty, 0);
  };


  return (
    <div className="h-screen bg-[#252836] text-white p-3 sm:p-6 md:pl-10 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between font-barlow">
        <div>
          <h1 className="text-2xl font-bold">Chef Kitchen</h1>
          <p className="text-[#E0E6E9] text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="relative">
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search for food, coffee, etc."
            className="w-full sm:w-72 rounded-xl bg-[#252836] border border-[#393C49] pl-10 pr-4 py-2 text-sm"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <img src={searchIcon} alt="search" />
          </span>
        </div>
      </div>

      {/* Dynamic Categories */}
      <div className="overflow-x-auto no-scrollbar">
        <nav className="flex mt-6 border-b border-[#393C49] gap-6">

          {/* ALL */}
          <button
            onClick={() => setActiveCategory("all")}
            className={`pb-4 shrink-0 transition px-3 ${activeCategory === "all"
              ? "border-b-2 border-[#F99147] text-[#F99147]"
              : "hover:border-b"
              }`}
          >
            All
          </button>

          {/* Loaded Categories */}
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`pb-4 shrink-0 transition ${activeCategory === cat.id
                ? "border-b-2 border-[#F99147] text-[#F99147]"
                : "hover:border-b"
                }`}
            >
              {cat.name}
            </button>
          ))}

        </nav>
      </div>

      {/* Choose Dishes */}
      <div className="flex items-center justify-between mt-1">
        <h2 className="text-xl font-semibold md:pl-2">Choose Dishes</h2>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#1F1D2B] border border-[#393C49] px-4 py-2 rounded-xl text-sm text-gray-300"
          >
            {orderType}
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""
                }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#1F1D2B] border border-[#393C49] rounded-xl shadow-lg z-10">
              {["Dine In", "Take Away", "Delivery"].map(type => (
                <button
                  key={type}
                  onClick={() => (setOrderType(type), setIsOpen(false))}
                  className={`w-full text-left px-4 py-2 text-sm ${orderType === type ? "text-orange-400" : "text-gray-300"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dish Cards */}
      <div className="mt-1 flex-1 overflow-y-auto pr-2 no-scrollbar">
        <div
          className={`grid grid-cols-2 gap-4 sm:gap-6 ${showCart
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
        >
          {visibleDishes.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">No dishes found</p>
          ) : (
            visibleDishes.map(item => (
              <div
                key={item.id}
                className="relative flex items-center flex-col rounded-2xl p-4 text-center bg-[#1F1D2B] mt-16"
              >
                <img
                  src={item.img}
                  className="absolute -top-16 mx-auto h-36 sm:h-44 object-cover rounded-full border-4 border-[#1F1D2B]"
                />

                <h3 className="mt-20 font-medium pt-5">{item.name}</h3>
                <p className="text-green-400">
                  {selectedSizePrize(item).toFixed(2)} AED
                </p>
                <p className="text-gray-400 text-sm">{item.bowls} Bowls available</p>
                {item.bowls < 5 && item.bowls > 0 && (
                  <p className="text-sm text-red-500 font-semibold">! Low Stock</p>
                )}

                {/* S M L */}
                <div className="flex gap-2 justify-center mt-4">
                  {["S", "M", "L"].map(size => {
                    const isSelected = selectedSize[item.id] === size;
                    const isInCart = isDishInCart(item.id, size);

                    return (
                      <button
                        key={size}
                        disabled={!item.bowls}
                        onClick={() => handleSizeChange(item.id, size)}
                        className={`px-3 py-1 rounded-lg border text-sm transition 
                        ${!item.bowls ? "opacity-40 cursor-not-allowed" : ""}
                        ${isInCart
                            ? "bg-green-500 border-green-500 text-white"
                            : isSelected
                              ? "bg-[#F99147] border-[#F99147]"
                              : "border-[#3a405a]"
                          }
      `}
                      >
                        {size}
                      </button>
                    );

                  })}
                </div>

                {/* Add to cart */}
                <button
                  disabled={getCartQtyForDish(item.id, selectedSize[item.id]) >= item.bowls}
                  onClick={() => {
                    const currentQty = getCartQtyForDish(item.id, selectedSize[item.id]);

                    if (currentQty >= item.bowls) {
                      alert("Not enough stock!");
                      return;
                    }

                    addToCart(
                      { ...item, price: selectedSizePrize(item) },
                      selectedSize[item.id]
                    );
                  }}
                  className={`mt-3 w-full py-2 rounded-lg font-semibold transition active:scale-97 ${item.bowls
                      ? "bg-[#F99147] hover:opacity-90"
                      : "bg-[#393C49]"
                    }`}
                >
                  {getCartQtyForDish(item.id, selectedSize[item.id]) >= item.bowls
                    ? "Out of Stock"
                    : "Add to Order"}
                </button>

              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={onViewOrder}
        className="fixed bottom-16 md:bottom-10 right-5 md:right-10 bg-[#F99147] px-4 py-4 rounded-full shadow-lg hover:opacity-93"
      >
        <FiShoppingCart className="text-white text-2xl" />
        {count > 0 && (
          <span className="absolute -top-0 -right-0 bg-orange-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {count}
          </span>
        )}
      </button>
    </div>
  );
};

export default HomePage;
