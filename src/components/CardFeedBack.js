import React from "react";

function CardFeedBack({ image, name, comment,start }) {
  return (
    <div className="CardFeedBack">
        <div className="FeedBack_User"> 
            <img className="FeedBack_img" src={image}></img>
            <h2>{name}</h2>
        </div>
        <div className="FeedBack_Comment">
            <p>{comment}</p>
        </div>
      
    </div>
  );
}

export default CardFeedBack;
