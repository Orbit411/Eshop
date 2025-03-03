import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState(""); // حالة جديدة للصورة المحددة
  const[note,setnote]=useState("")
  const[error,seterror]=useState(false)
  const par = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(collection(db, "products"), where("id", "==", par.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          setProduct(productData);
          setSelectedImage(productData.images[0].url); // تعيين الصورة الأولى كبداية
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [par.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  if(e.target.phone.value.length==11){ 
    
    try {
      const orderData = {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productPricediscount: product.discount ? product.endprice:0,
        discount: product.discount ? product.discount:0,
        productQuantity: quantity,
        totalPrice: product.discount ?(product.endprice * quantity):(product.price * quantity), // حساب إجمالي السعر بناءً على الكمية
        customerName: name,
        customerPhone: phone,
        note:note,
        createdAt: new Date(),
        productImages: product.images.map(image => image.url), //
      };
    
      await addDoc(collection(db, "orders"), orderData);
      Swal.fire({ icon: "success", title: "تم طلب المنتج سيتم التواصل معك قريبا !" });
      setName("");
      setPhone("");
      setnote('')
    } catch (error) {
      console.error("Error placing order:", error);
    }
    }else{
      seterror(true)
    }
  
  };

  if (loading) return <div className="loading-container">
  <div className="spinner"></div>
</div>;
  if (!product) return <div className="loading-container">
  <div className="spinner"></div>
</div>;

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-800 bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl p-6 w-full max-w-5xl dark:bg-black">
        {/* عرض الصور */}
        <div className="flex flex-col items-center">
          <motion.img 
            src={selectedImage} // استخدام الصورة المحددة
            alt={product.name} 
            className="w-3/4 h-auto rounded-lg" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }} 
          />
          <div className="flex gap-2 mt-4 ">
            {product.images.map((img, index) => (
              <motion.img 
                key={index} 
                src={img.url} 
                alt={`Product ${index}`} 
                className="w-16 h-16 rounded-lg border cursor-pointer hover:scale-110 transition" 
                whileHover={{ scale: 1.1 }} 
                onClick={() => setSelectedImage(img.url)} // تغيير الصورة عند الضغط
              />
            ))}
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold text-red-500">{product.discount ? `${product.endprice} EGP` : `${product.price} EGP`}</p>
          {product.discount && (
            <p className="text-gray-500 line-through">{product.price} EGP</p>
          )}

          {/* اختيار الكمية */}
          <div className="flex items-center gap-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 border rounded-lg bg-gray-200 dark:text-black ">-</button>
            <span className="text-lg font-semibold dark:bg-black">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 border rounded-lg bg-gray-200 dark:text-black">+</button>
          </div>

          {/* السعر الإجمالي */}
          <h2 className="text-xl font-semibold text-red-600">Total: {product.discount ? (product.endprice * quantity) : (product.price * quantity)} EGP</h2>

          {/* نموذج الطلب */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input 
              type="text" 
              placeholder="اسمك" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="border p-2 rounded-lg dark:text-black" 
              required 
            />
            <input 
              type="tel" 
              placeholder="رقم الهاتف" 
              value={phone} 
              id='phone'
              onChange={(e) => {
              
                
              
                setPhone(e.target.value)
                if(error){
                  seterror(false)


                }

                
              }} 
              className="border p-2 rounded-lg dark:text-black" 
              required 
            />
            {error&&(<p className="text-red-600"> يجب ان يكون رقم الهاتف مكون من 11 رقم</p>)}
              <textarea 
              type="text" 
              placeholder="  اضف ملاحظاتك هنا اذا كان المنتج يحتوى على مقاس ...الخ"  
              value={note} 
              onChange={(e) => setnote(e.target.value)} 
              className="border p-2 rounded-lg dark:text-black" 
            
            />
            <button 
              type="submit" 
              className="bg-black text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 dark:bg-gray-800">
              <ShoppingCart size={20} />
              شراء الان  
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

