import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import Heading from "../shared/Heading";

const Products = () => {
  const [products, setProducts] = useState([]);

  // جلب الطلبات من Firebase لحساب أكثر المنتجات طلبًا
  const fetchOrders = async () => {
    try {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      let productCountData = {};

      ordersSnapshot.forEach((orderDoc) => {
        const orderData = orderDoc.data();
        
        if (orderData.productId) {
          const productId = orderData.productId;

          // التحقق مما إذا كان المنتج موجودًا في المنتجCountData
          if (!productCountData[productId]) {
            productCountData[productId] = {
              id: productId,
              name: orderData.productName,
              price: orderData.productPrice,
              image: orderData.productImages ? orderData.productImages[0] : "",
              orders: 0,
              totalQuantity: 0,  // لحساب مجموع الكميات
            };
          }
          
          // إضافة كمية المنتج في الطلب
          productCountData[productId].orders += 1;
          productCountData[productId].totalQuantity += orderData.productQuantity;
        }
      });

      // تحويل الكائن إلى مصفوفة وترتيب المنتجات حسب الأكثر طلبًا
      const sortedProducts = Object.values(productCountData)
        .sort((a, b) => b.orders - a.orders)
        .filter((product) => product.totalQuantity > 10); // ✅ عرض المنتجات التي تجاوزت 10 كمية

      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-12">
      <div className="container">
        <Heading title="أفضل المنتجات مبيعًا" subtitle="اكتشف منتجاتنا الأكثر شعبية" />

        {products.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {products.map((data, index) => (
              <SwiperSlide key={data.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.8 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4"
                >
                  <div className="overflow-hidden rounded-2xl mb-2">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-gray-500 "> {data.price} EGP</p>
                    <p className="font-bold line-clamp-1 text-xl">{data.name}</p>
                
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            لا يوجد منتجات
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
