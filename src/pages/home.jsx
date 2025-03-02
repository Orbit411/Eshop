import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import AOS from "aos";
import Hero from '../componant/hero/Hero';
import Category from '../componant/Category/Category';
import Category2 from '../componant/Category/Category2';
import Services from '../componant/Services/Services';
import Banner from '../componant/Banner/Banner';
import Product from '../componant/Product/Product';
import Blog from '../componant/Blog/Blog';
import Partners from '../componant/Partners/Partners';
import Popup from '../componant/Popup/Popup';
import headphone from "../assets/hero/headphone.png";
import smartwatch2 from "../assets/category/smartwatch2-removebg-preview.png";
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Banner2 from '../componant/Banner2/Banner2';

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "10 Jan to 28 Jan",
  image: smartwatch2,
  title2: "Smart Solo ",
  title3: "Winter Sale",
  title4: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsslider, setProductsslider] = useState([]);
  const [value, firestoreLoading] = useCollection(collection(db, "products"));
  const [orderPopup, setOrderPopup] = useState(false);

  useEffect(() => {
    if (value) {
      const productsArray = value.docs.map((doc) => doc.data());
      setProducts(productsArray);
      setProductsslider(productsArray);
    }
  }, [value]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  if (firestoreLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Hero handleOrderPopup={() => setOrderPopup(!orderPopup)} productsslider={productsslider} />
      <Category />
      <Category2 />
      <Services />
      <Banner data={BannerData} />
      <Product products={products} />
      <Banner2 data={BannerData2} />
      <Blog />
      <Partners />
      <Popup orderPopup={orderPopup} handleOrderPopup={() => setOrderPopup(!orderPopup)} />
    </div>
  );
};

export default Home;
