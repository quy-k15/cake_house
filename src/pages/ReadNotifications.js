import React from "react";
import NavbarNotification from "../components/NavbarNotification";
import SideMenu from "../components/SideMenu";
import "../styles/Notifications.css";
import {NotificationData} from "../components/NotificationData";


function ReadNotifications() {
    return (
        <div className="Notification">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <NavbarNotification/>
                <div className="all_notification">
                    {NotificationData.map((val, key) => {
                        return (
                            <div
                                className="row_notification"
                                key={key}
                                // id={window.location.pathname == val.link ? "active" : ""}
                                // onClick={() => {
                                //     window.location.pathname = val.link;
                                // }}
                            >
                                {""}
                                
                                <div className="detail_notification">
                                    <div className="col1">
                                        <div id="image">{val.image}</div>
                                    </div>
                                    <div className="col2">
                                        <div id="title">{val.title}</div>
                                        <div id="content">{val.content}</div>
                                        <div id="time">{val.time}</div>
                                    </div>
                                    <div className="col3">
                                        <div id="btn_detail">{val.btn_detail}</div>
                                        {/* <button id="btn_detail">Chi tiết </button> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>   
           
        </div>
    );
}

export default ReadNotifications;