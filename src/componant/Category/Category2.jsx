import Image1 from "../../assets/category/clothes-removebg-preview.png";
import Image2 from "../../assets/category/hand-bag-coffee-composition-Photoroom-removebg-preview.png";
import Image3 from "../../assets/category/bf8901ea-62f6-42df-a26c-509a6e1cea66-removebg-preview.png";
import Button from "../shared/Button";
import { Link } from "react-router-dom";

const Category2 = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* first col (Clothes) */}
          <Link to="/category/clothing"   className="sm:col-span-2 col-span-4 py-10 pl-5 bg-gradient-to-br 
            from-gray-400/90 to-gray-100 text-white rounded-3xl 
            relative h-[320px] flex items-end">
          
              <div>
                <div className="mb-4">
                  <p className="mb-[2px] text-white">استمتع</p>
                  <p className="text-2xl font-semibold mb-[2px]">مع</p>
                  <p
                    className="text-4xl xl:text-5xl font-bold 
                opacity-20 mb-2"
                  >
                    ملابس
                  </p>
                  <Button
                    text="تصفح الان"
                    bgColor={"bg-primary"}
                    textColor={"text-white"}
                  />
                </div>
              </div>
              <img
                src={Image1}
                alt="Clothes"
                className="w-[350px] 
            absolute top-1/2 -translate-y-1/2 -right-0"
              />
          
          </Link>

          {/* second col (Accessories) */}
          <Link to="/category/accessories">
            <div
              className="py-10 sm:col-span-2 pl-5 bg-gradient-to-br 
            from-brandGreen/90 to-brandGreen/90 
          text-white rounded-3xl relative h-[320px] flex items-start"
            >
              <div>
                <div className="mb-4">
                  <p className="mb-[2px] text-white">استمتع</p>
                  <p className="text-2xl font-semibold mb-[2px]">مع</p>
                  <p
                    className="text-4xl xl:text-5xl font-bold 
                opacity-20 mb-2"
                  >
                    اكسسورات
                  </p>
                  <Button
                    text="تصفح الان"
                    bgColor={"bg-white"}
                    textColor={"text-brandGreen"}
                  />
                </div>
              </div>
              <img
                src={Image2}
                alt="Accessories"
                className="w-[150px] 
            absolute bottom-0 right-0"
              />
            </div>
          </Link>

          {/* third col (Games) */}
          <Link to="/category/games">
            <div
              className="py-10 pl-5 bg-gradient-to-br 
            from-brandBlue to-brandBlue/90 text-white rounded-3xl 
            relative h-[320px] flex items-start"
            >
              <div>
                <div className="mb-4">
                  <p className="mb-[2px] text-white">استمتع</p>
                  <p className="text-2xl font-semibold mb-[2px]">مع</p>
                  <p
                    className="text-4xl xl:text-5xl font-bold 
                opacity-20 mb-2"
                  >
                    العاب
                  </p>
                  <Button
                    text="تصفح الان"
                    bgColor={"bg-white"}
                    textColor={"text-brandBlue"}
                  />
                </div>
              </div>
              <img
                src={Image3}
                alt="Games"
                className="w-[200px] 
            absolute right-0 bottom-0"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category2;
