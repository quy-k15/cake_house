import React from "react";
import "../styles/Notifications.css";


function NavbarNotification() {
    const NavbarData = [
        {
            title: "Tất cả",
            link:"/Notifications"
        },
        {
            title: "Chưa đọc",
            link:"/UnreadNotifications"
        },
        {
            title: "Đã đọc",
            link:"/ReadNotifications"
        },
    ];
    return (
        <div className="NavbarOrders">
            <div className="List">
                {NavbarData.map((val, key) => {
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
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
            </div>

        </div>
    );
}

export default NavbarNotification;