import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish, size) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item.id === dish.id && item.size === size
      );

      if (existing) {
        if(existing.qty +1 >dish.bowls){
          return prev
        }
        
        return prev.map(item =>
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
          price: dish.price,
          img: dish.img,
          size,
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (id, size, delta) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id && item.size === size
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const removeItem = (id, size) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === id && item.size === size))
    );
  };

  // ✅ THIS IS REQUIRED
  const clearCart = () => {
    setCartItems([]);
  };

  const count = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
