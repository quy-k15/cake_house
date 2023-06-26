import React, { useState,useRef } from "react";
import "../styles/Login.css";
import Cake1 from "../assets/image1.svg";
import Cake2 from "../assets/image2.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

// import {useNavigate} from "react-router-dom";
// import { useAuth } from "../components/AuthContext";
// import { AuthProvider } from "../components/AuthContext";
const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };


// =================Hiển thị password================
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // =================== Đăng ký======================
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError]=useState('')
  const [showPasswordDN, setShowPasswordDN] = useState(false);

  const{createUser}=UserAuth()
  const history = useHistory();

  const handlSubmit= async(e)=>{
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try{
      await createUser(email,password)
      history.push('/');
      setError("Đăng ký thành công!");

    }catch(e){
      setError(e.message)
      console.log(e.message)
    }

  }
  // ============ Đăng nhập==============
  const [emailDN,setEmailDN]=useState('')
  const [passwordDN,setPasswordDN]=useState('')
  const [errorDN,setErrorDN]=useState('')
  const {signIn}=UserAuth();
  const handlSubmitSignIn= async(e)=>{
    e.preventDefault();
    setErrorDN('')
    try{
      await signIn(emailDN,passwordDN)
      history.push('/');
    }catch(e){
      setErrorDN(e.message)
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
                <input type="text" placeholder="email"onChange={(e)=>setEmailDN(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type={showPasswordDN ? "text" : "password"} placeholder="Mật khẩu"onChange={(e)=>setPasswordDN(e.target.value)} />
                <i
                  className={`fas ${showPasswordDN ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPasswordDN(!showPasswordDN)}
                ></i>
              </div>
              <input  type="submit" value="Đăng nhập" className="btn solid"  onClick={handlSubmitSignIn}/>
              <p className="social-text">Hoặc Đăng nhập qua các nền tảng sau</p>
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
                <input  type={showPassword ? "text" : "password"} placeholder="Mật khẩu" onChange={(e)=>setPassword(e.target.value)} />
                <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type={showConfirmPassword ? "text" : "password"}  placeholder="Xác nhận mật khẩu"onChange={(e)=>setConfirmPassword(e.target.value)} />
                <i
                  className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                ></i>
              </div>
              <input type="submit" className="btn" value="Đăng ký" onClick={handlSubmit} />
              <p className="error-message">{error}</p>
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