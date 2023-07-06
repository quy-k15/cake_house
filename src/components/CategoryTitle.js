import React from "react";
import "../styles/CategoryTitle.css";

function CategoryTitle({ image, name}) {
  return (
    <div className="CategoryTitle_cpn">
      <div className="CategoryTitle_img_div_cpn" >
        <img className ="CategoryTitle_img_cpn" src={image}></img>
      </div>
      <div className="CategoryTitle_info_cpn">
        <h2>{name}</h2>
      </div>
    
    </div>

  );
}

export default CategoryTitle;