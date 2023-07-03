import React, { useState,useEffect  } from "react";

import "../styles/SideMenuAdmin.css";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { db } from "../firebase";

const SideMenuAdmin = () => {
  const [sidebarClosed, setSidebarClosed] = useState(false);
  const history = useHistory();
  const {user,logout}=UserAuth();
  const handleLogout=async()=>{
    try{
        
        await logout();
        history.push('/login');
        console.log('you are looged out');

  
    }catch(e){
        console.log(e.message);
    }
}

  return (
    <>
      <nav className={sidebarClosed ? "sidebar close" : "sidebar"}>
        <header>
          <div className="image-text">
            <span className="image">
              {/* <img src="logo" alt="" /> */}
            </span>

            <div className="text logo-text">
              <span className="name">CakeHouse</span>
              <span className="profession">Shopping Cake</span>
            </div>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box" onClick={() => setSidebarClosed(false)}>
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              <Link to="/Dashboard" className="nav-link">
               <i className="bx bx-home-alt icone"></i>
               <span className="text nav-text">Trang chủ</span>
                </Link>
              
              <Link to="/ProductList" className="nav-link">
                <i className='bx bx-store icone'></i>
                  <span className="text nav-text">Sản phẩm</span>
              </Link>

              <Link to="/Order" className="nav-link">
                <i className='bx bx-cart icone'></i>
                <span className="text nav-text">Đơn đặt hàng</span>
              </Link>

            </ul>
          </div>

          <div className="bottom-content"  onClick={handleLogout} >
             
              <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Đăng xuất</span>
             
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideMenuAdmin;
