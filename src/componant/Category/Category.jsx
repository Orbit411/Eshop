import Image1 from "../../assets/category/grey-comfortable-armchair-isolated-white-background-removebg-preview.png";
import Image2 from "../../assets/category/watch.png";
import Image3 from "../../assets/category/macbook.png";
import Button from "../shared/Button";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="py-8">
  <div className="container">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
      {/* First col (Furniture) */}
      <Link to={"/category/furniture"}>
        <div className="py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end">
          <div>
            <div className="mb-4">
              <p className="mb-[2px] text-gray-400">استمتع</p>
              <p className="text-2xl font-semibold mb-[2px]">مع</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">الاثاث</p>
              <Button text="تصفح الان" bgColor={"bg-primary"} textColor={"text-white"} />
            </div>
          </div>
          <img
            src={Image1}
            alt="Furniture"
            className="w-[250px] absolute top-1/2 -translate-y-1/2 right-0"
          />
        </div>
      </Link>

      {/* Second col (Electronics) */}
      <Link to={"/category/electronics"}>
        <div className="py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end">
          <div>
            <div className="mb-4">
              <p className="mb-[2px] text-white">استمتع</p>
              <p className="text-2xl font-semibold mb-[2px]">مع</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">الكترونيات</p>
              <Button text="تصفح الان" bgColor={"bg-white"} textColor={"text-primary"} />
            </div>
          </div>
          <img
            src={Image3}
            alt="Electronics"
            className="w-[250px] absolute top-1/2 -translate-y-1/2 right-0"
          />
        </div>
      </Link>
    </div>
  </div>
</div>

  );
};

export default Category;
