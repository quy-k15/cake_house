import React from "react";

function MenuItem({ image, name, price, size }) {
  return (
    <div className="menuItem">
      <div className="menuItem_img" style={{ backgroundImage: `url(${image})` }}> </div>
      <div className="menuPriceItem"> 
        <h2> ${price} </h2>
        <h3> {size}gram </h3>
      </div>
      <div className="menuNameItem">
        <h1> {name} </h1>
        <button> add</button>
      </div>
      
    </div>
  );
}

export default MenuItem;
