
import "../styles/AddressBook.css"
import { db } from "../firebase";
import React,{useState,useEffect} from "react";
import { collection, getDocs,doc,docs, query, where, } from 'firebase/firestore/lite';

const CardAddress = ({name,phonenum,address}) => {
  return (
    <div className="cover-address">
      <div className="address-info">
          <p id="name">{name} - {phonenum}</p>
          <p>{address}</p>
      </div>
      <div className="edit">
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default CardAddress;
