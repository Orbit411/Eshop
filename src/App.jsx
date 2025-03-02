import React, { useState } from "react";
import { Route, Routes, useParams, Navigate } from "react-router-dom";  // لا تحتاج إلى BrowserRouter هنا
import AOS from "aos";
import NavBar from "./componant/navbar/NavBar";
import Footer from './componant/Footer/Footer';
import Home from "./pages/home";
import Admin from "./pages/admin";
import ProductDetail from "./details/ProductDetail";
import "../src/App.css";
import Maincatgory from "./pages/maincatgory";

const App = () => {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <NavBar handleOrderPopup={handleOrderPopup} />

      <Routes>
        <Route path="/" element={<Home handleOrderPopup={handleOrderPopup} />} />
        <Route path="/admin/:secretKey" element={<AdminRoute />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/category/:type" element={<Maincatgory />} />
        <Route path="*" element={<Home handleOrderPopup={handleOrderPopup} />} />
      </Routes>

      <Footer />
    </div>
  );
};

// صفحة AdminRoute
const AdminRoute = () => {
  const { secretKey } = useParams();
  
  if (secretKey === "zezo-1832003z") {
    return <Admin />;
  } else {
    return <Navigate to="/" />;
  }
};

export default App;
