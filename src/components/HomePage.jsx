import React, { useState } from 'react'
import { FiShoppingCart } from "react-icons/fi";
import noodle from '../assets/mainPage/noodle.svg'
import images from '../assets/mainPage/images.svg'
import fryedRice from '../assets/mainPage/fried-rice.svg'
import img10 from '../assets/mainPage/img10.svg'
import noodleWithOmlet from '../assets/mainPage/noodle-with-omlet.svg'
import searchIcon from '../assets/img/search.svg'

const HomePage = ({ onViewOrder, onAddToCart, count, showCart, orderType, setOrderType, cartItems }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("today");


  const dishes = [
    { id: 1, name: "Healthy noodle with spinach leaf", img: noodle, price: 3.29, bowls: 22 },
    { id: 2, name: "Hot spicy fried rice with omelet", img: images, price: 3.29, bowls: 13 },
    { id: 3, name: "Spicy noodle with special omelette", img: fryedRice, price: 3.29, bowls: 17 },
    { id: 4, name: "Healthy noodle with spinach leaf", img: img10, price: 25.0, bowls: 22 },
    { id: 5, name: "Hot spicy fried rice with omelet", img: noodleWithOmlet, price: 25.0, bowls: 13 },
    { id: 6, name: "Spicy noodle with special omelette", img: noodle, price: 25.0, bowls: 17 },
    { id: 7, name: "Spicy seasoned seafood noodles", img: images, price: 25.0, bowls: 20 },
    { id: 8, name: "Salted pasta with mushroom sauce", img: fryedRice, price: 25.0, bowls: 11 },
    { id: 9, name: "Beef dumpling in hot and sour soup", img: img10, price: 25.0, bowls: 16 },
  ]

  const [selectedSize, setSelectedSize] = useState(
    Object.fromEntries(dishes.map(d => [d.id, "M"]))
  )

  const handleSizeChange = (id, size) => {
    setSelectedSize(prev => ({
      ...prev,
      [id]: size,
    }))
  }

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())

  )

  const visibleDishes =
    activeCategory === "today" ? filteredDishes : [];

  const isDishInCart = (dishId) => {
    return cartItems.some(item => item.id === dishId);
  };



  return (
    <div className="h-screen bg-[#1f2433] text-white p-3 sm:p-6 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chef Kitchen</h1>
          <p className="text-gray-400 text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for food, coffee, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 rounded-xl bg-[#2a2f42]
            border border-[#343a52] pl-10 pr-4 py-2 text-sm"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <img src={searchIcon} alt="search" />
          </span>
        </div>
      </div>

      {/* buttons */}
      <div className='overflow-x-auto no-scrollbar'>
        <nav className='flex flex-row  mt-6 border-b border-[#2f354a] gap-6'>

          <button
            onClick={() => setActiveCategory("today")}
            className={`pb-4 shrink-0 transition ${activeCategory === "today"
                ? "border-b-2 border-orange-500 text-orange-400"
                : "hover:border-b"}`}
          >Today Special</button>

          <button onClick={() => setActiveCategory("special")}
            className={`pb-4 shrink-0 transition ${activeCategory === "special"
                ? "border-b-2 border-orange-500 text-orange-400"
                : "hover:border-b"
              }`}>Our Special</button>

          <button onClick={() => setActiveCategory("south")}
            className={`pb-4 shrink-0 transition ${activeCategory === "south"
                ? "border-b-2 border-orange-500 text-orange-400"
                : "hover:border-b"
              }`}>South Indian Special</button>

        </nav>
      </div>

      {/* Choose Dishes */}
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-xl font-semibold">Choose Dishes</h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#2a2f42] border border-[#343a52]
            px-4 py-2 rounded-xl text-sm text-gray-300"
          >
            {orderType}
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#2a2f42]
            border border-[#343a52] rounded-xl shadow-lg z-10">
              {["Dine In", "Take Away", "Delivery"].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setOrderType(type)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm
                  ${orderType === type ? "text-orange-400" : "text-gray-300"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="mt-6 flex-1 overflow-y-auto pr-2 no-scrollbar">
        <div className={`grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6
          ${showCart ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4"}`}>

          {visibleDishes.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">
              No dishes found
            </p>
          ) : (
            visibleDishes.map(item => (
              <div  key={item.id}
  className={`relative rounded-2xl p-4 text-center transition-all duration-300
    bg-[#2a2f42]
  `}      >
   {isDishInCart (item .id) && (
    <span className='absolute top-5 right-5 w-3 h-3 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.08)] '>

    </span>
   )}
              <img src={item.img} alt={item.name} className="mx-auto h-36 sm:h-44 object-contain" />

                <h3 className="mt-4 font-medium">{item.name}</h3>
                <p className="text-green-400 mt-2">{item.price.toFixed(2)} AED</p>
                <p className="text-gray-400 text-sm">{item.bowls} Bowls available</p>

                <div className="flex gap-2 justify-center mt-4">
                  {["S", "M", "L"].map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(item.id, size)}
                      className={`px-3 py-1 rounded-lg border text-sm
                      ${selectedSize[item.id] === size
                          ? "bg-orange-500 border-orange-500"
                          : "border-[#3a405a]"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  disabled={item.bowls === 0}
                  onClick={() => onAddToCart(item, selectedSize[item.id])}
                  className={`mt-3 w-full py-2 rounded-lg font-semibold transition active:scale-97
                  ${item.bowls === 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-orange-500 hover:opacity-90"}`}
                >
                  {item.bowls === 0 ? "Sold Out" : "Add to Order"}
                </button>

              </div>
            ))
          )}
        </div>
      </div>

      {/* View Order */}
      <button
        onClick={onViewOrder}
        className="fixed bottom-15 md:bottom-10  right-5 md:right-10 bg-orange-500 px-4 py-4 rounded-full font-semibold 
        shadow-lg
          hover:opacity-93 "
      >
        <FiShoppingCart className="text-white text-2xl" />
        {count > 0 && (
          <span className="absolute -top-0 -right-0 bg-orange-600
          text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {count}
          </span>
        )}
      </button>
    </div>
  )
}

export default HomePage
