import React from "react";
import "../styles/LikedProducts.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {LikedProductData} from "../components/LikedProductData";
import SideMenu from "../components/SideMenu";
function LikedProducts() {
    return (
        <div className="full">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <div className="LikeProduct">
                    <ul className="ProductList">
                    <div className="categories">
                        <p className="spyt">Sản phẩm yêu thích</p>
                        <p className="sl">Số lượng còn lại </p>
                        <p className="dg">Đơn giá</p>
                        <p className="tt">Thao tác</p>
                    </div>
                        {LikedProductData.map((val, key) => {
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

                                    <div id="image">{val.image}</div>
                                    <div id="name">{val.name}</div>
                                    <div id="count">{val.count}</div>
                                    <div id="price">{val.price}</div>
                                    <div id="icon">{val.icon}</div>
                                    <div id="icon1">{val.icon1}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div >
        </div>

        
    );
}

export default LikedProducts;