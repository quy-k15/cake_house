import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <>
    <div className="footer">
      <div class="box-container">

        <div class="box">
          <h3>Địa chỉ</h3>
          <p>Cửa hàng bánh ngọt CakeHouse <br></br> Đường Hàn Thuyên, khu phố 6, Thủ Đức, Thành phố Hồ Chí Minh</p>
          <div class="share">
            <i class='bx bxl-facebook' ></i>
            <i class='bx bxl-twitter' ></i>
            <i class='bx bxl-instagram' ></i>
            <i class='bx bxl-linkedin' ></i>
          </div>
        </div>
        <div class="box">
          <h3>E-mail</h3>
          <a href="#" class="link">webcake@gmail.com</a>
          <a href="#" class="link">webcake@gmail.com</a>
        </div>

        <div class="box">
          <h3>Số điện thoại</h3>
          <p>09 1412 4869</p>
          <p>09 1412 4869</p>
        </div>

        <div class="box">
          <h3> Thời gian mở cửa</h3>
          <p>Thứ 2 - Thứ 6: 9:00 - 23:00 <br></br> Thứ 7: 8:00 - 24:00 </p>
        </div>
      </div>

    <div class="credit">Đặt hàng ngay để thưởng thức những chiếc bánh chất lượng từ <span>CakeHouse</span></div>

    </div>
  </>
  );
  }
export default Footer;
