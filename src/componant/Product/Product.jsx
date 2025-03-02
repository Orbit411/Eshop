import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import Heading from "../shared/Heading";
import ProductCard from "./ProductCard";

const Product = ({ products }) => {
  const [category, setCategory] = useState("all");
  const [searchWord, setSearchWord] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((item) => item.category === category));
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchWord(keyword);
    setFilteredProducts(products.filter((item) => item.name.toLowerCase().includes(keyword)));
  };

  return (
    <div className="container" style={{ marginTop:"25px" }}>
      <Heading title="منتجاتنا" subtitle="تصفح المنتجات" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <div className="form-group">
          <label>Category:</label>
          <select onChange={(e) => handleCategoryChange(e.target.value)} value={category}>
            <option value="all">الكل</option>
            <option value="electronics">الكترونيات</option>
            <option value="clothing">ملابس</option>
            <option value="furniture">اثاث</option>
            <option value="accessories">اكسسورات</option>
            <option value="toys">لعب اطفال</option>
          </select>
        </div>

        {/* ✅ نفس تصميم البحث بدون تغيير */}
        <div className="relative group sm:block">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            value={searchWord}
            className="search-bar"
            style={{ padding: "10px 5px" }}
          />
          <IoMdSearch
            className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200"
            style={{ fontSize: "50px" }}
          />
        </div>
      </div>

      <ProductCard data={filteredProducts} />
    </div>
  );
};

export default Product;
