import React from "react";
import banhkem1_1 from "../assets/BanhKem1_1.png";
import { Button } from "@material-ui/core";
export const NotificationData = [
    {
      title: "XÁC NHẬN THÀNH CÔNG ĐƠN HÀNG",
      image: <img src={banhkem1_1} alt="Bánh kem" />,
      content: "Người bán đã xác nhận cho đơn hàng 123456789 thành công. Vui lòng kiểm tra thời gian nhận hàng dự kiến trong phần chi tiết đơn hàng.",
      time: "12:23 23/06/2023",
      btn_detail:<button>Chi tiết</button>,
      
    },
    {
        title: "ĐANG VẬN CHUYỂN",
        image: <img src={banhkem1_1} alt="Bánh kem" />,
        content: "Đơn hàng với mã đơn hàng 123456789 đã được người bán giao cho đơn vị vận chuyển.",
        time: "12:23 23/06/2023",
        btn_detail:<button>Chi tiết</button>,
    },
    {
      title: "ĐÃ GIAO HÀNG THÀNH CÔNG",
      image: <img src={banhkem1_1} alt="Bánh kem" />,
      content: "Đơn hàng với mã đơn hàng 123456789 đã giao thành công đến bạn. Vui lòng bấm xác nhận đã nhận hàng. ",
      time: "12:23 23/06/2023",
      btn_detail:<button>Chi tiết</button>,
    },
    {
      title: "SIÊU KHUYẾN MÃI NGÀY 7/7",
      image: <img src={banhkem1_1} alt="Bánh kem" />,
      content: "Tặng bạn deal hot giảm 50% cho đơn trên 500K, giảm 30% cho đơn từ 300K đến 500K ",
      time: "12:23 23/06/2023",
      btn_detail:<button>Chi tiết</button>,
    },
  ];
    

    

