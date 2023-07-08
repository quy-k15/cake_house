
import "../styles/AddressBook.css"
import { db } from "../firebase";
import React,{useState,useEffect} from "react";
import { collection, getDocs,doc,docs,deleteDoc, query, where,updateDoc, } from 'firebase/firestore/lite';

const CardAddressUsed = ({name,phonenum,address,isused}) => {


//CSS cho button
  const defaultStyle = {
    backgroundColor: "",
    color: ""
  };
  const hoverStyle = {
    backgroundColor: "#8F3C02",
    color: "white"
  };
  const [apDungText, setApDungText] = useState('');
  useEffect(() => {
    if (isused) {
      setApDungText("Đang áp dụng");
    } else {
      setApDungText("Không áp dụng");
    }
  }, [isused]);

  return (
    <div className="cover-address">
      <div className="address-info">
          <p id="name">{name} - {phonenum} -{apDungText}</p>
          <p>{address}</p>
      </div>
      
    </div>
  );
};

export default CardAddressUsed;
