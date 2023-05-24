import React, { useState } from "react";
import "../styles/Login.css";
import Cake1 from "../assets/image1.svg";
import Cake2 from "../assets/image2.svg";

const Login= ()=> {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

    return (
    <div className="screen">
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form">
              <h2 class="titlename">Đăng nhập</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Tên người dùng" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Mật khẩu" />
              </div>
              <input type="submit" value="Login" class="btn solid" />
              <p class="social-text">hoặc Đăng nhập qua các nền tảng sau</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="#" class="sign-up-form">
              <h2 class="titlename">Đăng ký</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Tên người dùng" />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Mật khẩu" />
              </div>
              <input type="submit" class="btn" value="Đăng ký" />
              <p class="social-text">hoặc Đăng ký qua các nền tảng sau</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Bạn chưa có tài khoản?</h3>
              <p>
                Đăng ký ngay và cùng tham quan cùng Cake House!
              </p>
              <button class="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                Đăng ký
              </button>
            </div>
            <img src={Cake1} class="image" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>Bạn đã có tài khoản?</h3>
              <p>
                Đăng nhập ngay và cùng khám phá với Cake House nào!
              </p>
              <button class="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
                Đăng nhập
              </button>
            </div>
            <img src = {Cake2} class="image"/>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Login;