import React from 'react'
import Trash from "../assets/trash.svg?react";
const OrderPanel = ({ cartItems, updateQty, removeItem, onClose, onOrder, orderType, setOrderType }) => {
  const discount = 0.05
  const subtotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0)
  const final = subtotal - subtotal * discount

  return (
    <div className="w-full h-[87vh] md:h-screen max-w-md mx-auto pb-20 z-50 bg-gradient-to-b from-[#1f1d2b] to-[#1a1a25] text-white rounded-t-2xl md:rounded-2xl p-4 md:p-6 shadow-xl flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        {onClose && (
          <button
            onClick={onClose}
            className="w-5 text-orange-400 text-xl font-extrabold"
          >
            ←
          </button>
        )}
        <h2 className="text-lg font-semibold">Orders #34562</h2>
      </div>

      {/* Order Type */}
      <div className="flex gap-3 mb-6">
        {['Dine In', 'Take away', 'Delivery'].map(type => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`px-4 py-2 rounded-xl text-sm border transition ${
              orderType === type
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'border-[#3a3f55] text-orange-400 hover:bg-[#2a2f42]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="grid grid-cols-12 text-sm text-gray-400 pb-3 border-b border-[#2f354a]">
        <div className="col-span-8">Item</div>
        <div className="col-span-2 text-center">Qty</div>
        <div className="col-span-2 text-right">Price</div>
      </div>

      {/* Items */}
      <div className="mt-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="space-y-3">
          {cartItems.map(item => (
            <div key={`${item.id}-${item.size}`} className="space-y-2">
              <div className="grid grid-cols-12 items-center gap-2">
                <div className="col-span-8 flex gap-3">
                  <img src={item.img} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-normal">{item.name}</p>
                    <p className="text-xs text-gray-400">Size: {item.size}</p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.size, -1)}
                    className="text-red-400"
                  >
                    -
                  </button>
                  <span className="w-10 h-10 bg-[#393C49] border border-[#343a52] text-center pt-2 p-4 rounded">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.size, 1)}
                    className="text-green-400"
                  >
                    +
                  </button>
                </div>

                <div className="col-span-2 text-right">
                  {(item.qty * item.price).toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-10">
                  <input
                    type="text"
                    placeholder="Order Note..."
                    className="ml-0.5 h-11 w-full bg-[#393C49] border border-[#343a52] rounded text-[#E0E6E9] text-sm font-normal p-3"
                  />
                </div>
                <div className="col-span-2 flex items-center justify-end ">
                  <div className='flex items-center justify-center rounded border border-[#F99147] hover:border-[#FF7CA3] p-2 '>
                  <button
                    onClick={() => removeItem(item.id, item.size)}                     
                  >
                    <Trash className=" text-[#F99147] hover:text-[#FF7CA3]" />
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="border-t border-[#2f354a] grid grid-cols-[70%_30%] md:grid-cols-1">
        <div className="mt-2 md:mt-3 space-y-3 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} AED</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Discount</span>
            <span>5%</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>after Discount</span>
            <span>{final.toFixed(2)} AED</span>
          </div>
        </div>

        <div className="mb-6 mt-6  ml-3 md:ml-0 md:mb-0  flex items-center justify-center  ">
          <button
            onClick={onOrder}
            disabled={!cartItems.length}
            className="h-12 w-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl text-sm font-semibold hover:opacity-80 transition active:scale-95 disabled:opacity-40 z-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderPanel
