import React from "react";
import NavbarOrders from "../components/NavbarOrders";
import SideMenu from "../components/SideMenu";
import {OrdersData} from "../components/OrdersData";


function CancelledPurchase() {
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
                                    <div id="id">
                                        {val.id}
                                        <div id="id_inf">123456789</div>
                                    </div>
                                    
                                    <div id="tradeDate">
                                        {val.tradeDate}
                                        <div id="tradeDate_inf">12/06/2023</div>
                                    </div>
                                    <div id="status">
                                        {val.status}
                                        <div id="status_inf">Còn hàng</div>
                                    </div>
                                    <div >
                                        <button id="btn_detail">
                                            Xem chi tiết <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    
                                </div>
                                
                                <div className="detail_purchase">
                                    <div className="col1">
                                        <div id="image">{val.image}</div>
                                    </div>
                                    <div className="col2">
                                        <div id="name">{val.name}</div>
                                        <div id="unit_price">
                                            {val.unit_price}
                                            <div id="unit_price_inf">100.000 (VND)</div>
                                        </div>
                                        <div id="quantity">
                                            {val.quantity}
                                            <div id="quantity_inf">02</div>
                                        </div>
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

export default CancelledPurchase;