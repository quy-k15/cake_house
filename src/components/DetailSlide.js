import React from "react";
import Slider from "react-slick";
import "../styles/HomeSlide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banhkem1 from "../assets/BanhKem1.png";
import banhkem1_1 from "../assets/BanhKem1_1.png";
import banhkem1_2 from "../assets/BanhKem1_2.png";
import banhkem1_3 from "../assets/BanhKem1_3.png";
import "../styles/DetailSlide.css";
import {ListBestSeller} from "../helpers/ListBestSeller";

import {ListCategory} from "../helpers/ListCategory"

function DetailSlide() {
    var img_Home_Slide ={
        
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1, 
    };
  return (
    <div className="detail_img" >
        <Slider {...img_Home_Slide} 
        customPaging={(i)=>{
            return(
                <div>
                    <img className="detail_list_img" src={ListCategory[i].image} alt=""></img>
                </div>//list lựa chọn dưới img center
            )
        }}
        dotsClass="slick-dots custom-indicator"
        >
            {ListCategory.map((item)=>(
                <div className="detail_img_customize">
                    <img className="img_detail_slide" src={item.image} alt=""></img>
                </div>
            ))}
            </Slider>     
        
    </div>
  );
}
export default DetailSlide;
