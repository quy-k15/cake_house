import React from "react";
import "../styles/MyOrders.css";


function NavbarOrders() {
    const NavbarData = [
        {
            title: "Tất cả",
            link:"/"
        },
        {
            title: "Chờ xác nhận",
            link:"/"
        },
        {
            title: "Đang giao",
            link:"/"
        },
        {
            title: "Hoàn thành",
            link:"/"
        },
        {
            title: "Đã hủy",
            link:"/"
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

export default NavbarOrders;