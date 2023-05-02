import React from "react";
import Theme from "../assets/CoverPic.jpg";
import "../styles/About.css";
function About() {
  return (
    <div className="about">
      <div className="aboutTop">
        <img src = {Theme} />
      </div>
      <div className="aboutBottom">
        <h1 class="heading"> <span>about</span> us </h1>
        <div class="content">
                <h3>Good things come to those <span>who bake </span> for others</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis sunt id modi quis in eveniet at! Vero iusto excepturi.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam molestiae maxime quibusdam rem necessitatibus optio maiores fugiat. Pariatur molestiae.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
