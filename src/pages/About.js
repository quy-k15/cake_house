import React from "react";
import Theme from "../assets/CoverPic.jpg";
import Cake from "../assets/cakeab.jpg";
import NhanVien from "../assets/nhanvien.jpg";
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
          <h3>Chuyên cung cấp các loại bánh ngọt</h3>
          <p className="textab">
          Nhận đặt làm theo yêu cầu của kháhc hàng. scabScvbuxiakbkxb ksdksd 
          Các thành phần bánh được sử dụng phổ biến nhất bao gồm bột, đường, trứng, bơ hoặc dầu hoặc bơ thực vật, một chất lỏng và các chất men, như baking soda hoặc bột nở. 
          Các thành phần bổ sung và hương liệu phổ biến bao gồm đồ khô, kẹo, hoặc trái cây tươi, các loại hạt, ca cao và chiết xuất như vani, với nhiều thay thế cho các thành phần chính. 
          Bánh cũng có thể được làm đầy với chất bảo quản trái cây, các loại hạt hoặc các loại sốt tráng miệng (như kem bánh ngọt), đá lạnh với kem bơ hoặc các loại kem khác, và được trang trí với bánh hạnh nhân (marzipan), đường viền trang trí bánh (piped borders) hoặc kẹo trái cây
          </p>
        </div>
      </div>
      <div className="tail">
        <div className="leftTail">
          <h3>Nhân sự</h3>
          <p>
          Chủ tiệm: Nguyễn thị Hồng
          Ngày sinh:03/12/1996 
          Quê quán: Thái Bình
          Tốt nghiệp ngành bánh ngọt của trường Học viện Le Cordon Bleu tại Pháp. 
          Trở về nước vào cuối năm 2016. Xây dựng tiệm bánh Cake House với mong muốn mọi người đều được thưởng thức các loại bánh ngon và chất lượng.

          Đội ngũ nhân viên chuyên nghiệp đã qua đào tạo.
          </p>
        </div>
        <div className="rightTail">
          <img src = {NhanVien} />
        </div>
      </div>
    </div>
  );
}

export default About;
