import React from "react";
import { Link } from "react-router-dom";
import { ListCart } from "../helpers/ListCart";
import CardCart from "../components/CardCart";
import "../styles/MyCart.css"

import {ListBestSeller} from "../helpers/ListBestSeller"
import {ListFeedBack} from "../helpers/ListFeedBack"
import { useState } from "react";

function MyCart(){
    
    return(
        <div className="MyCart">
            <div className="MyCart_header">
                <input type="radio" name="html"></input>
                <h3 className="MyCart_header_sp">Sản phẩm</h3>
                <h3 className="MyCart_header_pr">Đơn giá</h3>
                <h3 className="MyCart_header_num">Số lượng</h3>
                <h3 className="MyCart_header_allpr">Số tiền</h3>
            </div>
            <div className="MyCart_List">
                {ListCart .map((cardCart, key) => {
                return (
                <CardCart
                    key={key}
                    image={cardCart.image}
                    name={cardCart.name}
                    price ={cardCart.price}
                    size={cardCart.size}
            
                />
                );
                })}
            </div>
            

        </div>
    );
}
export default MyCart;