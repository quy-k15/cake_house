import React from "react";
import "../styles/CategoryLeft.css";

function CategoryRight({ image, name,num}) {
  return (
    <div className="CategoryRight_cpn">
      <div className="CategoryRight_info_cpn">
        <h1>{num}.</h1>
        <h2>{name}</h2>
      </div>
      <div className="CategoryRight_img_div_cpn" >
        <img className ="CategoryRight_img_cpn" src={image}></img>
      </div>
    
    </div>

  );
}

export default CategoryRight;