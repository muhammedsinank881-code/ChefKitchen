import React, { useState, useRef } from "react";
import { useCart } from "./CartContext";
import SideBar from "./SideBar";
import HomePage from "./HomePage";
import OrderPanel from "./OrderPanel";
import BottomNav from "./BottomNav";

const MainPage = () => {
  const [showCart, setShowCart] = useState(false);
  const startY = useRef(0)
  const [orderPlaced, setOrderPlaced] = useState(false);
  const {clearCart} = useCart ()

  const handleOrder = () => {
  setOrderPlaced(true);
  clearCart();
  setShowCart(false);

  setTimeout(() => {
    setOrderPlaced(false);
  }, 2000);
};


  return (
    <>
      <div className="bg-[#1f2433] min-h-screen relative overflow-hidden">
        <SideBar onCartClick={() => setShowCart(true)} />

        <div className="md:ml-[72px] flex pb-16 md:pb-0 transition-all duration-300">
         <div
            className={`flex-1 transition-all duration-300
               ${showCart ? "md:mr-[380px]" : ""}
              `}
          >
            <HomePage
              onViewOrder={() => setShowCart(true)}
              showCart ={ showCart}
            />
            </div>
          
          {/* Desktop slide-in cart */}
          <div
             className={`
    fixed md:absolute
    top-0 right-0 z-40
    h-screen w-full md:w-[380px]
    transform transition-transform duration-300
    ${showCart ? "translate-x-0" : "translate-x-full"}
  `} >
            <OrderPanel
              onClose={() => setShowCart(false)}
              onOrder={ handleOrder }
            />    
          </div>
        </div>

        {/* Mobile cart */}
        <div
          className={`
    fixed inset-x-0 bottom-0 z-50
    transform transition-transform duration-300 ease-in-out
    md:hidden
    ${showCart ? "translate-y-0" : "translate-y-full"}
  `}
          onTouchStart={(e) => (startY.current = e.touches[0].clientY)}
          onTouchEnd={(e) => {
            const endY = e.changedTouches[0].clientY;
            if (endY - startY.current > 80) {
              setShowCart(false); // swipe down closes cart
            }
          }}
        >

          <OrderPanel
            onClose={() => setShowCart(false)}
            onOrder={{ handleOrder }}
          />
        </div>

        {orderPlaced && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div className=" bg-[#1F1D2B] px-6 py-5 rounded-2xl text-center animate-bounce ">
              <h2 className="text-lg font-semibold text-green-400">
                🎉 Order Placed!
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Your food is on the way
              </p>
            </div>
          </div>
        )}
        {showCart && (
          <div
            onClick={() => setShowCart(false)}
            className="md:hidden fixed inset-0 bg-black/40 z-0"
          />
        )}

      </div>
      <BottomNav/>
    
    </>
  );
};

export default MainPage;
