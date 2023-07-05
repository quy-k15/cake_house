import React from "react";
import Slider from "react-slick";
import "../styles/CardCake.css";
import "../styles/Cake_Category_Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img_homecake1 from"../assets/img_homecake1.png";
import img_homecake2 from"../assets/img_homecake11.png";
import img_homecake4 from"../assets/img_homecake4.png";
import img_homecake5 from"../assets/img_homecake10.png";
import img_homecake13 from"../assets/img_homecake13.png";
import img_homecake15 from"../assets/img_homecake15.png";
import img_homecake14 from"../assets/img_homecake14.png";
import { collection, getDocs,doc,docs, query, where, } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardCake from "../components/CardCake";
// import { useCollectionData } from 'react-firebase-hooks/firestore';

function Cake_category_slide({dataFromParent}) {
    // console.log("Category:", dataFromParent);
    const [slidesToShow, setSlidesToShow] = useState(4);
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 610) {
          setSlidesToShow(1);
        } else if (window.innerWidth < 900) {
          setSlidesToShow(2);
        } else if (window.innerWidth < 1250) {
          setSlidesToShow(3);
        } else {
          setSlidesToShow(4);
        }
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    var img_Category_Slide = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1
    };

    const [cakes, setCakes] = useState([]);

  const fetchCakesWithQuery = async () => {
    const q = query(collection(db, "cakes"), where("category", "==", dataFromParent));
    const querySnapshot = await getDocs(q);
    const cakesArray = querySnapshot.docs.map((doc) => ({
      idcake: doc.id,
      ...doc.data()
    }));
    setCakes(cakesArray);
  };

  useEffect(() => {
    fetchCakesWithQuery();
  }, [dataFromParent]);

  
  
  return (
    <div className="CartCake_Slide">
      <div className="CartCake_Slide_item">
        <Slider {...img_Category_Slide} > 
          {cakes.map((u) => (
            <div key={u.idcake} className="img-customize">
              <Link to={`/detail/${u.idcake}`} style={{ textDecoration: "none" }}>
                <CardCake   key={u.idcake} image={u.img1} name={u.name} price={u.price} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      
    </div>
  );
}

export default Cake_category_slide;
