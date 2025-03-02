import React, { useState } from 'react';
import axios from 'axios';

const EditProductForm = ({ product, onSave, onDeleteImage, onBack, onAddImages }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [type, settype] = useState(product.type);
  const [endprice, setendprice] = useState(product.endprice);
  const [discount, setdiscount] = useState(product.discount);
  const [newImages, setNewImages] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]); // حالة لتخزين الملفات الجديدة

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const imagePreviews = files.map(file => URL.createObjectURL(file));
      setNewImages(imagePreviews);
      setFilesToUpload(files); // تخزين الملفات الجديدة للتحميل لاحقًا
    } else {
      console.warn("No files selected.");
    }
  };

  const uploadNewImages = async (files) => {
    const uploadedImages = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Eshop-react");
      formData.append("cloud_name", "dab3zstzc");
  
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dab3zstzc/image/upload",
          formData
        );
        if (response.data.secure_url && response.data.public_id) {
          uploadedImages.push({
            url: response.data.secure_url,
            public_id: response.data.public_id,
          });
        } else {
          console.error("Image upload failed", response);
          alert("Failed to upload one or more images.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload images. Please try again.");
        return;
      }
    }
    return uploadedImages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pricee = parseFloat(price);
    const finalEndPrice = parseFloat(endprice);
    const finalDiscount = parseFloat(discount);
    let uploadedImages = [];
    if (filesToUpload.length > 0) {
      uploadedImages = await uploadNewImages(filesToUpload);
    }

    // التأكد من أن الصور تم تحميلها بنجاح
    if (uploadedImages.length === 0 && filesToUpload.length > 0) {
      alert("Failed to upload images.");
      return;
    }

    // دمج الصور القديمة مع الصور الجديدة
    const allImages = [...product.images, ...uploadedImages]; // دمج الصور القديمة والجديدة

    // إرسال البيانات مع الصور المدمجة إلى الدالة onSave
    if(type=='product' && discount){
      onSave({
        name: name,
        price: pricee,
        description: description,
        category: category,
        type:type,images:allImages
      ,endprice:finalEndPrice,discount:finalDiscount
      })
    }
      else if(type=='product'){
      onSave({
        name: name,
        price: pricee,
        description: description,
        category: category,
        type:type,images:allImages
      });
    }else if(type=='banner'){
      onSave({
        name: name,
        price: pricee,
        description: description,
        category: category,
        type:type,endprice:finalEndPrice,discount:finalDiscount,images:allImages
      });
    }

    // مسح الحالات بعد الحفظ
    setNewImages([]);
    setFilesToUpload([]);
  };

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      <button className="back-button" onClick={onBack}>Back</button>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="accessories">Accessories</option>
            <option value="toys">Toys</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            onChange={(e) => settype(e.target.value)}
            value={type}
            required
          >
            <option value="">Select Type</option>
            <option value="product">Product</option>
            <option value="banner">Banner</option>
        
          </select>
        </div>
        {type=="banner" &&  (<><div className="form-group">
          <label>End price</label>
          <input
            type="number"
            value={endprice }
            
            
            onChange={(e) => {setendprice(e.target.value)
              if(e.target.value==0 ||e.target.value==''){
                setdiscount(0)
              }else{
                const percent=(((price-e.target.value)*100)/price).toFixed(1)
                setdiscount(percent)
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
            
            placeholder="Percent discount"
            required
          />  
        </div></>)}


          <div className="image-preview">
        <h3>Product Images:</h3>
        <div className="images-container">
          {product.images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.url} alt={`Product ${index}`} />
              <button type='button' onClick={() => onDeleteImage(image.public_id)}>Delete Image</button>
            </div>
          ))}

          {newImages.length > 0 && (
            <div className="image-item">
              <h4>New Images:</h4>
              {newImages.map((imagePreview, index) => (
                <img key={index} src={imagePreview} alt={`New Image ${index}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="add-images">
        <h3>Add New Images:</h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

        <button type="submit">Save Changes</button>
      </form>

    </div>
  );
};

export default EditProductForm;
