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
// import "../styles/Menu.css";
import "../styles/CardCake.css"
import home_img1 from "../assets/img_home1.png";
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


  const [style1, setStyle1] = useState(defaultStyle);
  const [style2, setStyle2] = useState(defaultStyle);
  return (
    <div className="home">
      <div >
        <img className ="home_img" src={home_img1}></img>
        <div></div>
      </div>

      <div className="home_sologan">
        <div className="home_sologan1">
   
          <h1>Bánh nhà làm </h1>
          <h1>Hương vị mẹ yêu </h1>
        </div>
        <div className="home_sologan2">
          
          <h3>Bánh được làm thủ công không chất bảo quản. Hương vị .....</h3>
          <h3>saucbyjhcbWIBCSIALHCDSULACBIL</h3>
          <h3>CDSULACBILdhcbaeudbibvdueaihbCDSULACBILdhcbaeudbibvdueaihb</h3>
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
                <Link to="/detail">
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
