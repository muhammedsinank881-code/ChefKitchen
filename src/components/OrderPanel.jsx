import React from "react";
import { useCart } from "./CartContext";
import { useOrder } from "./OrderContext";
import { useOrderStore } from "../contexts/OrderStoreContext";
import { v4 as uuidv4 } from "uuid";
import Trash from "../assets/trash.svg?react";


const OrderPanel = ({ onClose, onOrder }) => {
  const { cartItems, updateQty, removeItem } = useCart();
  const { orderType, setOrderType } = useOrder();

  const { addOrder } = useOrderStore();


  const discount = 0.05;
  const subtotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);
  const final = subtotal - subtotal * discount;

  const handlePlaceOrder = () => {
  onOrder(cartItems); 
};

  return (
    <div className="w-full h-screen max-w-md mx-auto pb-20 z-50 bg-[#1F1D2B] text-white rounded-t-2xl md:rounded-2xl p-4 md:p-6 shadow-xl flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {onClose && (
          <button
            onClick={onClose}
            className="w-5 text-[#F99147] text-xl font-extrabold"
          >
            ←
          </button>
        )}
        <h2 className="text-lg font-semibold">Orders #34562</h2>
      </div>

      {/* Order Type Switch */}
      <div className="flex gap-3 mb-6">
        {["Dine In", "Take Away", "Delivery"].map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`px-4 py-2 rounded-xl text-sm border transition ${
              orderType === type
                ? "bg-[#EA7C69] border-[#EA7C69] text-white"
                : "border-[#3a3f55] text-[#F99147] hover:bg-[#2a2f42]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Column Titles */}
      <div className="grid grid-cols-12 text-sm pb-3 border-b border-[#2f354a]">
        <div className="col-span-8">Item</div>
        <div className="col-span-2 text-center">Qty</div>
        <div className="col-span-2 text-right">Price</div>
      </div>

      {/* Cart Items */}
      <div className="mt-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="space-y-2">

              {/* Main Item Row */}
              <div className="grid grid-cols-12 items-center gap-2">

                {/* Image + name */}
                <div className="col-span-8 flex gap-3">
                  <img src={item.img} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-normal">{item.name}</p>
                    <p className="text-xs text-gray-400">Size: {item.size}</p>
                  </div>
                </div>

                {/* Quantity buttons */}
                <div className="col-span-2 flex items-center justify-center gap-1">
                  <button
                    className="text-lg"
                    onClick={() => updateQty(item.id, item.size, -1)}
                  >
                    −
                  </button>
                  <span className="w-8 h-8 bg-[#2D303E] border border-[#393C49] text-center flex items-center justify-center rounded">
                    {item.qty}
                  </span>
                  <button
                    className="text-lg"
                    onClick={() => updateQty(item.id, item.size, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Total price */}
                <div className="col-span-2 text-right">
                  {(item.qty * item.price).toFixed(2)}
                </div>
              </div>

              {/* Note + delete */}
              <div className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-10">
                  <input
                    type="text"
                    placeholder="Order Note..."
                    className="h-11 w-full bg-[#2D303E] border border-[#393C49] rounded text-[#E0E6E9] text-sm p-3"
                  />
                </div>

                {/* Delete button */}
                <div className="col-span-2 flex items-center justify-end">
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="p-2 border border-[#F99147] rounded hover:border-[#ff8a9c]"
                  >
                    <Trash className="text-[#F99147] hover:text-[#ff8a9c]" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY FOOTER */}
      <div className="border-t border-[#2f354a] grid grid-cols-[70%_30%] md:grid-cols-1">

        {/* Prices */}
        <div className="mt-2 md:mt-3 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#ABBBC2]">Subtotal</span>
            <span>{subtotal.toFixed(2)} AED</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#ABBBC2]">Discount</span>
            <span>5%</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>After Discount</span>
            <span>{final.toFixed(2)} AED</span>
          </div>
        </div>

        {/* Order button */}
        <div className="mt-6 md:mt-4 mb-6 ml-3 md:ml-0 flex items-center justify-center">
          <button
            onClick={handlePlaceOrder}
            disabled={!cartItems.length}
            className="h-12 w-full bg-[#F99147] shadow-[0px_8px_24px_0px_#EA7C694D] 
            rounded-xl text-sm font-semibold hover:opacity-90 transition active:scale-95 
            disabled:opacity-40"
          >
            Place Order
          </button>
        </div>

      </div>

    </div>
  );
};

export default OrderPanel;
