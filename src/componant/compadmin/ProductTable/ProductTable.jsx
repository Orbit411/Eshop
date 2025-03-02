import React from 'react';

const ProductTable = ({ products, loading, onDelete, onShowDetails,onEdit }) => {
  if (loading) {
    return   <div className="loading-container">
    <div className="spinner"></div>
  </div>; // عرض حالة التحميل
  }

  return (
    <div className="table-container" style={{ position: 'relative' }}>
      <h1>All Products</h1>
      {products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>discount</th>
              <th>endprice</th>

              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price} EGP</td>
                <td>{product.discount ? product.discount:0 }%</td>
                <td>{product.endprice ? product.endprice:product.price } EGP</td>

                <td style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                  {product.images.map((image, imgIndex) => (
                    <img key={imgIndex} src={image.url} alt={`Product ${imgIndex}`} className="product-image" />
                  ))}
                </td>
                <td>
                <button onClick={() => onEdit(product)}>Edit</button>
                  <button onClick={() => onDelete(product.id)}>Delete</button>
                  <button onClick={() => onShowDetails(product, "product")}>Show</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default ProductTable;