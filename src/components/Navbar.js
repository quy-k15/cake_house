import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/Navbar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
      <Link to="/"> Loại bánh </Link>
        <Link to="/menu"> Quốc gia </Link>
        <Link to="/about"> Về chúng tôi </Link>
        <img src={Logo} />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/menu"> Menu </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>

        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/menu"> Menu </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/profile"> <AccountCircleIcon /> </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
