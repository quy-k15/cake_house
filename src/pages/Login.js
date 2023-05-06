// import React from "react";
import CoverImg from "../assets/CoverImg.jpg";
import GoogleIcon from "../assets/GoogleIcon.jpg"
import "../styles/Login.css";
//<link ref="stylesheet" href="./build/tailwind.css"></link>
const colors = {
    primary: "#060606",
    background: "#E0E0E0",
    disabled: "#D9D9D9"
}
const Login= ()=> {
    return (
        <div className="screen">
            <div className="leftScreen">
                <div className = "leftText">
                    <h1>Let's shopping your favourite cake!</h1>
                    <p>For our desserts we always use only the natural ingredients. Our production is 100% handmade</p>
                </div>
                <img src = {CoverImg} />
            </div>

            <div className="rightScreen">
                <h1 className="header">Mom's Cake</h1>

                <div className="loginField">
                    <div className="loginHeader">
                        <h3>Login</h3>
                        <p>Welcome Back! Please enter your details.</p>
                    </div>

                    <form>
                        <input placeholder="Email" type="email" />

                        <input placeholder="Password" type="password" />
                    </form>

                    <div className="loginExten">
                        <div className="loginExtenSub">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <p className='text-sm'>Remember me for 30 days</p>
                        </div>

                        <p className="forgot">Forgot Password?</p>
                    </div>

                    <div className="buttonField">
                        <button className="login">
                            Log in
                        </button>
                        <button className="register">
                            Register
                        </button>
                    </div>

                    <div className="option2">
                        <div className="line"></div>
                        <p>or</p>
                    </div>

                    <div className="google">
                        <img src={GoogleIcon} className="icon" />
                        Sign in With Google
                    </div>

                    <div className="loginFooter">
                        <p>Don't have account? <span>Sign up</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;