import React from "react";
import "../styles/CategoryLeft.css";

function CategoryLeft({ image, name,num}) {
  return (
    <div className="CategoryLeft_cpn">
      <div className="CategoryLeft_img_div_cpn" >
        <img className ="CategoryLeft_img_cpn" src={image}></img>
      </div>
      <div className="CategoryLeft_info_cpn">
        <h1>{num}.</h1>
        <h2>{name}</h2>
      </div>
    
    </div>

  );
}

export default CategoryLeft;