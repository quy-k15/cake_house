import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import "../styles/Widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ProductList from "../admin/ProductList";
import Order from "../admin/Order";

const Widget = ({ type }) => {
  let data = {};

  // Temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "order":
      data = {
        title: "ĐƠN HÀNG",
        isMoney: false,
        link: (
          <a href="Order">
            Xem tất cả đơn hàng
          </a>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "productlist":
      data = {
        title: "SẢN PHẨM",
        isMoney: true,
        link: (
          <a href="ProductList">
            Xem tất cả sản phẩm
          </a>
        ),
        icon: (
          <StorefrontIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      
      break;
    default:
      break;
  }

  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const getOrderCount = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const count = ordersSnapshot.size;
        setOrderCount(count);
      } catch (error) {
        console.log("Error getting orders count:", error);
      }
    };

    const getProductCount = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "cakes"));
        const count = productsSnapshot.size;
        setProductCount(count);
      } catch (error) {
        console.log("Error getting products count:", error);
      }
    };

    if (type === "order") {
      getOrderCount();
    }
    else if (type === "productlist") {
      getProductCount();
    }
  }, [type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        {type === "order" && <span className="counter">{orderCount}</span>}
        {type === "productlist" && <span className="counter">{productCount}</span>}
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
