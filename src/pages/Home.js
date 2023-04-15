import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import "../styles/Home.css";
import { MenuList } from "../helpers/MenuList";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";

function Home() {
  return (
    <div>
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <h1> Pedro's Pizzeria </h1>
          <p> PIZZA TO FIT ANY TASTE</p>
          <Link to="/menu">
            <button> ORDER NOW </button>
          </Link>

        </div>
      </div>
      <div className="menu">
        <h1 className="menuTitle">Our Menu</h1>
        <div className="menuList">
          {MenuList.map((menuItem, key) => {
            return (
              <MenuItem
                key={key}
                image={menuItem.image}
                name={menuItem.name}
                price={menuItem.price}
              />
            );
          })}
        </div>
      </div>
    </div>
    
    
  );
}

export default Home;
