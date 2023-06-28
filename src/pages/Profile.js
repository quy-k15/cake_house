import React from "react";
import user1 from "../assets/user1.png";
import "../styles/Profile.css";
import SideMenu from "../components/SideMenu";
import { UserAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function Profile() {
    const {user,logout}=UserAuth();

    const history = useHistory();

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
                            <p id="name">Trần Văn Quý</p>
                            <p>Email: {user&&user.email}</p>
                            <p>Số điện thoại: 0889201726</p>
                            <p>Giới tính: Nam</p>
                            <p>Ngày sinh: 08/01/2002</p>
                        </div>
                        <div className="avarta" >
                            <img className ="user1" src={user1}></img>
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
                    <h2>Sổ địa chỉ</h2>
                    <div className="address-info">
                    <p id="name">Trần Văn Quý - 0889201726</p>
                    <p>Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM,
                     Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh</p>
                    </div>
                    
                    <div className="address-info">
                    <p id="name">Trần Văn Quý - 0889201726</p>
                    <p>Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM,
                     Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh</p>
                    </div>

                </div>



            </div>
        </div>
    );
}

export default Profile;