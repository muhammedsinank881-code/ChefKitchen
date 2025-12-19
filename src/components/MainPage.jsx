import React, { useState, useRef } from "react";
import SideBar from "./SideBar";
import HomePage from "./HomePage";
import OrderPanel from "./OrderPanel";
import BottomNav from "./BottomNav";

const MainPage = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const startY = useRef(0)
  const [orderPlaced, setOrderPlaced] = useState(false);

  // buttons connect
  const [ orderType , setOrderType ] = useState ("Dine In")

  //  ADD TO CART
  const addToCart = (dish, size) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === dish.id && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === dish.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          price: parseFloat(dish.price),
          img: dish.img,
          size,
          qty: 1,
        },
      ];
    });
  };

  //  UPDATE QTY
  const updateQty = (id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  //  REMOVE ITEM
  const removeItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
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
              onAddToCart={addToCart}
              showCart ={ showCart}
              count={cartItems.reduce((a, c) => a + c.qty, 0)}
              orderType = { orderType }
              setOrderType = { setOrderType }
            />
            </div>
          
          {/* Desktop slide-in cart */}
          <div
            className={`hidden md:block absolute top-0 right-0 h-screen w-[380px] bg-transparent
                         transform transition-transform duration-300 ease-in-out
                         
                         ${showCart ? "translate-x-0" : "translate-x-full"}`} >
            <OrderPanel
              cartItems={cartItems}
              updateQty={updateQty}
              removeItem={removeItem}
              orderType={ orderType}
              setOrderType={ setOrderType }
              onClose={() => setShowCart(false)}
              onOrder={() => {
                setOrderPlaced(true);
                setCartItems([]);
                setShowCart(true);
                setTimeout(() => setOrderPlaced(false), 2500);
              }}
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
            cartItems={cartItems}
            updateQty={updateQty}
            removeItem={removeItem}
            onClose={() => setShowCart(false)}
            orderType={orderType}
            setOrderType={setOrderType}
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
      <BottomNav
        onCartClick={() => setShowCart(true)}
      />
    
    </>
  );
};

export default MainPage;
