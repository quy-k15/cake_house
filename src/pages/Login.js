import React from "react";
import CoverImg from "../assets/CoverImg.jpg";
const colors = {
    primary: "#060606",
    background: "#E0E0E0",
    disabled: "#D9D9D9"
}

function Login () {
    return (
        <div className="LoginForm">
            <div className="leftForm">
                <img src = {CoverImg} className = "w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default Login;