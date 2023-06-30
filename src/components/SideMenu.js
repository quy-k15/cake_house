// import React, { useState } from "react";
// import "../styles/Profile.css";
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import { SideMenuData } from "./SideMenuData";
// import { Link } from "react-router-dom";

// function SideMenu() {
//   const [clicked, setClicked] = useState(false);

//   return (

//   );
// }

// export default SideMenu;



import React, { useState } from "react";
import "../styles/Profile.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { SideMenuData } from "./SideMenuData";
import { Link } from "react-router-dom";

function SideMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    //     <div className="SideMenu">
//       <div className="sidemenu_icon">
//         <i id="open_sidemenu" className={clicked ? "fa-solid fa-caret-right" : "fa-solid fa-caret-left"}></i>
//       </div>
//       <ul className="SideMenuList">
//         <div className="title">
//           <AccountCircleIcon className="accountCircleIcon" fontSize="large" />
//           <div className="titleh3">
//             <h3>Xin chào Quý!</h3>
//             <Link to="/EditProfile" className="link_edit_profile">
//               <p>Chỉnh sửa thông tin <i className="fas fa-edit"></i></p>
//             </Link>
//           </div>
//         </div>
//         {SideMenuData.map((val, key) => {
//           return (
//             <Link to={val.link} style={{ textDecoration: 'none' }} key={key}>
//               <li
//                 className="row"
//                 id={window.location.pathname === val.link ? "active" : ""}
//               >
//                 <div id="icon">{val.icon}</div>
//                 <div id="title">{val.title}</div>
//               </li>
//             </Link>
//           );
//         })}
//       </ul>
//     </div>
    <div className="D">
      <div className="sidemenu_icon">
        <i
          id="open_sidemenu"
          className={showMenu ? "fas fa-times" : "fas fa-ellipsis-v"}
          onClick={handleClick}
        ></i>
      </div>
      {showMenu && (
        <div className="SideMenu">
        <ul className="SideMenuList">
          <div className="title">
            <AccountCircleIcon className="accountCircleIcon" fontSize="large" />
            <div className="titleh3">
              <h3>Xin chào Quý!</h3>
              <Link to="/EditProfile" className="link_edit_profile">
                <p>Chỉnh sửa thông tin <i className="fas fa-edit"></i></p>
              </Link>
            </div>
          </div>
          {SideMenuData.map((val, key) => {
            return (
              <Link to={val.link} style={{ textDecoration: 'none' }} key={key}>
                <li
                  className="row"
                  id={window.location.pathname === val.link ? "active" : ""}
                >
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </li>
              </Link>
            );
          })}
        </ul>
        </div>
      )}
      <div className="SideMenu_default">
        <div className="SideMenu">
          <ul className="SideMenuList">
            <div className="title">
              <AccountCircleIcon className="accountCircleIcon" fontSize="large" />
              <div className="titleh3">
                <h3>Xin chào Quý!</h3>
                <Link to="/EditProfile" className="link_edit_profile">
                  <p>Chỉnh sửa thông tin <i className="fas fa-edit"></i></p>
                </Link>
              </div>
            </div>
            {SideMenuData.map((val, key) => {
              return (
                <Link to={val.link} style={{ textDecoration: 'none' }} key={key}>
                  <li
                    className="row"
                    id={window.location.pathname === val.link ? "active" : ""}
                  >
                    <div id="icon">{val.icon}</div>
                    <div id="title">{val.title}</div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      
    </div>
    
    
  );
}

export default SideMenu;
