import React from "react";
import NavbarOrders from "../components/NavbarOrders";
import SideMenu from "../components/SideMenu";
import {OrdersData} from "../components/OrdersData";


function All_Purchase() {
    return (
        <div className="MyOrders">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <NavbarOrders/>
                <div className="all_purchase">
                {OrdersData.map((val, key) => {
                        return (
                            <div
                                className="row"
                                key={key}
                                id={window.location.pathname == val.link ? "active" : ""}
                                onClick={() => {
                                    window.location.pathname = val.link;
                                }}
                            >
                                {""}
                                <div className="ruler_status">
                                    <div id="id">{val.id}</div>
                                    <div id="tradeDate">{val.tradeDate}</div>
                                    <div id="status">{val.status}</div>
                                </div>
                                
                                <div className="detail">
                                    <div className="col1">
                                        <div id="image">{val.image}</div>
                                    </div>
                                    <div className="col2">
                                        <div id="name">{val.name}</div>
                                        <div id="unit_price">{val.unit_price}</div>
                                        <div id="quantity">{val.quantity}</div>
                                    </div>
                                    <div className="col3">
                                        <div id="total_price">{val.total_price}</div>
                                        <button className="buyagain">Mua lại</button>
                                        <button className="rate">Đánh giá</button>
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

export default All_Purchase;