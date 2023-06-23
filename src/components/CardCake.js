import React from "react";

function CardCake({ image, name, price, size }) {
  return (
    <div className="CardCake">
      <div className="CardCake_img" style={{ backgroundImage: `url(${image})` }}> </div>
      <div className="CakeName"> 
        <h2> {name} </h2>
      </div>
      <div className="CakePrice">
        <h2> {price}đ </h2>
        <button className="bntCakeAdd"> add</button>
      </div>
      
    </div>
  );
}

export default CardCake;
