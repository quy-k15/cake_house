import React, { useState,useRef } from "react";
import "../styles/Login.css";
import Cake1 from "../assets/image1.svg";
import Cake2 from "../assets/image2.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
// import { useAuth } from "../components/AuthContext";
// import { AuthProvider } from "../components/AuthContext";
const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  // const { signup } = useAuth();

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   signup(emailRef.current.value, passwordRef.current.value);
  // }


  // =========================================
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError]=useState('')

  const{createUser}=UserAuth()

  const handlSubmit= async(e)=>{
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try{
      await createUser(email,password)

    }catch(e){
      setError(e.message)
      console.log(e.message)
    }

  }

  return (
    <div className="screen">
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="Login.java" className="sign-in-form">
              <h2 className="titlename">Đăng nhập</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="email"  />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Mật khẩu" />
              </div>
              <input type="submit" value="Đăng nhập" className="btn solid" />
              <p className="social-text">hoặc Đăng nhập qua các nền tảng sau</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="Login.java" className="sign-up-form">
              <h2 className="titlename">Đăng ký</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email"onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Mật khẩu" onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Xác nhận mật khẩu"onChange={(e)=>setConfirmPassword(e.target.value)} />
              </div>
              <input type="submit" className="btn" value="Đăng ký" onClick={handlSubmit} />
              <p className="social-text">hoặc Đăng ký qua các nền tảng sau</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Bạn chưa có tài khoản?</h3>
              <p>Đăng ký ngay và cùng tham quan cùng Cake House!</p>
              <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                Đăng ký
              </button>
            </div>
            <img src={Cake1} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Bạn đã có tài khoản?</h3>
              <p>Đăng nhập ngay và cùng khám phá với Cake House nào!</p>
              <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
                Đăng nhập
              </button>
            </div>
            <img src={Cake2} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;