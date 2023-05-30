import React from "react";

function CardCategory({ image, name, coler}) {
  return (
    <div className="menuCategory" style={{ backgroundColor: `#${coler}` }}>
      <div className="Category_img_div" >
        <img className ="Category_img" src={image}></img>
      </div>
      <h2> {name} </h2>
    </div>
  );
}

export default CardCategory;
