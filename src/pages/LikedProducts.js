import React from "react";
import "../styles/LikedProducts.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {LikedProductData} from "../components/LikedProductData";
import SideMenu from "../components/SideMenu";
import { collection, getDocs,doc,docs ,query, where,updateDoc} from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from "react-router-dom";
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
          console.log("lovesArray",lovesArray);
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
                        <p className="sl">Trạng thái</p>
                        <p className="dg">Đơn giá</p>
                        <p className="tt">Thao tác</p>
                    </div>
                      
                         {filteredCarts.map((LikedProduct, key) => {
                            const loveIndex = loves.findIndex((love) => love.idlove === LikedProduct.idlove);
                            const cakeData = cake[loveIndex];

                            if (cakeData) {
                                return (
                                  <Link to={`/detail/${cakeData.idcake}`} style={{ textDecoration: "none" }}>

                                  <li
                                      className="row"
                                      key={key}
                                      // id={window.location.pathname == cakeData.link ? "active" : ""}
                                      // onClick={() => {
                                      //     window.location.pathname = cakeData.link;
                                      // }}
                                  >
                                      {""}

                                      <div id="image"><img className ="CardCart_img" src={cakeData.img1}></img></div>
                                      <div id="name">{cakeData.name}</div>
                                      <div id="count">{cakeData.status}</div>
                                      <div id="price">{cakeData.price}</div>
                                      <div id="icon"><DeleteOutlineIcon/></div>
                                      <div id="icon1"><AddShoppingCartIcon /></div>
                                  </li>

                                  </Link>
                               
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </div>
            </div >
        </div>

        
    );
}

export default LikedProducts;