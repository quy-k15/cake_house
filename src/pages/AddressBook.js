import React from "react";
import "../styles/AddressBook.css";
import SideMenu from "../components/SideMenu";
import EditAddressForm from '../components/EditAddressForm';
import CustomizedDialogs from '../components/dialog';
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState,useEffect } from "react";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import CardAddress from '../components/CardAddress';
function AddressBook() {
    const { user } = UserAuth();
    const [idUser, setIdUser] = useState('');
    // console.log("user_id",user&&user.idUser);
    const [email,setEmail]  = useState('');
    const [userinfo,setUser]  = useState();

    // const SetEmails = () => {
    //     setEmail(user&&user.idUser);
    // };
   
    useEffect(() => {
        if (user) {
          setEmail(user.email);
        }
      }, [user]);
    
    const UserQuery = async () => {
      
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUser(doc.data());
            console.log("userinfo: ", userinfo);
        }
    };
    useEffect(() => {
        if (email) {
          UserQuery();
        }
      }, [email]);
        // Hiển thị các địa chỉ lên giao diện
    const [Address, setAddress] = useState([]);
    const getAddress = async () => {
      try {
        const addressSnapshot = await getDocs(collection(db, 'Address'));
        const addressArray = addressSnapshot.docs.map((doc) => ({
          idAddress: doc.id,
          ...doc.data()
        }));
        setAddress(addressArray);
        console.log("addressArray",addressArray)
        console.log("Address",Address)
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    useEffect(()=>{
      getAddress();
    },[]);
    const currentUserid = userinfo?.idUser; 
    const filteredAddresses = Address.filter((address) => address.iduser === currentUserid);
    console.log('filteredAddresses:', filteredAddresses);
    return (
        <div className="contact">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
            {filteredAddresses.map((cardAddress, key) => {
                const addressIndex = Address.findIndex((address) => address.idAddress === cardAddress.idAddress);
                return (
                  <CardAddress
                    key={key}
                    nameUser={cardAddress.name}
                    phoneNumber={cardAddress.phoneNumber}
                    address={cardAddress.province + cardAddress.district + cardAddress.ward}
                  />
                );
              })}

                <div className="btn_add_address">
                    <CustomizedDialogs title="Thêm địa chỉ mới">
                        <EditAddressForm />
                    </CustomizedDialogs>
                </div>
            </div>
        </div>
    );
}

export default AddressBook;