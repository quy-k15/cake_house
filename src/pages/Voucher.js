import React from "react";
import SideMenu from "../components/SideMenu";
import "../styles/Voucher.css";
import {VoucherData} from "../components/VoucherData";

function Voucher() {
    return (
        <div className="Voucher">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <div className="all_voucher">
                    {VoucherData.map((val, key) => {
                        return (
                            <div
                                className="row_voucher"
                                key={key}
                                // id={window.location.pathname == val.link ? "active" : ""}
                                // onClick={() => {
                                //     window.location.pathname = val.link;
                                // }}
                            >
                                {""}
                                
                                <div className="detail_voucher">
                                    <div className="col1">
                                        <div id="image">{val.image}</div>
                                    </div>
                                    <div className="col2">
                                        <div id="title">{val.title}</div>
                                        <div id="content">{val.content}</div>
                                        <div id="time">{val.time}</div>
                                    </div>
                                    <div className="col3">
                                        <button id="btn_use">
                                            Dùng ngay
                                            <div id="icon_btn">{val.icon_btn}</div>
                                        </button>
                                        
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

export default Voucher;