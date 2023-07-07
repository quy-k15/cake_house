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
        <h1 class="heading"> <span>về</span> chúng tôi </h1>
        <div class="content">
                <h3>Good things come to those <span>who bake </span> for others</h3>
                <p>Chào mừng đến với website bán bánh của chúng tôi! Chúng tôi rất vui được giới thiệu về dịch vụ và sản phẩm mà chúng tôi cung cấp.</p>
                <p>Chúng tôi là một đội ngũ đam mê bánh ngọt và cam kết mang đến cho khách hàng những trải nghiệm tuyệt vời với các loại bánh ngon và đa dạng. Chất lượng là tiêu chí hàng đầu của chúng tôi, và chúng tôi cam kết chỉ sử dụng những nguyên liệu tươi ngon, tự nhiên và an toàn cho sức khỏe.</p>
        </div>
      </div>
      <div className="between">
        <div className="leftBetween">
          <img src = {Cake} />
        </div>
        <div className="rightBetween">
          <h3 class="tieude">Chuyên cung cấp các loại bánh ngọt</h3>
          <p className="textab">
            Trên trang web của chúng tôi, bạn sẽ tìm thấy một bộ sưu tập đa dạng các loại bánh, từ bánh mousse nhẹ nhàng, bánh kem truyền thống, đến bánh cupcake ngon lành và bánh tart tươi ngon. Chúng tôi cũng cung cấp các loại bánh dành cho các dịp đặc biệt như sinh nhật, kỷ niệm, hay đám cưới.<br />
          <br></br>
            Đội ngũ chúng tôi là những người lành nghề, giàu kinh nghiệm và sáng tạo. Chúng tôi không chỉ tạo ra những món bánh ngon mắt mà còn đặc biệt chú trọng vào việc tạo ra những thiết kế bắt mắt và độc đáo. Chúng tôi luôn cố gắng đáp ứng các yêu cầu đặc biệt của khách hàng và tạo ra những món bánh độc đáo và đáng nhớ.<br />
          <br></br>
            Ngoài ra, chúng tôi cũng đảm bảo rằng quy trình đặt hàng và giao hàng của chúng tôi đơn giản và thuận tiện. Bạn có thể dễ dàng chọn món bánh yêu thích và đặt hàng trực tuyến, và chúng tôi sẽ giao hàng tận nơi trong thời gian ngắn nhất.
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
                      <a href="https://www.facebook.com/han.ni.35380" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                      </a>
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
                      <a href="https://www.facebook.com/nhungthaithi239/" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                      <i class="fab fa-twitter"></i>
                      <a href="https://www.instagram.com/nhungthaithi_/" target="_blank">
                        <i class="fab fa-instagram"></i>
                      </a>
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
                      <a href="https://www.facebook.com/profile.php?id=100009301584614" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                      </a>
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
