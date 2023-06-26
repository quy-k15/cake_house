import React, { useState } from "react";

import "../styles/SideMenuAdmin.css";
import { Link } from "react-router-dom";

const SideMenuAdmin = () => {
  const [sidebarClosed, setSidebarClosed] = useState(false);

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
              {/* <li className="nav-link">
                <a href="Dashboard">
                  <i className="bx bx-home-alt icone"></i>
                  <span className="text nav-text">Trang chủ</span>
                </a>
              </li> */}
              
              <Link to="/ProductList" className="nav-link">
                <i className='bx bx-store icone'></i>
                  <span className="text nav-text">Sản phẩm</span>
              </Link>
{/* 
              <li className="nav-link">
                <a href="ProductList">
                <i className='bx bx-store icone'></i>
                  <span className="text nav-text">Sản phẩm</span>
                </a>
              </li> */}

              <Link to="/Order" className="nav-link">
                <i className='bx bx-cart icone'></i>
                <span className="text nav-text">Đơn đặt hàng</span>
              </Link>

              {/* <li className="nav-link active">
                <a href="Order">
                <i className='bx bx-cart icone'></i>
                  <span className="text nav-text">Đơn đặt hàng</span>
                </a>
              </li> */}
            </ul>
          </div>

          <div className="bottom-content">
              <Link to="/login" className="nav-link">
              <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Đăng xuất</span>
              </Link>
            {/* <li className="">
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Đăng xuất</span>
              </a>
            </li> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideMenuAdmin;
