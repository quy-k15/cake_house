import React,{useState,useEffect} from "react";
import "../styles/Noti_LogOut.css"
import ic_Logout from "../assets/img_ic_Noti_LogOut.png"
function Error_Need_Login({ onClose }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
          onClose();
        }, 3000);
    
        return () => clearTimeout(timeout);
      }, [onClose]);
    return(
        
        <div className="Noti_LogOut">
            <div className="Noti_LogOut_div">
                <img className="Noti_LogOut_img" src={ic_Logout}></img>
            </div>
            <div className="Noti_Sucess_info">
                <h2>Bạn cần đăng nhập!</h2>
            </div>
        </div>
    );
}
export default Error_Need_Login;
