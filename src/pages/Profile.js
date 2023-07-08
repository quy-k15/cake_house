import React from "react";
import user1 from "../assets/user1.png";
import "../styles/Profile.css";
import SideMenu from "../components/SideMenu";
import { UserAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import Noti_LogOut from "../components/NoTi_LogOut";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { db } from "../firebase";
import CardAddressUsed from "../components/CardAddressUsed";

function Profile() {
    const {user,logout}=UserAuth();
    const [userinfo,setUser]  = useState();
    const [email,setEmail]  = useState('');
    const [usedAddresses, setUsedAddresses] = useState([]);

    const history = useHistory();
    // Hiển thị thông báo khi add vô giỏ hàng thàng công
    const [showNoti, setShowNoti] = useState(false);
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
            console.log("user: ", userinfo);
        }
    };
    useEffect(() => {
        if (email) {
          UserQuery();
          getAddress();
        }
      }, [email]);
     
      const getAddress = async () => {
        try {
          const addressSnapshot = await getDocs(collection(db, 'Address'));
          const addressArray = addressSnapshot.docs.map((doc) => ({
            idAddress: doc.id,
            ...doc.data()
          }));
          const currentUserid = userinfo?.idUser; 
          const usedAddresses = addressArray.filter((address) => address.used === true&& address.iduser === currentUserid);
          setUsedAddresses(usedAddresses);
    
          console.log("usedAddresses", usedAddresses);
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };

    const handleLogout=async()=>{
        try{
            
            await logout();
            history.push('/');
            console.log('you are looged out');

        }catch(e){
            console.log(e.message);
        }
    }
    return (
        <div className="contact">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">

                <div className="infomation">
                    <div className="contact-form" method="POST">
                        <div className="info-user">
                            <h2>Thông tin tài khoản</h2>
                            <h3 id="name">Họ và tên: {userinfo&&userinfo.nameUser}</h3>
                            <p>Email: {user&&user.email}</p>
                            <p>Số điện thoại: {userinfo&&userinfo.phoneNum}</p>
                            <p>Giới tính: {userinfo&&userinfo.sex}</p>
                            {/* <p>Ngày sinh: 08/01/2002</p> */}
                        </div>
                        <div className="avarta" >
                            {/* <img className ="user1" src={userinfo.avatarURL} alt="User Avatar"></img> */}
                            {userinfo && userinfo.avatarURL && <img className="user1" src={userinfo.avatarURL} alt="User Avatar" />}
                            <div className="profile_Logout"> 
                                <button onClick={handleLogout} className="btn_LogOut">Đăng xuất</button>
                            </div>

                        </div>
                        {/* <label htmlFor="name">Full Name</label>
                  <input name="name" placeholder="Enter full name..." type="text" />
                  <label htmlFor="email">Email</label>
                  <input name="email" placeholder="Enter email..." type="email" />
                  <label htmlFor="message">Message</label>
                  <textarea
                      rows="6"
                      placeholder="Enter message..."
                      name="message"
                      required
                  ></textarea>
                  <button type="submit"> Send Message</button> */}
                    </div>
                </div>

                <div className="address">
                    <h2>Địa chỉ đang sử dụng</h2>
                    {usedAddresses.map((address) => (
                        <CardAddressUsed
                        key={address.idAddress}
                        name={address.name}
                        phonenum={address.phoneNumber}
                        address={`${address.province}, ${address.district}, ${address.ward}`}
                        isused={address.used}
                        />
                    ))}
                </div>
            </div>
            {/* {showNoti && <Noti_LogOut onClose={() => setShowNoti(false)} />} */}
            {showNoti && <Noti_LogOut />}
        </div>
    );
}

export default Profile;