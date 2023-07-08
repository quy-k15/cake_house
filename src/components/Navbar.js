import React, { useState } from "react";
import Logo from "../assets/Logo_Cake.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/Navbar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
function Navbar() {

  // ======= Thanh thu gọn header===========
  // state = {clicked: false};
  // handleclick =()=>{
  //   this.setState({clicked:
  //     !this.state.clicked});
  // }

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const getlayout = () => {
    if (isClicked) {
      return "fas fa-times";
    } else {
      return "fas fa-bars";
    }
  };
  const getmenulayout = () => {
    if (isClicked) {
      return "rightSide_activity";
    } else {
      return "rightSide";
    }
  };

  const defaultStyle = {
    backgroundColor: "",
    color: ""
};
const hoverStyle = {
    backgroundColor: "white",
    color: "#CD8042"
};

  const [style1, setStyle1] = useState(defaultStyle);
  const [style2, setStyle2] = useState(defaultStyle);
  const [style3, setStyle3] = useState(defaultStyle);
  const [style4, setStyle4] = useState(defaultStyle);
  const [style5, setStyle5] = useState(defaultStyle);

  const [style6, setStyle6] = useState(defaultStyle);

  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
 
  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Di chuyển đến đầu trang
    // Tiếp tục chuyển hướng đến trang khác
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
         <div className="logo">
          <img src={Logo} />
        </div>
        <h1>CAKE HOUSE</h1>
       
      </div>
      <div className="menu-icons">
        <i onClick={handleClick} className={getlayout()}></i>
      </div>   

      <div onClick={handleClick} className={getmenulayout()}>
        {/* <div className="navbar_header">
          <div className="Search-box">
            <div className="Search-input">
              <input type="text"className="Search-text"></input>
            </div>
            <button className="Search_btn"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div> */}
        
        <div className="navbar_header" style={style1}
                            onMouseEnter={() => setStyle1(hoverStyle)}
                            onMouseLeave={() => setStyle1(defaultStyle)}>
          <Link to="/" className="item_menu1" onClick={handleScrollToTop}> 
            <div className="icon"><i class="fa-solid fa-house"></i></div>
            <div className="navbar_title">Trang chủ</div>
          </Link>
        </div>
        <div className="navbar_header" style={style2}
                            onMouseEnter={() => setStyle2(hoverStyle)}
                            onMouseLeave={() => setStyle2(defaultStyle)}>
          <Link to="/CategoryCake" className="item_menu1" onClick={handleScrollToTop}>
            <div className="icon"><i class="fa-solid fa-cake-candles"></i></div>
            <div className="navbar_title">Loại bánh </div>
          </Link>
        </div>
        <div className="navbar_header" style={style3}
                            onMouseEnter={() => setStyle3(hoverStyle)}
                            onMouseLeave={() => setStyle3(defaultStyle)}>
          <Link to="/about"className="item_menu1" onClick={handleScrollToTop}>
            <div className="icon"><i class="fa-solid fa-users"></i></div>
            <div className="navbar_title"> Về chúng tôi</div>
          </Link>
          
        </div>
        <div className="navbar_header" style={style4}
                            onMouseEnter={() => setStyle4(hoverStyle)}
                            onMouseLeave={() => setStyle4(defaultStyle)}>
          <Link to="/myCart"className="item_menu1" onClick={handleScrollToTop}> 
            <div className="icon2"><i class="fa-solid fa-cart-shopping"></i></div>
            <div className="navbar_title2"> Giỏ hàng</div>
           </Link>
        </div>
        <div className="navbar_header" style={style5}
                            onMouseEnter={() => setStyle5(hoverStyle)}
                            onMouseLeave={() => setStyle5(defaultStyle)}>
          <Link to="/profile"className="item_menu2" onClick={handleScrollToTop}>
            <div className="icon2"><AccountCircleIcon /> </div> 
            <div className="navbar_title2"> Trang cá nhân</div>
          </Link>
        </div>

        {/* <div className="navbar_header" style={style6}
                            onMouseEnter={() => setStyle6(hoverStyle)}
                            onMouseLeave={() => setStyle6(defaultStyle)}>
          <Link to="/login"className="item_menu2">
            <div className="icon2"><ExitToAppIcon /> </div> 
            <div className="navbar_title2"> Đăng nhập</div>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
