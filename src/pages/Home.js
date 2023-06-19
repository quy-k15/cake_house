import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import "../styles/Home.css";
import { MenuList } from "../helpers/MenuList";
import {ListCategory} from "../helpers/ListCategory"
import {ListBestSeller} from "../helpers/ListBestSeller"
import CardCategory from "../components/CardCategory";
import CardCake from "../components/CardCake";
import img_background_Name from "../assets/img_background_Name.png";
import MenuItem from "../components/MenuItem";
import header1 from "../components/header";
// import "../styles/Menu.css";
import "../styles/CardCake.css"
import "../styles/Header.css"

import logo from"../assets/Logo_Cake.png";
import home_img from "../assets/img_home.png";
import img_cakehome1 from "../assets/img_cakehome1.png"
import img_cakehome2 from "../assets/img_cakehome2.png"
import img_cakehome3 from "../assets/img_cakehome3.png"
import img_cakehome4 from "../assets/img_cakehome4.png"
import img_cakehome5 from "../assets/img_cakehome5.png"//*
import img_cakehome6 from "../assets/img_cakehome6.png"
import img_cakehome7 from "../assets/img_cakehome7.png"//*
import img_cakehome8 from "../assets/img_cakehome8.png"
import img_cakehome9 from "../assets/img_cakehome9.png"//*
import img_cakehome10 from "../assets/img_cakehome10.png"//*
import img_cakehome11 from "../assets/img_cakehome11.png"
import img_homevorcher from "../assets/img_HomeVorcher.png"
import img_HomeGreen from "../assets/img_HomeGreen.png";
import img_HomeOareng from "../assets/img_HomeOreng.png";
import img_HomePink from "../assets/img_HomePink.png";
import backgroudHome from "../assets/backgroundHome.png"
import backgroud from "../assets/background.png"
import { useState, useEffect } from "react";
import HomeSlide from "../components/HomeSlide";



function Home() {



  const defaultStyle = {
    backgroundColor: "",
    color: ""
  };
  const hoverStyle = {
    backgroundColor: "#8F3C02",
    color: "white"
  };




//   const [currentSlide, setCurrentSlide] = useState(0);
//   const handleNextClick = () => {
//     const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
//     setCurrentSlide(nextSlide);
//  }
 
//  const handlePreviousClick = () => {
//     const previousSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
//     setCurrentSlide(previousSlide);
//  }
//  const slides = [
//   require('../assets/img_homecake1.png'),
//   require('../assets/img_homecake2.png'),
//   require('../assets/img_homecake3.png'),
//   require('../assets/img_homecake4.png'),
//   require('../assets/img_homecake5.png')
// ];
  


  const [style1, setStyle1] = useState(defaultStyle);
  const [style2, setStyle2] = useState(defaultStyle);
  return (
    <div className="home">
      <div className="home_wellcome" >
        <div className="img_home_div">
          <HomeSlide />
        
        </div>
    
        <div className="HomeName">
       
          <h1>Cake</h1>
          <img src={logo}></img>
          <h1>House</h1>

        </div>
      </div>
      <div className="home_slogan">
        <h2> Cake house</h2>
        <img src={logo}></img>
     
        <h5>Bánh nhà làm. Đặc biệt ngon như nhà làm!</h5>
      </div>

       
      <div className="Category">
        <div class="my-div">
              <div class="line1"></div>
              <div class="BestSeller"> 
                <h2>Những loại bánh của Cake House</h2>
              </div>
              <div class="line2"></div>

          </div>
          <div className="HomeCategory">
            {ListCategory.map((cardCategory, key) => {
              return (
                <CardCategory
                  key={key}
                  image={cardCategory.image}
                  name={cardCategory.name}
                  coler={cardCategory.coler}
                />
              );
            })}
          </div>
          <div className="ViewMore">
          <Link to="/menu">
            <button className="btn_ViewMore"style={style1}
              onMouseEnter={() => setStyle1(hoverStyle)}
              onMouseLeave={() => setStyle1(defaultStyle)}> Xem thêm </button>
          </Link>
        </div>
        <div className="home_voucher" style={{backgroundImage: `url(${img_homevorcher})`}}>
            <h5>FLAT SALES</h5>
            <div className="home_voucher_persen">
              <h2>50</h2>
              <h7>%</h7>
            </div>
            <h4>15/8 - 27/8</h4>
        </div>
      </div>

      <div className="BackgroundBe">
        <div class="my-div">
          <div class="line1"></div>
          <div class="BestSeller"> 
            <h2>Bánh bán chạy nhất</h2>
          </div>
          <div class="line2"></div>

        </div>
        <div className="HomeBestSeller">
          {ListBestSeller.map((cardCake, key) => {
            return (
              <Link to="/detail" className="BestSeller">
                <CardCake
                key={key}
                image={cardCake.image}
                name={cardCake.name}
                price = {cardCake.price}
                size = {cardCake.size}
              />            
              </Link>
              
            );
          })}
        </div>
        <div className="ViewMore">
          <Link to="/menu">
            <button className="btn_ViewMore"style={style2}
              onMouseEnter={() => setStyle2(hoverStyle)}
              onMouseLeave={() => setStyle2(defaultStyle)}> Xem thêm </button>
          </Link>
        </div>

      </div>
      <div className ="Home_Introduce">
        <div className="Home_Infomation">
          <div className="Home_Infomation_Name">
            <p>Cake House</p>
          </div>
          <div className="Home_Infomation_1">
            <p>Chuyên cung cấp những loại bánh cao cấp, được làm thủ công hoàn toàn bằng nguyên liệu chất lượng cao.</p>
            <p>Hương vị ngọt ngào từ những miếng bánh đầu tiên. Chinh phục được cả những khách hàng khó tính nhất.</p>
            <p>Phù hợp với các tiệc trà, buổi sinh nhật, bữa ăn thân mật,...</p>
          </div>
        </div>
        <div className="Home_Introduce_Img">
          <div className="Introduce_Img">
            <div className="Intro_img_1_div">
              <img className="Intro_img_1" src={img_HomeGreen}></img>
            </div>
            <div className="Intro_img_2_div">
              <img className="Intro_img_2" src={img_HomeOareng}></img>
            </div>
          </div>

          <div className="Introduce_Img3">
            <img className="Intro_img_3" src={img_HomePink}></img>
          </div>

        </div>
        
      </div>
        
        
    </div>
    
    
  );
}

export default Home;
