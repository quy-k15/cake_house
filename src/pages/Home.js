import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import "../styles/Home.css";
import { MenuList } from "../helpers/MenuList";
import {ListCategory} from "../helpers/ListCategory"
import {ListBestSeller} from "../helpers/ListBestSeller"
import CardCategory from "../components/CardCategory";
import CardCake from "../components/CardCake";
import MenuItem from "../components/MenuItem";
import header1 from "../components/header";
// import "../styles/Menu.css";
import "../styles/CardCake.css"
import "../styles/Header.css"
import home_img from "../assets/img_home.png";
import img_cakehome1 from "../assets/img_cakehome1.png"
import img_cakehome2 from "../assets/img_cakehome2.png"
import img_cakehome3 from "../assets/img_cakehome3.png"
import img_cakehome4 from "../assets/img_cakehome4.png"
import img_cakehome5 from "../assets/img_cakehome5.png"
import img_cakehome6 from "../assets/img_cakehome6.png"
import img_homevorcher from "../assets/img_HomeVorcher.png"
import backgroudHome from "../assets/backgroundHome.png"
import backgroud from "../assets/background.png"
import { useState } from "react";

function Home() {
  const defaultStyle = {
    backgroundColor: "",
    color: ""
  };
  const hoverStyle = {
    backgroundColor: "#8F3C02",
    color: "white"
  };

  const [style, setStyle] = useState(defaultStyle);

  const [style1, setStyle1] = useState(defaultStyle);
  const [style2, setStyle2] = useState(defaultStyle);
  return (
    <div className="home">
      <div className="home_wellcome" >
        <div className="home_sologan">
          <h5>Cake House</h5>
          <h6>Bánh nhà làm</h6>
          <h6>Đặc biệt ngon như nhà làm!</h6>
          <ul>
            <li>Mua bánh online nhận ngay ưu đãi hấp dẫn</li>
            <li>Bánh 100% được làm thủ công</li>
            <li>Đảm bảo chất lượng an toàn thực phẩm</li>
          </ul>
          <div className="ViewMore">
          <Link to="/menu">
            <button className="btn_MuaNgay"style={style}
              onMouseEnter={() => setStyle(hoverStyle)}
              onMouseLeave={() => setStyle(defaultStyle)}> MUA NGAY </button>
          </Link>
          </div>
        </div>
        <div className ="wellcome_img" >
          <img className ="home_img" src={img_cakehome5}></img>
        </div>

      </div>
  

      {/* <div className="HomeCategory">
        <div className="CakeCategory">
          {ListCategory.map((cardCategory, key) => {
            return (
              <CardCategory
                key={key}
                image={cardCategory.image}
                name={cardCategory.name}

              />
            );
          })}
        </div>
      </div> */}
      {/* <header1
        name="Những loại bánh của Cake House"

      /> */}
    
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
     

     

      <div className="BackgroundWhite">
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
        
        
    </div>
    
    
  );
}

export default Home;
