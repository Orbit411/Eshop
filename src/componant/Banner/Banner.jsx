import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // استيراد المكتبة

const Banner = ({ data }) => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("type", "==", "banner"),
          where("category", "==", "electronics")
        );
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        // ترتيب البيانات بناءً على الخصم من الأكبر إلى الأصغر
        productsData.sort((a, b) => b.discount - a.discount);

        setProduct(productsData[0]);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

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
          whileInView={{ opacity: 1 }} // يبدأ التأثير عند دخول العنصر في الـ viewport
          transition={{ duration: 1.5 }}
        >
          {/* first col */}
          <div className="p-6 sm:p-8">
            <motion.p 
              className="text-xl" text-
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }} // التحريك عند السِّكرول
              transition={{ duration: 1 }}
            >
              {product.discount} % OFF
            </motion.p>
            <motion.h1
              className="uppercase text-4xl lg:text-7xl font-bold"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }} // التحريك عند السِّكرول
              transition={{ duration: 1 }}
            >
              {product.name}
            </motion.h1>
            <motion.p 
              className="text-sm"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }} // التحريك عند السِّكرول
              transition={{ duration: 1 }}
            >
              {product.description}
            </motion.p>
          </div>

          {/* second col */}
          <motion.div
            className="h-full flex items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }} // التحريك عند السِّكرول
            transition={{ duration: 1}}
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
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }} // التحريك عند السِّكرول
              transition={{ duration: 1 }}
            >
              {product.endprice} EGP
            </motion.p>
            <motion.p 
              className="text-3xl sm:text-5xl font-bold"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }} // التحريك عند السِّكرول
              transition={{ duration: 0.5 }}
            >
              Big sale
            </motion.p>
            <motion.p 
              className="text-sm tracking-wide leading-5"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }} // التحريك عند السِّكرول
              transition={{ duration: 0.5 }}
            >
              {product.description}
            </motion.p>

            <motion.div
              data-aos="fade-up"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }} // التحريك عند السِّكرول
              transition={{ duration: 0.5 }}
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

export default Banner;
