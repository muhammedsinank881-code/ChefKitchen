import { createContext, useContext, useState, useEffect } from "react";

const OrderStoreContext = createContext();

export const OrderStoreProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrderStoreContext.Provider
      value={{ orders, addOrder, deleteOrder }}
    >
      {children}
    </OrderStoreContext.Provider>
  );
};

export const useOrderStore = () => useContext(OrderStoreContext);
