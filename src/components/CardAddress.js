
import "../styles/AddressBook.css"
import { db } from "../firebase";
import React,{useState,useEffect} from "react";
import { collection, getDocs,doc,docs,deleteDoc, query, where,updateDoc, } from 'firebase/firestore/lite';

const CardAddress = ({name,phonenum,address,id,currentUserid,isused}) => {


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
  const [style1, setStyle1] = useState(defaultStyle);
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
  const handleApply = async () => {
    try {
      // Cập nhật địa chỉ đã chọn thành used=true
      await updateDoc(doc(db, 'Address', id), { used: true });

      // Lấy danh sách các địa chỉ khác với cùng iduser
      const querySnapshot = await getDocs(collection(db, 'Address'));
      const addressesToUpdate = querySnapshot.docs
        .filter(doc => doc.data().iduser === currentUserid && doc.id !== id)
        .map(doc => ({ id: doc.id, data: doc.data() }));

      const updatePromises = addressesToUpdate.map(address => {
        return updateDoc(doc(db, 'Address', address.id), { used: false });
      });

      await Promise.all(updatePromises);

      console.log("Address updated successfully!");
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };
  return (
    <div className="cover-address">
      <div className="address-info">
          <p id="name">{name} - {phonenum} -{apDungText}</p>
          <p>{address}</p>
      </div>
      <div className="edit">
          <button id="btn_ApDung" style={style1}
                      onMouseEnter={() => setStyle1(hoverStyle)}
                      onMouseLeave={() => setStyle1(defaultStyle)}  onClick={handleApply}>Áp dụng</button>
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash-alt" onClick={() => handleDelete(id)}></i>
      </div>
    </div>
  );
};

export default CardAddress;
