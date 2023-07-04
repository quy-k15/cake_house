import React from "react";
import "../styles/LikedProducts.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {LikedProductData} from "../components/LikedProductData";
import SideMenu from "../components/SideMenu";
import { collection, getDocs,doc,docs ,query, where,updateDoc} from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
function LikedProducts() {
    const [loves,setloves]=useState([]);
    const [cake,setcake]=useState();

    const getloves = async () => {
        try {
          const lovesSnapshot = await getDocs(collection(db, 'loves'));
          const lovesArray = lovesSnapshot.docs.map((doc) => ({
            idlove: doc.id,
            ...doc.data()
          }));
          setloves(lovesArray);
        } catch (error) {
          console.error('Error fetching carts:', error);
        }
      };
      useEffect(()=>{
        getloves();
      },[]);

    useEffect(() => {
        const getCakeData = async () => {
          const cakePromises = loves.map(async (love) => {
            const cakeData = await getcake(love.idcake);
            return cakeData !== null ? cakeData : null;
          });
          const cakeDataArray = await Promise.all(cakePromises);
          setcake(cakeDataArray);
        };
      
        getCakeData();
    }, [loves]);

    const getcake = async (idcake) => {
        const q = query(collection(db, "cakes"), where("idcake", "==", idcake));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const cakeData = doc.data();
          return cakeData; // Return the cake data
        }

        return null;
      };
    // Kiểm tra xem cso phỉa giỏ hàng của user đó không:
    const uploadTasks = []; 

    const { user } = UserAuth();
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
        if (email) {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                setUser(doc.data());
                console.log("user: ", userinfo);
            }

        }
    };
    useEffect(() => {
          UserQuery();
      }, [email]);
    const currentUserid = userinfo?.idUser; 
    const filteredCarts = loves.filter((love) => love.iduser === currentUserid);
    
    return (
        <div className="full">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <div className="LikeProduct">
                    <ul className="ProductList">
                    <div className="categories">
                        <p className="spyt">Sản phẩm yêu thích</p>
                        <p className="sl">Số lượng còn lại </p>
                        <p className="dg">Đơn giá</p>
                        <p className="tt">Thao tác</p>
                    </div>
                        {LikedProductData.map((val, key) => {
                            return (
                               
                                <li
                                    className="row"
                                    key={key}
                                    id={window.location.pathname == val.link ? "active" : ""}
                                    onClick={() => {
                                        window.location.pathname = val.link;
                                    }}
                                >
                                    {""}

                                    <div id="image">{val.image}</div>
                                    <div id="name">{val.name}</div>
                                    <div id="count">{val.count}</div>
                                    <div id="price">{val.price}</div>
                                    <div id="icon">{val.icon}</div>
                                    <div id="icon1">{val.icon1}</div>
                                </li>
                            );
                        })}
                         {/* {filteredCarts.map((LikedProductData, key) => {
                            const loveIndex = loves.findIndex((love) => love.idcart === LikedProductData.idlove);
                            const cakeData = cake[loveIndex];
            
                            if (cakeData) {
                                return (
                                <LikedProductData
                                    key={key}
                                    image={cakeData.img1}
                                    name={cakeData.name}
                                    price={cakeData.price}
              

                                    
                                />
                                );
                            } else {
                                return null;
                            }
                        })} */}
                    </ul>
                </div>
            </div >
        </div>

        
    );
}

export default LikedProducts;