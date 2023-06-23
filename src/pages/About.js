import React from "react";
import Theme from "../assets/CoverPic.jpg";
import Cake from "../assets/AB.png";
import Baker1 from "../assets/bakerman.png";
import Baker2 from "../assets/bakergirl.png";
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
      <div className="between">
        <div className="leftBetween">
          <img src = {Cake} />
        </div>
        <div className="rightBetween">
          <h3 class="tieude">Chuyên cung cấp các loại bánh ngọt</h3>
          <p className="textab">
            Nhận đặt làm theo yêu cầu của khách hàng.<br />
            Các thành phần bánh được sử dụng phổ biến nhất bao gồm bột, đường, trứng, bơ hoặc dầu hoặc bơ thực vật, một chất lỏng và các chất men, như baking soda hoặc bột nở.<br />
            <br></br>
            Các thành phần bổ sung và hương liệu phổ biến bao gồm đồ khô, kẹo, hoặc trái cây tươi, các loại hạt, ca cao và chiết xuất như vani, với nhiều thay thế cho các thành phần chính.<br />
            Bánh cũng có thể được làm đầy với chất bảo quản trái cây, các loại hạt hoặc các loại sốt tráng miệng (như kem bánh ngọt), đá lạnh với kem bơ hoặc các loại kem khác, và được trang trí với bánh hạnh nhân (marzipan), đường viền trang trí bánh (piped borders) hoặc kẹo trái cây.
          </p>
        </div>
      </div>
      <div class="team" id="team">
        <h1 class="heading">our  <span>team</span></h1>
        <div class="box-container">
            <div class="box">
                <div class="imagestaff">
                  <img src = {Baker1} />
                </div>
                <div class="content">
                    <h3 class="staffname">tran van quy</h3>
                    <p class="position">CEO</p>
                    <div class="share">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="imagestaff">
                  <img src = {Baker2} />
                </div>
                <div class="content">
                    <h3 class="staffname">thai thi nhung</h3>
                    <p class="position">manager</p>
                    <div class="share">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="imagestaff">
                  <img src = {Baker2} />
                </div>
                <div class="content">
                    <h3 class="staffname">nguyen thi kim thuy</h3>
                    <p class="position">manager</p>
                    <div class="share">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
            </div>

      </div>

    </div>

    </div>
  );
}

export default About;
