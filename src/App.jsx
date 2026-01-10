import { Routes, Route } from "react-router-dom";
import Compact1 from "./components/Compact1";
import OrderPanel from "./components/OrderPanel";
import MainPage from "./components/MainPage";
import { CartProvider } from "./components/CartContext";
import { OrderProvider } from "./components/OrderContext";

const App = () => {
  return (
    <CartProvider>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<Compact1 />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/orderPanel" element={<OrderPanel />} />
        </Routes>
      </OrderProvider>
    </CartProvider>
  );
};

export default App;
