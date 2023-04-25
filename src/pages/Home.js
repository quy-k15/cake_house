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
import "../styles/Menu.css";
import "../styles/CardCake.css"
import home_img1 from "../assets/img_home1.png";


function Home() {
  return (
    <div className="home">
      <div >
        <img className ="home_img" src={home_img1}></img>
        {/* <div className="headerContainer">
          <h1> Pedro's Pizzeria </h1>
          <p> PIZZA TO FIT ANY TASTE</p>
          <Link to="/menu">
            <button> ORDER NOW </button>
          </Link>

        </div> */}
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

              />
            );
          })}
        </div>
        <div className="ViewMore">
          <Link to="/menu">
            <button className="btn_ViewMore"> Xem thêm </button>
          </Link>
        </div>
        <div className="HomeBestSeller">
          {ListBestSeller.map((cardCake, key) => {
            return (
              <CardCake
                key={key}
                image={cardCake.image}
                name={cardCake.name}
                price = {cardCake.price}
                size = {cardCake.size}

              />
            );
          })}
        </div>
        
    </div>
    
    
  );
}

export default Home;
