import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <>
    <div className="footer">
      <div class="box-container">

        <div class="box">
          <h3>address</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias sit debitis.</p>
          <div class="share">
            <i class='bx bxl-facebook' ></i>
            <i class='bx bxl-twitter' ></i>
            <i class='bx bxl-instagram' ></i>
            <i class='bx bxl-linkedin' ></i>
          </div>
        </div>
        <div class="box">
          <h3>E-mail</h3>
          <a href="#" class="link">ninjashub4@gmail.com</a>
          <a href="#" class="link">ninjashub4@gmail.com</a>
        </div>

        <div class="box">
          <h3>call us</h3>
          <p>+61 (2) 1478 2369</p>
          <p>+61 (2) 1478 2369</p>
        </div>

        <div class="box">
          <h3> opening hours</h3>
          <a>Monday - Friday: 9:00 - 23:00</a>
          <a> Saturday: 8:00 - 24:00 </a>
        </div>
      </div>

    <div class="credit">created by <span>group cake</span> all rights reserved! </div>

    </div>
  </>
  );
  }
export default Footer;
