import React, { useState, useRef } from "react";
import { useCart } from "./CartContext";
import SideBar from "./SideBar";
import HomePage from "./HomePage";
import OrderPanel from "./OrderPanel";
import BottomNav from "./BottomNav";
import Payment from "./Payment/Payment";

const MainPage = () => {
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const startY = useRef(0);
  const [showPayment, setShowPayment] = useState(false);
  const [itemsForPayment, setItemsForPayment] = useState([]);

  const { clearCart , cartItems } = useCart();

  const handleOrder = (items) => {
    setShowCart(false);
    setShowPayment(true)
    setItemsForPayment(items)

    setTimeout(() => {
      setOrderPlaced(false);
    }, 2000);
  };

  return (
    <>
      <div className="bg-[#1f2433] min-h-screen relative overflow-hidden">

        {/* SIDE BAR */}
        <SideBar onCartClick={() => setShowCart(true)} />

        <div className="md:ml-[72px] flex pb-16 md:pb-0 transition-all duration-300">

          {/* MAIN CONTENT */}
          <div
            className={`flex-1 transition-all duration-300 ${
              showCart ? "md:mr-[380px]" : ""
            }`}
          >
            <HomePage
              onViewOrder={() => setShowCart(true)}
              showCart={showCart}
            />
          </div>

          <div
            className={`fixed md:absolute top-0 right-0 z-40 h-screen
              w-full md:w-[380px] transform transition-transform duration-300
              ${showCart ? "translate-x-0" : "translate-x-full"}`}
          >
            <OrderPanel
              onClose={() => setShowCart(false)}
              onOrder={handleOrder}
            />
          </div>
          {showPayment && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="scale-100 animate-fadeIn">
      <Payment 
      onClose={() => setShowPayment(false)}
      onPayment={()=> {
        clearCart()
        setOrderPlaced(true)
        setShowPayment(false)
        setTimeout(() => setOrderPlaced(false), 2000);
      }} 
      itemsFromCart={cartItems}
      />
    </div>
  </div>
)}

        </div>

        {/* ORDER PLACED POPUP */}
        {orderPlaced && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div className="bg-[#1F1D2B] px-6 py-5 rounded-2xl text-center animate-bounce">
              <h2 className="text-lg font-semibold text-green-400">
                🎉 Order Placed!
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Your food is on the way
              </p>
            </div>
          </div>
        )}

        {/* BACKDROP (mobile) */}
        {showCart && (
          <div
            onClick={() => setShowCart(false)}
            className="md:hidden fixed inset-0 bg-black/40 z-0"
          />
        )}
      </div>

      <BottomNav />
    </>
  );
};

export default MainPage;
