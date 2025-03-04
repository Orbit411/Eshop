import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const [visibleImages, setVisibleImages] = useState(8);

  const handleShowMore = () => {
    setVisibleImages((prev) => prev + 4);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {data.slice(0, visibleImages).map((product) => (
          <Link to={`/details/${product.id}`} key={product.id}>
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{ width: "345px" }} // يمكنك تعديل العرض حسب الحاجة
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <motion.img
                src={product.images[0].url}
                alt={product.title}
                className="w-full h-48 object-contain rounded-lg mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                {product.discount && (
                  <p className="text-red-600 text-lg mt-1">
                    {product.discount}% OFF
                  </p>
                )}
              </div>

              <p className="text-gray-500 text-sm mt-1">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold">
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
      {visibleImages < data.length && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
            onClick={handleShowMore}
          >
            See More...
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCard;