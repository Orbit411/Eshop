import React from 'react';

const ProductDetails = ({ product, onBack }) => {
  return (
    <>
      <h1 className='head-Details'>Product Details</h1>
      <button className='back' onClick={onBack}>Back</button>
      <div className="info-product">
        <div className="name-prodct">Name:  {product.name}</div>
        <div className="price-prodct">Price:  {product.price}$</div>
        <div className="cat-prodct">Category:  {product.category}</div>
        <div className="cat-prodct">discount:  {product.discount ? product.discount:0 }%</div>
        <div className="cat-prodct">endprice:  {product.endprice ? product.endprice:product.price }$</div>
        <div className="des-prodct">Description:  {product.description}</div>
        <div className="image-prodct">
          {product.images.map((item, index) => (
            <img key={index} src={item.url} alt="" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;