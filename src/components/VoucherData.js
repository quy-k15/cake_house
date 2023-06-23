import React from "react";
import Logo_Cake from "../assets/Logo_Cake.png";
import freeship from "../assets/car.png";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from "@material-ui/core";
export const VoucherData = [
    {
      title: "GIẢM 5%",
      image: <img src={Logo_Cake} alt="Bánh kem" />,
      content: "Đơn tối thiểu 50k giảm tối đa 50k",
      time: "HSD: 30/07/2023",
      icon_time: <AccessTimeIcon/>,
      icon_btn: <ArrowForwardIosIcon/>,
      btn_use: <button>Dùng ngay</button>,
      
    },
    {
      title: "GIẢM 10%",
      image: <img src={Logo_Cake} alt="Bánh kem" />,
      content: "Đơn tối thiểu 200k giảm tối đa 50k",
      time: "HSD: 30/07/2023",
      icon_time: <AccessTimeIcon/>,
      icon_btn: <ArrowForwardIosIcon/>,
      
    },
    {
      title: "GIẢM 15%",
      image: <img src={Logo_Cake} alt="Bánh kem" />,
      content: "Đơn tối thiểu 500k giảm tối đa 100k",
      time: "HSD: 30/07/2023",
      icon_time: <AccessTimeIcon/>,
      icon_btn: <ArrowForwardIosIcon/>,
      
    },
    {
      title: "MIỄN PHÍ VẬN CHUYỂN",
      image: <img src={freeship} alt="Bánh kem" />,
      content: "Đơn tối thiểu 200k, áp dụng cho đơn hàng trong thành phố Hồ Chí Minh",
      time: "HSD: 30/07/2023",
      icon_time: <AccessTimeIcon/>,
      icon_btn: <ArrowForwardIosIcon/>,
    },
    {
      title: "MIỄN PHÍ VẬN CHUYỂN",
      image: <img src={freeship} alt="Bánh kem" />,
      content: "Đơn tối thiểu 0k, giảm tối đa 15k",
      time: "HSD: 30/07/2023",
      icon_time: <AccessTimeIcon/>,
      icon_btn: <ArrowForwardIosIcon/>,
    },
    
  ];
    

    

