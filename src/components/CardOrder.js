
import "../styles/Payment.css";
import { db } from "../firebase";
import React,{useState,useEffect} from "react";
import { collection, getDocs,doc,docs, query, where, } from 'firebase/firestore/lite';

const CardOrder = ({  size, num,idcake }) => {
  const [cakes, setCakes] = useState([]);

  const fetchCakesWithQuery = async () => {
    const q = query(collection(db, "cakes"), where("idcake", "==", idcake));
    const querySnapshot = await getDocs(q);
    const cakesArray = querySnapshot.docs.map((doc) => ({
      idcake: doc.id,
      ...doc.data()
    }));
    setCakes(cakesArray);
    console.log("cakes",cakes);
    console.log("idcake",idcake);
  
  };

  useEffect(() => {
    fetchCakesWithQuery();
  }, [idcake]);

  return (
    <div>
   
   {cakes.length > 0 ? (
      <div className="list_donhang">
        <div className="thumb_donhang">
          <img className="product_img" src={cakes[0].img1} alt="" />
        </div>
        <div className="info_donhang">
          <div className="title_sanpham">
            <strong>{cakes[0].name}</strong>
          </div>
          <div className="detail_donhang">
            <p className="left">SL: {num}</p>
            <p className="left2">Size: {size}</p>
            <p className="right">Giá: {cakes[0].price * num/1000}.000 đ</p>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )}
    </div>
  );
};

export default CardOrder;
