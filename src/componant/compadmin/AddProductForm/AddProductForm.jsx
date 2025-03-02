import React from 'react';
import Swal from 'sweetalert2';

const AddProductForm = ({ onSubmit, onImageChange, productData, loading }) => {
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [producttype, setProducttype] = React.useState("");
  const [discount, setDiscount] = React.useState(0); 
  const [endprice, setEndPrice] = React.useState(0); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // تحقق من أن جميع الحقول تم تعبئتها
    if (!productName || !productPrice || !productCategory || !productDescription || !producttype || productData.images.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the required fields and upload an image!',
      });
      return; // لا نكمل الحفظ إذا كانت الحقول فارغة أو لم يتم رفع صورة
    }
  
    // تأكد من إرسال الأرقام بدلاً من السلاسل النصية
    const price = parseFloat(productPrice);
    const finalEndPrice = parseFloat(endprice);
    const finalDiscount = parseFloat(discount);
  
    if (producttype === 'product') {
      onSubmit({
        name: productName,
        price: price,
        description: productDescription,
        category: productCategory,
        type: producttype,
      });
    } else {
      onSubmit({
        name: productName,
        price: price,
        description: productDescription,
        category: productCategory,
        type: producttype,
        endprice: finalEndPrice,
        discount: finalDiscount,
      });
    }
  
    // إعادة تعيين القيم الافتراضية بعد حفظ المنتج
    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductDescription("");
    setProducttype("");
    setDiscount(0);
    setEndPrice(0);
  };
  
  return (
    <div className="table-container">
      <h1>Add Product +</h1>
      {loading && <div>Uploading images and adding product...</div>} {/* عرض حالة التحميل */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", margin: "0 auto" }}
      >
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            onChange={(e) => setProductCategory(e.target.value)}
            value={productCategory}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="accessories">Accessories</option>
            <option value="toys">Toys</option>
          </select>
        </div>

        <div className="form-group">
          <label>Type</label>
          <select
            onChange={(e) => setProducttype(e.target.value)}
            value={producttype}
            required
          >
            <option value="product">Select Type</option>
            <option value="product">Product</option>
            <option value="banner">Banner</option>
          </select>
        </div>

        {producttype === "banner" && (
          <>
            <div className="form-group">
              <label>End price</label>
              <input
                type="number"
                value={endprice}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setEndPrice(value);
                  if (value === 0 || value === '') {
                    setDiscount(0);
                  } else {
                    const percent = (((parseFloat(productPrice) - value) * 100) / parseFloat(productPrice)).toFixed(1);
                    setDiscount(percent);
                  }
                }}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label>Percent discount %</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                placeholder="Percent discount"
                required
              />  
            </div>
          </>
        )}

        <div className="form-group">
          <label>Upload Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
            required
          />
        </div>

        <button style={{ width:"300px",padding:'20px 15px',fontSize:"1.4rem",fontWeight:"600",marginTop:"50px" }} type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* عرض معاينة الصور بعد اختيارها */}
      {productData.images.length > 0 && (
        <div className="image-preview">
          <h3>Selected Images:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {productData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
