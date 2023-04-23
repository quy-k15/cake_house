import React from "react";

function CardCategory({ image, name}) {
  return (
    <div className="menuCategory">
      <div className="Category_img" style={{ backgroundImage: `url(${image})` }}> </div>
      <h2> {name} </h2>
    </div>
  );
}

export default CardCategory;
