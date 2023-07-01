import React,{useState,useEffect} from "react";
import "../styles/Noti_LogOut.css"
import ic_Logout from "../assets/img_ic_Noti_LogOut.png"
function Noti_LogOut({ onClose }) {
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
                <h2>Đăng xuất thàng công!</h2>
            </div>
        </div>
    );
}
export default Noti_LogOut;
