import React from "react";
import "../styles/AddCake.css";
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function SideMenuAdmin() {
    const SideMenuData = [
        {
            title: "Trang chủ",
            icon: <i class="fas fa-store"></i>,
            link: "/likedproducts"
        },
        {
            title: "Quản lý sản phẩm",
            icon: <i class="fas fa-shopping-bag"></i>,
            link: "/addcake"
        },
        {
            title: "Quản lý đơn hàng",
            icon: <ListAltIcon />,
            link: "/AllPurchase"
        },
    ];
    return (
        <div className="SideMenuAdmin">
            <div className="SideMenu">
                <ul className="SideMenuList">
                    <div className="title">
                        <AccountCircleIcon className="accountCircleIcon" fontSize="large" />
                        <div className="titleh3">
                            <h3>ADMIN</h3>
                        </div>
                    </div>
                    {SideMenuData.map((val, key) => {
                        return (
                            <li
                                className="row"
                                key={key}
                                id={window.location.pathname == val.link ? "active" : ""}
                                onClick={() => {
                                    window.location.pathname = val.link;
                                }}
                            >
                                {""}
                                <div id="icon">{val.icon}</div>
                                <div id="title">{val.title}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        
    );
}

export default SideMenuAdmin;