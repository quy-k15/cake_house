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


  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
 
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        {/* <Link to="/" className="leftSide_home"> Trang chủ </Link>
        <Link to="/menu"> Loại bánh </Link>
        <Link to="/about"> Về chúng tôi </Link> */}
       
        {/* <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/menu"> Menu </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>


        </div> */}
         <div className="logo">
          <img src={Logo} />
        </div>
        <h1>CAKE HOUSE</h1>
       
       
      </div>
      <div className="menu-icons">
        <i onClick={handleClick} className={getlayout()}></i>

      </div>
      {/* <div className="menu-icons" onClick={this.handleClick}>
        <i  className={this.state.clicked?"fas fa-times" : "fas fa-bars"}></i>

      </div> */}
      
      <div onClick={handleClick} className={getmenulayout()}>
        <Link to="/" className="item_menu1"> Trang chủ </Link>
        <Link to="/menu"className="item_menu1"> Loại bánh </Link>
        <Link to="/about"className="item_menu1"> Về chúng tôi </Link>
        <Link to="/myCart"className="item_menu2"> <AccountCircleIcon /> </Link>
        <Link to="/profile"className="item_menu2"> <AccountCircleIcon /> </Link>
        <Link to="/login"className="item_menu2"> <ExitToAppIcon /> </Link>
        {/* <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button> */}
      </div>
    </div>
  );
}

export default Navbar;
