import React from "react";
import SideMenu from "../components/SideMenu";
import "../styles/EditProfile.css"
import { Link } from "react-router-dom";
import user1 from "../assets/user1.png";
import { useState, useEffect } from "react";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import { db, auth,storage } from "../firebase";
import Noti_Update from "../components/Noti_Update";
function EditProfile() {
    const [updatedUser, setUpdatedUser] = useState({
        nameUser: "",
        email: "",
        phoneNum: "",
        sex: "",
    });
    const { user } = UserAuth();

    const [email,setEmail]  = useState('');
    const [userinfo,setUser]  = useState();

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
        }
    }, [email]);
    useEffect(() => {
        if (userinfo) {
            setUpdatedUser({
            nameUser:userinfo.nameUser,
            email: userinfo.email,
            phoneNum: userinfo.phoneNum,
            sex: userinfo.sex,
            });
            
        }
        // console.log("user",user)
    }, [userinfo]);
        // Thêm hình ảnh avt

    const [imgs, setImgs] = useState([]);
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
      
    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setUpdatedUser((prevState) => ({
                ...prevState,
                [name]: value,
            

            }));
        };
        // const handleFileChange = (event) => {
        //     const file = event.target.files[0];
        //     setFile(file);
        //      // Show the selected image immediately after choosing it
        //     if (file) {
        //         const reader = new FileReader();
        //         reader.onloadend = () => {
        //         setUserAvatarURL(reader.result);
        //         };
        //         reader.readAsDataURL(file);
        //     } else {
        //         setUserAvatarURL(null);
        //     }
        // };
        // const handleAvatarButtonClick = () => {
        // document.getElementById("avatar-input").click();
        // };
        const [userAvatarURL, setUserAvatarURL] = useState(userinfo?.avatarURL || null);

        
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setFile(file);
          
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImgs([file]);
                setUserAvatarURL(reader.result);
              };
              reader.readAsDataURL(file);
            } else {
              setImgs([]);
              setUserAvatarURL(null);
            }
          };
          
          const handleAvatarButtonClick = () => {
            document.getElementById("avatar-input").click();
          };
          

        
    const updateUser = async () => {
        console.log("updatedUser", updatedUser);
        console.log("userinfo", userinfo);
        
        if (!updatedUser.nameUser || !updatedUser.email || !updatedUser.phoneNum || !updatedUser.sex) {
            console.error("Required fields are missing");
            return;
        }
        
        if (userinfo && userinfo.idUser) {
          
            console.log("user.idUser", userinfo.idUser);
        
            const { nameUser, email, phoneNum, sex } = updatedUser;
        
            const userRef = doc(db, "users", userinfo.idUser);
        
            try {
                await updateDoc(userRef, {
                    nameUser: nameUser,
                    email: email,
                    phoneNum: phoneNum,
                    sex: sex
                });

                if (file) {
                    const storageRef = ref(storage, `/files/${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setPercent(percent);
                    },
                    (error) => {
                        console.error("Error uploading file:", error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateDoc(userRef, {
                            avatarURL: downloadURL,
                        })
                            .then(() => {
                            console.log("Avatar image uploaded successfully!");
                            })
                            .catch((error) => {
                            console.error("Error updating avatar image URL:", error);
                            });
                        });
                    }
                    );
                } else {
                    console.log("No avatar image selected");
                }
                    // Update email in Firebase Authentication
                // const user = auth.currentUser;
                // await user.updateEmail(email);
                console.log("User information updated successfully!");
                // Perform additional actions here, such as displaying a success message or redirecting the user
                } catch (error) {
                console.error("Error updating user information:", error);
                // Handle the error, display an error message, or perform any necessary actions
            }
        } else {
            console.log("User or user.idUser is undefined");
        }
        setShowNoti(true);
        setTimeout(() => {
            setShowNoti(false);
        }, 3000);
        };
    // Hiển thị thông báo khi add vô giỏ hàng thàng công
    const [showNoti, setShowNoti] = useState(false);
  

    return (
        <div className="edit_profile">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <div className="title_edit">
                    <h2>Chỉnh sửa thông tin</h2>
                </div>
            
                <div className="infomation">
                    
                    <div className="info-user">
                        
                        <table>
                            <tr>
                                <td>
                                    <label>Tên: </label>
                                </td>
                                <td id = "input_field">
                                <input
                                    name="nameUser"
                                    value={updatedUser.nameUser}
                                    onChange={handleInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Email: </label>
                                </td>
                                <td id = "input_field">
                                <input
                           
                                    value={updatedUser.email}
                                    onChange={(e) =>
                                        setUpdatedUser((prevState) => ({
                                        ...prevState,
                                        email: e.target.value,
                                        }))
                                    }
                                   
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Số điện thoại: </label>
                                </td>
                                <td id = "input_field">
                                <input
                                    name="phoneNum"
                                    value={updatedUser.phoneNum}
                                    // onChange={(e) =>
                                    //     setUpdatedUser((prevState) => ({
                                    //     ...prevState,
                                    //     phoneNum: e.target.value,
                                    //     }))
                                    // }
                                    onChange={handleInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Giới tính: </label>
                                </td>
                                <td>
                                    <select     
                                        name="sex"
                                        value={updatedUser.sex}
                                        onChange={handleInputChange}
                                        >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>

                                    </select>
                                </td>
                            </tr>
                        </table>
                        <button onClick={updateUser}>
                            Lưu
                        </button>

                    </div>
                    <div className="avarta" >
                        <img className="user1" src={userAvatarURL || userinfo?.avatarURL} alt="User Avatar" />
                        {/* <img className="user1" src={userinfo?.avatarURL} alt="User Avatar"></img> */}
                        {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            />
                        <button onClick={handleAvatarButtonClick}>Chọn avatar</button>
                    </div>
                </div>
            </div>
            {showNoti && <Noti_Update onClose={() => setShowNoti(false)} />}
        </div>
    );
}

export default EditProfile;
