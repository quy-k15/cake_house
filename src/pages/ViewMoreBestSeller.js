// ViewMoreCategory.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore/lite";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import CardCake from "../components/CardCake";
// import Slider from "react-slick";
import "../styles/CardCake.css";
import "../styles/Cake_Category_Slide.css";
import "../styles/ViewMoreBestSeller.css";
import CategoryTitle from "../components/CategoryTitle";
import Tiramisu_Category from "../assets/image1.svg";

function ViewMoreBestSeller() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("Category");

  // var img_Category_Slide = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  // };

  const [cakes, setCakes] = useState([]);

  const getCakes = async () => {
    try {
      const q = query(collection(db, 'cakes'), orderBy('sole', 'desc'), limit(8));
      const cakesSnapshot = await getDocs(q);
      const cakesArray = cakesSnapshot.docs.map((doc) => ({
        idcake: doc.id,
        ...doc.data()
      }));
      setCakes(cakesArray);
    } catch (error) {
      console.error('Error fetching cakes:', error);
    }
  };

  useEffect(() => {
    getCakes();
  }, []);

  return (
    <div className="ViewMoreBestSeller">
      <div className="ViewMoreCategory" >
        <CategoryTitle
          image={Tiramisu_Category}
          name="Bán chạy nhất"
        />
        <div className="ListCake">

          {cakes.map((u) => (
            <div key={u.idcake} className="img-customize">
              <Link to={`/detail/${u.idcake}`} style={{ textDecoration: "none" }}>
                <CardCake key={u.idcake} image={u.img1} name={u.name} price={u.price} />
              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
    
  );
}

export default ViewMoreBestSeller;
