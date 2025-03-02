import Slider from "react-slick";

import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Hero = ({ handleOrderPopup }) => {
  const [product, setProduct] = useState(null); // تأكد من بدء الحالة بـ null وليس undefind

  const navgaite =useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("type", "==", "banner"));
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        // التأكد من أن المنتجات تم تحميلها بشكل صحيح
    // ضع log هنا لرؤية البيانات المرسلة
        setProduct(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    slidesToShow: 1, // يظهر شريحة واحدة في كل مرة
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  // حالة تحميل البيانات
  // if (firestoreLoading) {
  //   return (  <div className="loading-container">
  //     <div className="spinner"></div>
  //   </div>);
  // }

  // // حالة الخطأ
  // if (error) {
  //   return <div>Error loading data</div>;
  // }

  if (product && product.length > 0) {
    return (
      <div className="container">
        <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center">
          <div className="container pb-8 sm:pb-0">
            <Slider {...settings}>
              {product.map((data) => (
                <div key={data.id}>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div
                      className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 
                      sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10"
                    >
                      <h1
                        data-aos="zoom-out"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="text-2xl sm:text-6xl lg:text-2xl font-bold"
                      >
                        {data.name} {/* عرض اسم المنتج */}
                      </h1>
                      <h1
                        data-aos="zoom-out"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                      >
                        {data.discount} % {/* عرض وصف المنتج */}
                      </h1>
                      <h1
                        data-aos="zoom-out"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="text-5xl uppercase text-white dark:text-white/5 
                      sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold"
                      >
                        {data.endprice} EGP {/* عرض السعر النهائي */}
                      </h1>
                      <div
                        data-aos="fade-up"
                        data-aos-offset="0"
                        data-aos-duration="500"
                        data-aos-delay="300"
                      >
                      <button className="shopnow" onClick={() => {
                        navgaite(`/details/${data.id}`)
                      }} >Shop Now</button>
                      </div>
                    </div>
                    <div className="order-1 sm:order-2">
                      <div
                        data-aos="zoom-in"
                        data-aos-once="true"
                        className="relative z-10"
                      >
                        {/* تأكد من وجود صورة للمنتج */}
                        {data.images && data.images.length > 0 && (
                          <img
                            src={data.images[0].url} // تأكد من أن الصور موجودة
                            alt={data.name}
                            className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 
                            object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }

  // حالة إذا كانت المصفوفة فارغة أو لم يتم تحميل المنتجات
  // return ( <div className="loading-container">
  //   <div className="spinner"></div>
  // </div>);
};

export default Hero;
