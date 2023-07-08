import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../styles/CardCake.css";
import "../styles/Cake_Category_Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img_homecake1 from "../assets/img_homecake1.png";
import img_homecake2 from "../assets/img_homecake11.png";
import img_homecake4 from "../assets/img_homecake4.png";
import img_homecake5 from "../assets/img_homecake10.png";
import img_homecake13 from "../assets/img_homecake13.png";
import img_homecake15 from "../assets/img_homecake15.png";
import img_homecake14 from "../assets/img_homecake14.png";
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { Link } from "react-router-dom";
import CardCake from "../components/CardCake";

function BestSeller_Slide() {
  const [slidesToShow, setSlidesToShow] = useState(4);
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


  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Di chuyển đến đầu trang
    // Tiếp tục chuyển hướng đến trang khác
  };
  return (
    <div className="CartCake_Slide">
      <div className="CartCake_Slide_item">
        <Slider {...img_Category_Slide}>
          {cakes.map((u) => (
            <div key={u.idcake} className="img-customize">
              <Link to={`/detail/${u.idcake}`} style={{ textDecoration: "none" }} onClick={handleScrollToTop}>
                <CardCake key={u.idcake} image={u.img1} name={u.name} price={u.price} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default BestSeller_Slide;
