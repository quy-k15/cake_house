import React from "react";
import OrderDetail from "../components/OrderDetail";
import "../styles/Payment.css";

const CardOrder = () => {
  const products = OrderDetail(); 

  return (
    <div>
      {products.map((product, index) => (
        <div className="list_donhang" key={index}>
          <div className="thumb_donhang">
            <img className="product_img" src={product.image} alt="" />
          </div>
          <div className="info_donhang">
            <div className="title_sanpham">
              <strong>{product.name}</strong>
            </div>
            <div className="mota_donhang">{product.description}</div>
            <div className="detail_donhang">
              <p className="left">SL: {product.quantity}</p>
              <p className="right">Giá: {product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardOrder;
