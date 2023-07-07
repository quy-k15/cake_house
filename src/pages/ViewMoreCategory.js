// ViewMoreCategory.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import CardCake from "../components/CardCake";
import Slider from "react-slick";
import "../styles/CardCake.css";
import "../styles/Cake_Category_Slide.css";
import "../styles/ViewMoreCategory.css";
import CategoryTitle from "../components/CategoryTitle";
import Tiramisu_Category from "../assets/image1.svg";

function ViewMoreCategory({dataFromParent}) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("Category");

  var img_Category_Slide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [cakes, setCakes] = useState([]);

  const fetchCakesWithQuery = async () => {
    const q = query(collection(db, "cakes"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const cakesArray = querySnapshot.docs.map((doc) => ({
      idcake: doc.id,
      ...doc.data(),
    }));
    setCakes(cakesArray);
    console.log(cakesArray);
  };

  useEffect(() => {
    fetchCakesWithQuery();
  }, [category]);

  return (
    <div className="ViewMoreCategory" >
      <CategoryTitle
            image={Tiramisu_Category}
            name={category}
        />
      <div className="ListCake">
        
          {cakes.map((u) => (
            <div key={u.idcake} className="img-customize">
              <Link to={`/detail/${u.idcake}?Category=${dataFromParent}`} style={{ textDecoration: "none" }}>
                <CardCake key={u.idcake} image={u.img1} name={u.name} price={u.price} />
              </Link>
            </div>
          ))}
        
      </div>
    </div>
  );
}

export default ViewMoreCategory;
