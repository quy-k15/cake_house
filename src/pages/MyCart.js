import React from "react";
import { Link } from "react-router-dom";
import { ListCart } from "../helpers/ListCart";
import CardCart from "../components/CardCart";
import "../styles/MyCart.css"

import {ListBestSeller} from "../helpers/ListBestSeller"
import {ListFeedBack} from "../helpers/ListFeedBack"
import { useState } from "react";

function MyCart(){
    const [isChecked, setIsChecked] = useState(false);
    return(
        <div className="MyCart">
            <div className="MyCart_header">
                <div className="CardCart_input_all_div"> 
                    <label class="CardCart_input_all">
                        <input type="checkbox"/>
                        <span class="checkmark_all"></span>
                    </label>
                </div>
                <h3 className="MyCart_header_sp">Sản phẩm</h3>
                <h3 className="MyCart_header_pr">Đơn giá</h3>
                <h3 className="MyCart_header_num">Số lượng</h3>
                <h3 className="MyCart_header_allpr">Số tiền</h3>
            </div>
            <div className="MyCart_List">
                {ListCart .map((cardCart, key) => {
                return (
                <CardCart
                    // key={key}
                    // image={cardCart.image}
                    // name={cardCart.name}
                    // price ={cardCart.price}
                    // size={cardCart.size}
                    key={key}
                    image={cardCart.image}
                    name={cardCart.name}
                    price={cardCart.price}
                    size={cardCart.size}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
            
                />
                );
                })}
            </div>
            <div className="summary">
                <div className="div_select">
                    <div id="selected">Đã chọn: </div>
                    <div id="select_number">2</div>

                    <button id="btn_delete">Xóa</button>
                </div>
                
                <div className="div_total_price">
                    <div id="total_price">Tổng thanh toán: </div>
                    <div id="total_price_number">300.000</div>
                    <button id="btn_buy">Mua hàng</button>
                </div>
                
            </div>

        </div>
    );
}
export default MyCart;