import React from "react";
import "../styles/Profile.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {SideMenuData} from "./SideMenuData";
import { Link } from "react-router-dom";
function SideMenu() {
  return (
    <div className="SideMenu"> 
      <ul className="SideMenuList">
        <div className="title">
          <AccountCircleIcon className="accountCircleIcon" fontSize="large"/>
          <div className="titleh3">
            <h3>Xin chào Quý!</h3>
            <p>Chỉnh sửa thông tin</p>
          </div>
        </div>
        {SideMenuData.map((val,key) => {
          return (
            <Link to = {val.link} style={{ textDecoration: 'none' }}>
              <li 
              className="row" 
              key = {key}
              id={window.location.pathname == val.link ? "active":""} 
              // onClick={() => {window.location.pathname = val.link;
              // }}
              >
                
                {""}
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            </Link>
            
          );
        })}
      </ul>
    </div>
  );
}

export default SideMenu;