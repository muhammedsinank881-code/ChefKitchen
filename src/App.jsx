import { Routes, Route } from "react-router-dom";
import Compact1 from "./components/Compact1";
import OrderPanel from "./components/OrderPanel";
import MainPage from "./components/MainPage";
import { CartProvider } from "./components/CartContext";
import { OrderProvider } from "./components/OrderContext";
import Dashbord from "./components/dashboard/Dashbord";
import { DishesProvider } from './components/DishContext'
import { OrderStoreProvider } from "./contexts/OrderStoreContext";

const App = () => {
  return (
    <CartProvider>
      <OrderProvider>
        <DishesProvider>
          <OrderStoreProvider>
            <Routes>
            <Route path="/" element={<Compact1 />} />
            <Route path="/mainPage" element={<MainPage />} />
            <Route path="/orderPanel" element={<OrderPanel />} />
            <Route path="/admin" element={<Dashbord/>} />
          </Routes>
          </OrderStoreProvider>
        </DishesProvider>
      </OrderProvider>
    </CartProvider>


  );
};

export default App;
