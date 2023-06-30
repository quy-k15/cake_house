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
import { collection, getDocs, doc, docs, query, where, orderBy, limit } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardCake from "../components/CardCake";
// import { useCollectionData } from 'react-firebase-hooks/firestore';

function BestSeller_Slide() {
  
    var img_Category_Slide ={
        
        dots:false,
        infinite:true,
        speed:500,
        slidesToShow:4,
        slidesToScroll:1
    };

    const [cakes,setcakes]=useState([]);

    // const getCakes = async () => {
    //     try {
    //       const cakesSnapshot = await getDocs(collection(db, 'cakes'));
    //       const cakesArray = cakesSnapshot.docs.map((doc) => ({
    //         idcake: doc.id,
    //         ...doc.data()
    //       }));
    //       setcakes(cakesArray);
    //     } catch (error) {
    //       console.error('Error fetching cakes:', error);
    //     }
    //   };
    //   useEffect(()=>{
    //     getCakes();
    //   },[]);

    const getCakes = async () => {
        try {
          const q = query(collection(db, 'cakes'), orderBy('sole', 'desc'), limit(8));
          const cakesSnapshot = await getDocs(q);
          const cakesArray = cakesSnapshot.docs.map((doc) => ({
            idcake: doc.id,
            ...doc.data()
          }));
          setcakes(cakesArray);
        } catch (error) {
          console.error('Error fetching cakes:', error);
        }
      };
      
      useEffect(() => {
        getCakes();
      }, []);

  
  
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

export default BestSeller_Slide;
