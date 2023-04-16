import React from "react";
import "../styles/Profile.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {SideMenuData} from "./SideMenuData";
function SideMenu() {
  return (
    <div className="SideMenu"> 
      <ul className="SideMenuList">
        <div className="title">
          <AccountCircleIcon className="accountCircleIcon" fontSize="large"/>
          <div>
            <h3>Xin chào Quý!</h3>
            <p>Chỉnh sửa thông tin</p>
          </div>
        </div>
        {SideMenuData.map((val,key) => {
          return (
            <li className="row" key = {key} onClick={() => {window.location.pathname = val.link;
            }}
            >
              {""}
              <div className="content">{val.icon}</div>
              <div>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideMenu;