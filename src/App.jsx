import { Routes, Route } from "react-router-dom";
import Compact1 from "./components/Compact1";
import OrderPanel from "./components/OrderPanel";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Compact1/>}/>
      <Route path="/mainPage" element = {<MainPage/>}/>
      <Route path="/OrderPanel" element = {<OrderPanel/>}/>
    </Routes>
  )
}

export default App
