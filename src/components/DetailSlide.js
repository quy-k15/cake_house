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
import { collection, doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { useState, useEffect } from "react";


function DetailSlide({dataFromParent}) {
    // const [cakes,setCakes]=useState([]);
    console.log("idcake:", dataFromParent);

 
    var img_Home_Slide ={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1, 
    };
    const [cakes,setCake]=useState([]);
    const [imgs, setImg]=useState([]);
    const setImgs = () => {
      if (cakes.length > 0) {
        const { img1, img2, img3, img4 } = cakes[0];
        setImg([img1, img2, img3, img4]);
      }
    };

    
    const getCake = async () => {
        try {
            const cakeRef = doc(collection(db, "cakes"), dataFromParent);
            const cakeSnapshot = await getDoc(cakeRef);
          if (cakeSnapshot.exists()) {
            const cakeData = cakeSnapshot.data();
            setCake([cakeData]);
            console.log("cake detailslide",cakeData);
          } else {
            console.error("Cake not found.");
          }
        } catch (error) {
          console.error("Error fetching cake:", error);
        }
    };
    // useEffect(()=>{
       
    //     getCake();
    //     setImgs();
    // },[idcake])
    useEffect(() => {
      getCake();
    }, [dataFromParent]);
    
    useEffect(() => {
      setImgs();
      console.error("list imgs:", imgs);
    }, [cakes]);

  return (
    <div className="detail_img" >
        <Slider {...img_Home_Slide} 
        customPaging={(i) => {
            // const slideIndex = document.querySelector(".slick-current").getAttribute("data-index");
    return (
      <div>
        <img className="detail_list_img" src={imgs[i]} alt=""></img>



        {/* <img className="detail_list_img" src={img[slideIndex]} alt=""></img> */}
      </div>
    )
  }}
        dotsClass="slick-dots custom-indicator"
        >
            {/* {ListCategory.map((item)=>(
                <div className="detail_img_customize">
                    <img className="img_detail_slide" src={item.image} alt=""></img>
                </div>
            ))} */}
            
                {/* {cakes.map((item) => {
                console.log("Image img1:", item.img1);
                return (
                    <div className="detail_img_customize">
                    <img className="img_detail_slide" src={item.img1} alt=""></img>
                    </div>
                );
                })} */}



                {imgs.map((item, index) => (
                  <div className="detail_img_customize" key={index}>
                    <img className="img_detail_slide" src={item} alt=""></img>
                  </div>
                ))}
         
            
            </Slider>     
    </div>
  );
}
export default DetailSlide;
