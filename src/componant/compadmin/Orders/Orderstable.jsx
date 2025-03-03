import React, { useEffect } from 'react';

const Orderstable = ({ orders, loading, deleteorder }) => {
  if (loading) {
    return   <div className="loading-container">
    <div className="spinner"></div>
  </div>; // عرض حالة التحميل
  }
  useEffect(() => {
    const fetch = () => {
      orders.forEach(order => {
        console.log(order.createdAt);
      });
    }
    fetch()
    
  },[])

  return (
    <div className="table-container" style={{ position: 'relative' }}>
      <h1>All Orders</h1>
      {orders.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Time</th>
              <th>Note</th>
              <th>Product</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Price after Discount </th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customerName}</td>
                <td>{order.customerPhone}</td>
                <td>{order.createdAt.toDate().toLocaleString()}</td>
                <td>{order.note ==""?"NO":order.note}</td>
                <td>{order.productName}</td>
                <td>{order.productPrice} EGP</td>
                <td>{order.discount} %</td>
                <td>{order.productPricediscount} EGP</td>
                <td>{order.productQuantity}</td>
                <td>{order.totalPrice} EGP</td>
                <td className='image-cell' >
  
    <img  src={order.productImages[0]}  className="product-image" />
  
</td>


                <td>
                  <button onClick={() => deleteorder(order.productId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default Orderstable;