import React, { useEffect, useState } from 'react';
import Sidebar from '../componant/compadmin/sidebar/sidebar';
import { doc, deleteDoc, collection, addDoc, updateDoc, query, where, getDocs, FieldValue, deleteField, orderBy } from "firebase/firestore";
import "./admin.css";
import { IoMenu } from 'react-icons/io5';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase/config';
import { useCollection } from 'react-firebase-hooks/firestore';
import ProductTable from '../componant/compadmin/ProductTable/ProductTable';
import AddProductForm from '../componant/compadmin/AddProductForm/AddProductForm';
import ProductDetails from '../componant/compadmin/ProductDetails/ProductDetails';
import EditProductForm from '../componant/compadmin/EditProductForm/EditProductForm';
import Orderstable from '../componant/compadmin/Orders/Orderstable';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Admin = () => {
  const [currentpage, setcurrentpage] = useState("Products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [endprice, setendprice] = useState("");
  const [discount, setdiscount] = useState("");
  const [type, settype] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    images: []
  });
  const [Showproduct, setShowproduct] = useState();
  const [Showorder, setShoworder] = useState();
  const [Editproduct, setEditproduct] = useState(); // حالة لإدارة المنتج الذي يتم تعديله
  const [loading, setLoading] = useState(false); // حالة التحميل العامة
  const [searchQuery, setSearchQuery] = useState('');
  const [Avproducts, setAvproducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [value, firestoreLoading, error] = useCollection(collection(db, "products"));
 

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // تحويل الملفات إلى مصفوفة
    const imagePreviews = files.map(file => URL.createObjectURL(file)); // إنشاء روابط معاينة
    setProductImages(files); // تخزين الملفات المختارة
    setProductData(prevData => ({
      ...prevData,
      images: imagePreviews, // تخزين روابط المعاينة
    }));
  };

  useEffect(() => {

    const products = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
    setAvproducts(products);
  
    // جلب الطلبات
    const fetchOrders = async () => {
      try {
        // استخدام orderBy لترتيب الطلبات من الأقدم إلى الأحدث حسب createdAt
        const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "asc"));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
        setOrders(ordersList);
        setLoadingOrders(false);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setLoadingOrders(false);
      }
    };
  
    fetchOrders();
  
  }, [value]);
  

  const handleSubmit = async (formData) => {
    setLoading(true); // بدء التحميل
    const uploadedImages = [];
    for (const file of productImages) {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // استخدام upload_preset من .env
      imageFormData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // استخدام cloud_name من .env
  
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, // استخدام cloud_name من .env
          imageFormData
        );
        uploadedImages.push({
          url: response.data.secure_url,
          public_id: response.data.public_id,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to upload images',
          text: 'Please try again.',
        });
        setLoading(false); // إيقاف التحميل في حالة الخطأ
        return;
      }
    }
  
    const productUUID = uuidv4();
    console.log(formData);
    try {
      const productData = {
        id: productUUID,
        name: formData.name,
        price: formData.price,
        description: formData.description,
        category: formData.category,
        images: uploadedImages,
        type: formData.type,
        createdAt: new Date(),
      };
  
      if (formData.discount) {
        // إضافة خصم
        productData.discount = formData.discount;
        productData.endprice = formData.endprice;
      }
  
      await addDoc(collection(db, "products"), productData);
  
      // Reset form data after successful product creation
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductCategory("");
      setProductImages([]);
      settype('');
      setProductData({ name: "", price: "", description: "", images: [], type: "" });
  
      Swal.fire({
        icon: 'success',
        title: 'Product added successfully!',
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add product',
        text: 'Please try again.',
      });
    } finally {
      setLoading(false); // إيقاف التحميل بعد الانتهاء
    }
  };
  
  


  const handleAddImages = async (newImages) => {
    setLoading(true); // بدء التحميل
    try {
      // رفع الصور الجديدة إلى Cloudinary
      const uploadedImages = [];
      for (const file of newImages) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // استخدم upload_preset من .env
        formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // استخدم cloud_name من .env
  
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, // استخدم cloud_name من .env
          formData
        );
        uploadedImages.push({
          url: response.data.secure_url,
          public_id: response.data.public_id,
        });
      }
  
      // دمج الصور الجديدة مع الصور القديمة
      const updatedImages = [...Editproduct.images, ...uploadedImages];
  
      // البحث عن المستند الذي يحتوي على الحقل id المطلوب
      const q = query(collection(db, "products"), where("id", "==", Editproduct.id));
      const querySnapshot = await getDocs(q);
  
      // إذا لم يتم العثور على أي مستند
      if (querySnapshot.empty) {
        alert("Product not found!");
        return;
      }
  
      // الحصول على document ID
      const documentId = querySnapshot.docs[0].id;
  
      // تحديث قائمة الصور في Firestore (إضافة الصور الجديدة)
      await updateDoc(doc(db, "products", documentId), { images: updatedImages });
  
      Swal.fire({
        icon: 'success',
        title: 'New images added successfully!',
      });
  
      // تحديث حالة التعديل لعرض التغييرات
      setEditproduct((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    } catch (error) {
      console.error("Error adding images:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to upload images',
        text: 'Please try again.',
      });
    } finally {
      setLoading(false); // إيقاف التحميل بعد الانتهاء
    }
  };
  

  const deleteProduct = async (productId) => {
    setLoading(true); // بدء التحميل
    try {
      // البحث عن المستند الذي يحتوي على الحقل id المطلوب
      const q = query(collection(db, "products"), where("id", "==", productId));
      const querySnapshot = await getDocs(q);

      // إذا لم يتم العثور على أي مستند
      if (querySnapshot.empty) {
      
        Swal.fire({
          icon: 'error',
          title: 'Product not found',
          text: 'Please try again.',
        });
        return;
      }

      // الحصول على document ID
      const documentId = querySnapshot.docs[0].id;

      // حذف المستند باستخدام document ID
      await deleteDoc(doc(db, "products", documentId));
    
      Swal.fire({
        icon: 'success',
        title: 'Product deleted successfully!");!',
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete product',
        text: 'Please try again.',
      });
    } finally {
      setLoading(false); // إيقاف التحميل بعد الانتهاء
    }
  };

  const deleteorder = async (orderId) => {
    setLoading(true); // بدء التحميل
    try {
      // البحث عن المستند الذي يحتوي على الحقل id المطلوب
      const q = query(collection(db, "orders"), where("productId", "==", orderId));  // تأكد من أنك تستخدم "id" وليس "productId"
      const querySnapshot = await getDocs(q);

      // إذا لم يتم العثور على أي مستند
      if (querySnapshot.empty) {
        
        Swal.fire({
          icon: 'error',
          title: 'Order not found',
          text: 'Please try again.',
        });
        return;
      }

      // الحصول على document ID
      const documentId = querySnapshot.docs[0].id;

      // حذف المستند باستخدام document ID
      await deleteDoc(doc(db, "orders", documentId));
  
      Swal.fire({
        icon: 'success',
        title: 'Order deleted successfully!',
      });

      // استدعاء دالة لإعادة تحميل الطلبات من Firestore
      const fetchOrders = async () => {
        try {
          const ordersSnapshot = await getDocs(collection(db, "orders"));
          const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersList);
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      };
  
      // استدعاء الدالة بعد حذف الطلب
      fetchOrders();

    } catch (error) {
      console.error("Error deleting order:", error);
    
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete order.',
        text: 'Please try again.',
      });
    } finally {
      setLoading(false); // إيقاف التحميل بعد الانتهاء
    }
  };

  const handleEditProduct = (product) => {
    setEditproduct(product); // تعيين المنتج الذي يتم تعديله
    setcurrentpage("Edit"); // الانتقال إلى صفحة التعديل
  };

  const handleSaveChanges = async (updatedData) => {
    setLoading(true); // بدء التحميل
    try {
      // البحث عن المستند الذي يحتوي على الحقل id المطلوب
      const q = query(collection(db, "products"), where("id", "==", Editproduct.id));
      const querySnapshot = await getDocs(q);
  
      // إذا لم يتم العثور على أي مستند
      if (querySnapshot.empty) {
        Swal.fire({
          icon: 'error',
          title: 'Product not found',
          text: 'Please try again.',
        });
        return;
      }
  
      // الحصول على document ID
      const documentId = querySnapshot.docs[0].id;
  
      // تحقق من الشرط: إذا كانت type == 'product' ووجود discount
      if (updatedData.type == 'product' && updatedData.discount) {
        
        // حذف الحقول discount و endprice باستخدام deleteField
        updatedData.discount = deleteField();  // حذف حقل discount
        updatedData.endprice = deleteField();  // حذف حقل endprice
        await updateDoc(doc(db, "products", documentId), updatedData);
      
      }
      else{
        
        await updateDoc(doc(db, "products", documentId), updatedData);
    
      }
  
      // تحديث المستند باستخدام document ID
      
  
      Swal.fire({
        icon: 'success',
        title: 'Product updated successfully!',
      });
  
      setEditproduct(); // مسح حالة التعديل
      setcurrentpage("Products"); // العودة إلى صفحة المنتجات
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update product.',
        text: 'Please try again.',
      });
    } finally {
      setLoading(false); // إيقاف التحميل بعد الانتهاء
    }
  };
  const handleSearch = async () => {
    try {
      if (currentpage === "Products") {
        const querySnapshot = await getDocs(
          query(
            collection(db, "products"),
            where("name", ">=", searchQuery),
            where("name", "<=", searchQuery + "\uf8ff")
          )
        );

        setAvproducts(querySnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      } else if (currentpage === "Orders") {
        const querySnapshot = await getDocs(
          query(
            collection(db, "orders"),
            where("productName", ">=", searchQuery),
            where("productName", "<=", searchQuery + "\uf8ff")
          )
        );

        setOrders(querySnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
      }
    } catch (error) {
      console.error("Error searching products: ", error);
    }
  };

  const handleDeleteImage = async (public_id) => {
    setLoading(true); // بدء التحميل
    try {
      // البحث عن المستند الذي يحتوي على الحقل id المطلوب
      const q = query(collection(db, "products"), where("id", "==", Editproduct.id));
      const querySnapshot = await getDocs(q);

      // إذا لم يتم العثور على أي مستند
      if (querySnapshot.empty) {
      
        Swal.fire({
          icon: 'error',
          title: 'Product not found',
          text: 'Please try again.',
        });
        return;
      }

      // الحصول على document ID
      const documentId = querySnapshot.docs[0].id;

      // تحديث قائمة الصور في Firestore (إزالة الصورة المحددة)
      const updatedImages = Editproduct.images.filter(image => image.public_id !== public_id);
      await updateDoc(doc(db, "products", documentId), { images: updatedImages });

    
  

      // تحديث حالة التعديل لعرض التغييرات
      setEditproduct((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    } catch (error) {
      console.error("Error removing image:", error);
      alert("Failed to remove image. Please try again.");
    } finally {
      setLoading(false); // إيقاف التحميل بعد الانتهاء
    }
  };

  const choose = (page) => {
    setcurrentpage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const PreviewProduct = (item, type) => {
    if (type === "product") {
      setShowproduct(item);
      setShoworder();
      setcurrentpage();
    } else {
      setShoworder(item);
      setShowproduct();
      setcurrentpage();
    }
  };

  return (
    <div style={{ minHeight: "80vh", position: 'relative', display: "flex" }}>
      <Sidebar choose={choose} isSidebarOpen={isSidebarOpen} />

      <div className="mainn">
        <div className="head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Hello Mr/Ziad
            <div className="menu" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
              <IoMenu size={30} />
            </div>
          </h1>
          {(currentpage === "Products" || currentpage === "Orders") && (
            <div className="searchbar" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <input
                type="search"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setAvproducts(value?.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                  } else {
                    setSearchQuery(e.target.value);
                  }
                }}
                placeholder="Enter id, name, phone"
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          )}
        </div>

        {loading &&   <div className="loading-container">
      <div className="spinner"></div>
    </div>} {/* عرض حالة التحميل */}

        {currentpage === "Products" && (
          <ProductTable
            products={Avproducts}
            loading={firestoreLoading} // تمرير حالة التحميل من Firestore
            onDelete={deleteProduct}
            onShowDetails={PreviewProduct}
            onEdit={handleEditProduct} // تمرير دالة التعديل
          />
        )}

        {currentpage === "Orders" && (
          <Orderstable orders={orders} deleteorder={deleteorder} loading={loadingOrders} />
        )}

        {currentpage === "Add" && (
          <AddProductForm
            onSubmit={handleSubmit}
            onImageChange={handleImageChange}
            productData={productData}
            loading={loading} // تمرير حالة التحميل العامة
          />
        )}

        {currentpage === "Edit" && Editproduct && (
          <EditProductForm
            product={Editproduct}
            onSave={handleSaveChanges}
            onDeleteImage={handleDeleteImage}
            onAddImages={handleAddImages}
            onBack={() => setcurrentpage("Products")}
          />
        )}

        {Showproduct && (
          <ProductDetails
            product={Showproduct}
            onBack={() => {
              setcurrentpage("Products");
              setShowproduct();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;