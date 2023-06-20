import React from "react";
import Slider from "react-slick";
import "../styles/HomeSlide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img_homecake1 from"../assets/img_homecake1.png";
import img_homecake2 from"../assets/img_homecake11.png";
import img_homecake4 from"../assets/img_homecake4.png";
import img_homecake5 from"../assets/img_homecake10.png";
import img_homecake13 from"../assets/img_homecake13.png";
import img_homecake15 from"../assets/img_homecake15.png";
import img_homecake14 from"../assets/img_homecake14.png";

function HomeSlide() {
    var img_Home_Slide ={
        
        dots:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1
    };
  return (
    <div className="Home_Slide">
      <div className="Home_Slide_img">
        <Slider {...img_Home_Slide} autoplay autoplaySpeed={3000} >
            <div className="img-customize">
                <img className="img_slide" src={img_homecake1}></img>
            </div>
            <div className="img-customize">
                <img className="img_slide" src={img_homecake2}></img>
            </div>
            <div className="img-customize">
                <img className="img_slide" src={img_homecake4}></img>
            </div>
            <div className="img-customize">
                <img className="img_slide" src={img_homecake5}></img>
            </div>
            <div className="img-customize">
                <img className="img_slide" src={img_homecake13}></img>
            </div>
            <div className="img-customize">
                <img className="img_slide" src={img_homecake15}></img>
            </div>
            <div className="img-customize">
                <img className="img_slide" src={img_homecake14}></img>
            </div>
           
        </Slider>
      </div>
      
    </div>
  );
}

export default HomeSlide;
