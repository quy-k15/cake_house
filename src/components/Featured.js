import { useState, useEffect } from "react";
import "../styles/Featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

const Featured = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const percentage = (totalRevenue / 2000000) * 100;

  useEffect(() => {
    const getTotalRevenue = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("status", "==", "Hoàn thành")
        );
        const ordersSnapshot = await getDocs(q);
        let revenue = 0;
        ordersSnapshot.forEach((doc) => {
          const order = doc.data();
          revenue += order.allPrice;
        });
        setTotalRevenue(revenue);
      } catch (error) {
        console.log("Error getting total revenue:", error);
      }
    };

    getTotalRevenue();
  }, []);

  return (
    
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng doanh thu</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div>Đạt</div>
        <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Doanh thu đặt ra</p>
        <p className="amount">Thu được: {totalRevenue/1000}.000 VND</p>
      </div>
    </div>
  );
};

export default Featured;
