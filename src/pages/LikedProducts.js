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
                                    <div id="icon">{val.icon}</div>
                                    <div id="title">{val.title}</div>
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