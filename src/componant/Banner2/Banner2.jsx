import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // استيراد Framer Motion

const Banner2 = ({ data }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("type", "==", "banner"),
          where("category", "==", "clothing"),
        );
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        // ترتيب المنتجات بناءً على قيمة discount من الأكبر إلى الأصغر
        const sortedProducts = productsData.sort((a, b) => b.discount - a.discount);

        

        if (sortedProducts.length > 0) {
          setProduct(sortedProducts[0]);  // تعيين أول منتج بعد الترتيب
        } else {
          console.log("No products found");
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (  <div className="loading-container">
      <div className="spinner"></div>
    </div>);
  }

  if (!product) {
    return (  <div className="loading-container">
      <div className="spinner"></div>
    </div>);
  }

  return (
    <div className="min-h-[550px] flex justify-center items-center py-12">
      <div className="container">
        <motion.div key={product.id}
          style={{ backgroundColor: data.bgColor }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }} // بداية التحريك عند السِّكرول
          transition={{ duration: 1 }}
        >
          {/* first col */}
          <div className="p-6 sm:p-8">
            <motion.p 
              className="text-xl"
              initial={{ x: -100, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }} // التحرك من اليسار
              transition={{ duration: 0.6 }}
            >
              {product.discount} % OFF
            </motion.p>
            <motion.h1
              className="uppercase text-4xl lg:text-7xl font-bold"
              initial={{ y: -50, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} // التحرك من الأعلى
              transition={{ duration: 1 }}
            >
              {product.name}
            </motion.h1>
            <motion.p 
              className="text-sm"
              initial={{ x: -50, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }} // التحرك من اليسار
              transition={{ duration: 0.6 }}
            >
              {product.description}
            </motion.p>
          </div>

          {/* second col */}
          <motion.div
            className="h-full flex items-center"
            initial={{ scale: 0.8, opacity: 0 }} 
            whileInView={{ scale: 1, opacity: 1 }} // التكبير التدريجي مع الظهور
            transition={{ duration: 0.8 }}
          >
            <img
              src={product.images[0].url}
              alt=""
              className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover"
            />
          </motion.div>

          {/* third col */}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <motion.p 
              className="font-bold text-xl"
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} // التحرك من اليمين
              transition={{ duration: 0.5 }}
            >
              {product.endprice} EGP
            </motion.p>
            <motion.p 
              className="text-3xl sm:text-5xl font-bold"
              initial={{ scale: 0.9, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }} // التكبير التدريجي مع الظهور
              transition={{ duration: 0.7 }}
            >
              Big sale
            </motion.p>
            <motion.p 
              className="text-sm tracking-wide leading-5"
              initial={{ y: 50, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} // التحرك من الأسفل
              transition={{ duration: 0.6 }}
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} // التكبير والتغيير التدريجي
              transition={{ duration: 0.7 }}
            >
              <button
                style={{ color: data.bgColor }}
                className="bg-white py-2 px-4 rounded-full"
                onClick={() => {
                  navigate(`/details/${product.id}`);
                }}
              >
                Shop Now
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner2;
