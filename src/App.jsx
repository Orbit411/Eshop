import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from "react-router-dom";
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
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <NavBar  handleOrderPopup={handleOrderPopup} />

        <Routes>
          <Route path="/" element={<Home  handleOrderPopup={handleOrderPopup} />} />
          <Route path="/admin/:secretKey" element={<AdminRoute />} />
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path="/category/:type" element={<Maincatgory />} />
          <Route path="*" element={<Home  handleOrderPopup={handleOrderPopup} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

// صفحة AdminRoute
const AdminRoute = () => {
  const { secretKey } = useParams();  // استخدم useParams لاستخراج الـ secretKey من الرابط
  // const validSecretKey = "zezo-1832003z";  // الـ secretKey يجب أن يحتوي على القيمتين معًا
  
  // إذا كان الـ secretKey في الـ URL هو "12345-zezo"، نعرض صفحة الـ Admin، وإذا كان خاطئًا، نعيد التوجيه للصفحة الرئيسية
  // import.meta.env.VITE_ADMIN_KEY
  if (secretKey ==="zezo-1832003z" ) {
    return <Admin />;
  } else {
    return <Navigate to="/" />;  // إذا كان الـ secretKey غير صحيح، نعيد التوجيه للصفحة الرئيسية
  }
};

export default App;