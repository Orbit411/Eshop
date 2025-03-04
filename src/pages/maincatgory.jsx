import React, { useEffect, useState } from 'react';
import Heading from '../componant/shared/Heading';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Link, useParams } from 'react-router-dom';
import { motion } from "framer-motion";

const Maincatgory = () => {
  const [productsslider, setProductsslider] = useState([]);
  const [value, firestoreLoading, error] = useCollection(collection(db, "products"));
  const par = useParams();

  useEffect(() => {
    const fetchProductss = async () => {
      if (value) {
        const productsArray = value.docs.map((doc) => doc.data());
        const filteredArray = productsArray.filter(item => item.category === par.type);
        console.log(filteredArray);
        setProductsslider(filteredArray);
      }
    };
    fetchProductss();
  }, [value, par]);

  // حالة التحميل
  if (firestoreLoading) {
    return (
      <div className="container flex justify-center items-center" style={{ minHeight: "90vh" }}>
        <div className="text-lg font-semibold text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  // حالة لا توجد منتجات
  if (productsslider.length === 0) {
    return (
      <div className="container flex justify-center items-center" style={{ minHeight: "90vh" }}>
        <div className="text-lg font-semibold text-gray-900 dark:text-white">No products available in this category.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        {/* Header section */}
        <Heading title="Our Product" subtitle={"Explore Our Product"} />
        {/* body section */}
        <div style={{ minHeight: "90vh" }} className="flex flex-wrap justify-center gap-6">
          {productsslider.map((product, index) => (
            <Link to={`/details/${product.id}`} key={product.id}>
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{ width: "340px" }} // يمكنك تعديل العرض حسب الحاجة
                initial={{ opacity: 0, y: 50 }} // البداية
                whileInView={{ opacity: 1, y: 0 }} // النهاية عندما يكون العنصر مرئيًا
                viewport={{ once: true }} // حدد أن الحركة تحدث مرة واحدة فقط
                transition={{ delay: 0.05 }} // التأخير
              >
                <motion.img
                  src={product.images[0].url}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }} // يظهر عندما يكون مرئيًا
                  viewport={{ once: true }} // حدد أن الحركة تحدث مرة واحدة فقط
                  transition={{ delay: 0.2 * index }}
                />
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  {product.discount && (
                    <span className="text-red-500 text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {product.discount ? product.endprice : product.price} EGP
                  </p>
                  {product.discount && (
                    <p className="text-lg text-gray-400 line-through">
                      {product.price} EGP
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maincatgory;