
import "../styles/AddressBook.css"
import { db } from "../firebase";
import React,{useState,useEffect} from "react";
import { collection, getDocs,doc,docs,deleteDoc, query, where, } from 'firebase/firestore/lite';

const CardAddress = ({name,phonenum,address,id}) => {



  const handleDelete = async (id) => {
    try {
      // Delete the address from Firestore
      await deleteDoc(doc(db, 'Address', id));
      // Perform any additional actions as needed after deleting the address
    } catch (error) {
      console.error('Error deleting address:', error);
    }
    console.log("id",id)
  };
  return (
    <div className="cover-address">
      <div className="address-info">
          <p id="name">{name} - {phonenum}</p>
          <p>{address}</p>
      </div>
      <div className="edit">
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash-alt" onClick={() => handleDelete(id)}></i>
      </div>
    </div>
  );
};

export default CardAddress;
