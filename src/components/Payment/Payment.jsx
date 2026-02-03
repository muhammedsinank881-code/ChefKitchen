import React, { useState } from "react";
import Card from "../../assets/payment/card.svg?react";
import Paypal from "../../assets/payment/paypal.svg?react";
import Cash from "../../assets/payment/cash.svg?react";

import { useOrderStore } from "../../contexts/OrderStoreContext";
import { useOrder } from "../OrderContext";
import { v4 as uuidv4 } from "uuid";

const Payment = ({ onClose, onPayment, itemsFromCart }) => {

  const { addOrder } = useOrderStore();
  const { orderType } = useOrder();

  const paymentIcons = [
    { id: 1, img: Card, name: "Credit Card" },
    { id: 2, img: Paypal, name: "Paypal" },
    { id: 3, img: Cash, name: "Cash" },
  ];

  const [selected, setSelected] = useState(null);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // 💰 CALCULATE TOTALS USING itemsFromCart (NOT cartItems!)
  const subtotal = itemsFromCart.reduce((s, i) => s + i.qty * i.price, 0);
  const final = subtotal - subtotal * 0.05;

  const handleConfirmPayment = () => {
    const newOrder = {
      id: uuidv4(),
      date: new Date().toISOString(),
      orderType,
      items: itemsFromCart.map(item => ({
        id: item.id,
        name: item.name,
        img: item.img,
        price: item.price,
        qty: item.qty,
        size: item.size,
      })),
      subtotal,
      final,
      payment: {
        method: selected,
        cardName,
        cardNumber,
      },
      status: "Paid",
    };

    addOrder(newOrder);
    onPayment();
  };

  return (
    <div className="flex bg-transparent items-center justify-center">
      <div className="min-w-max h-screen bg-[#1F1D2B] flex flex-col px-6 justify-center md:pb-100 ">

        {/* HEADER */}
        <div className="border-b border-[#2F354A] pb-4">
          <h1 className="text-white text-2xl font-semibold">Payment</h1>
          <p className="text-gray-400 text-sm">3 payment methods available</p>
        </div>

        {/* PAYMENT METHOD */}
        <div className="mt-5">
          <h2 className="text-white text-lg mb-3">Payment Method</h2>

          <div className="flex flex-row gap-3">
            {paymentIcons.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`
                  relative flex flex-col items-center justify-center 
                  bg-[#2A2839] border rounded-xl w-28 py-5 cursor-pointer 
                  hover:bg-[#343246] transition
                  ${
                    selected === item.id
                      ? "border-white bg-[#343246]"
                      : "border-gray-500"
                  }
                `}
              >
                <item.img className={`
                    h-6 w-6
                    ${selected === item.id ? "text-white" : "text-gray-400"}
                  `}
                />

                <p className={`
                    text-sm mt-2
                    ${selected === item.id ? "text-white" : "text-gray-400"}
                  `}
                >
                  {item.name}
                </p>

                {selected === item.id && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-[#EA7C69] rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CARD FORM */}
        <div className="mt-6 border-b border-[#2F354A] pb-5">
          <div className="flex flex-col mb-3">
            <label className="text-gray-300 mb-1 text-sm">Cardholder Name</label>
            <input
              type="text"
              placeholder="Holder name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="bg-[#2A2839] text-white rounded-lg p-2 outline-none"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-gray-300 mb-1 text-sm">Card Number</label>
            <input
              type="text"
              placeholder="eg: 2354 6678 3356"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="bg-[#2A2839] text-white rounded-lg p-2 outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-[#F87171] text-[#F87171] hover:bg-[#3C1F27] transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmPayment}
            disabled={!selected || !cardName.trim() || !cardNumber.trim()}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#FF8A65] to-[#FF7043] 
            text-white shadow-md hover:opacity-90 transition disabled:opacity-40"
          >
            Confirm Payment
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payment;
