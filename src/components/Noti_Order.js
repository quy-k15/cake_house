import React,{useState,useEffect} from "react";
import "../styles/Noti_Success.css"
function Noti_Order({ onClose }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
          onClose();
        }, 3000);
    
        return () => clearTimeout(timeout);
      }, [onClose]);
    return(
        
        <div className="Noti_Success">
            <div className="Noti_Sucess_icon">
                <i class="fa-regular fa-circle-check"></i>
            </div>
            <div className="Noti_Sucess_info">
                <h2>Đặt hàng thành công!</h2>
            </div>
            
        </div>
    );
}
export default Noti_Order;
