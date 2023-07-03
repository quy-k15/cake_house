import React from "react";
import { Link } from "react-router-dom";
import { ListCart } from "../helpers/ListCart";
import CardCart from "../components/CardCart";
import "../styles/MyCart.css"

import {ListBestSeller} from "../helpers/ListBestSeller"
import {ListFeedBack} from "../helpers/ListFeedBack"
import { collection, getDocs,doc,docs ,query, where,updateDoc} from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function MyCart(){
    const [isAllChecked, setIsAllChecked] = useState(false);

    const [carts,setcarts]=useState([]);
    const [cake,setcake]=useState();

    const getcarts = async () => {
        try {
          const cartsSnapshot = await getDocs(collection(db, 'carts'));
          const cartsArray = cartsSnapshot.docs.map((doc) => ({
            idcart: doc.id,
            ...doc.data()
          }));
          setcarts(cartsArray);
        } catch (error) {
          console.error('Error fetching carts:', error);
        }
      };
      useEffect(()=>{
        getcarts();
      },[]);
    // const getcake =async () => {
    //     const q = query(collection(db, "cakes"), where("idcake", "==", carts.idcake));
    //     const querySnapshot = await getDocs(q);
    //     if (!querySnapshot.empty) {
    //         const doc = querySnapshot.docs[0];
    //         setcake(doc.data());
           
    //     }
    // }
    // useEffect(() => {
    //     if (carts.idcake) {
    //         getcake();
    //     }
    //   }, [carts.idcake]);

    useEffect(() => {
        const getCakeData = async () => {
          const cakePromises = carts.map(async (cart) => {
            const cakeData = await getcake(cart.idcake);
            return cakeData !== null ? cakeData : null;
          });
          const cakeDataArray = await Promise.all(cakePromises);
          setcake(cakeDataArray);
        };
      
        getCakeData();
    }, [carts]);

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
    const filteredCarts = carts.filter((cart) => cart.iduser === currentUserid);
    
// Tích toàn bộ sản phẩm
const handleAllCheckedChange = () => {
    const updatedCarts = carts.map((cart) => ({ ...cart, isChecked: !isAllChecked }));
    setcarts(updatedCarts);
    setIsAllChecked(!isAllChecked);
  };
    
      const handleCheckboxChange = (idcart, isChecked) => {
        const updatedCarts = carts.map((cart) => {
          if (cart.idcart === idcart) {
            return { ...cart, isChecked };
          }
          return cart;
        });
        setcarts(updatedCarts);
      };
// Thay đổi số lượng cập nhật lên firebase
const handleNumChange = (cartId, newNum) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.idcart === cartId) {
        // Update the cart's num property
        return { ...cart, num: newNum };
      }
      return cart;
    });
    setcarts(updatedCarts);
  
    // Update the num property in Firebase
    const cartRef = doc(db, 'carts', cartId);
    updateDoc(cartRef, { num: newNum });
  };
    
    return(
        <div className="MyCart">
            <div className="MyCart_header">
                <div className="CardCart_input_all_div"> 
                    <label class="CardCart_input_all">
                        {/* <input type="checkbox"/> */}
                        <input
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={handleAllCheckedChange}
                            />
                        <span class="checkmark_all"></span>
                    </label>
                </div>
                <h3 className="MyCart_header_sp">Sản phẩm</h3>
                <h3 className="MyCart_header_pr">Đơn giá</h3>
                <h3 className="MyCart_header_num">Số lượng</h3>
                <h3 className="MyCart_header_allpr">Số tiền</h3>
            </div>
            <div className="MyCart_List">
                {/* {carts .map((cardCart, key) => {
                return (
                <CardCart
                    key={key}
                    image={cake[key]?.img1}
                    name={cake[key]?.name}
                    price={cake[key]?.price}
                    // icon ={cardCart.icon}
                    size={cardCart.size}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
                );
                })} */}
                {filteredCarts.map((cardCart, key) => {
                    const cartIndex = carts.findIndex((cart) => cart.idcart === cardCart.idcart);
                    const cakeData = cake[cartIndex];
                    // return (
                    //     <CardCart
                    //     key={key}
                    //     image={cakeData?.img1}
                    //     name={cakeData?.name}
                    //     price={cakeData?.price}
                    //     size={cardCart.size}
                    //     isChecked={isChecked}
                    //     setIsChecked={setIsChecked}
                    //     />
                    // );
                    if (cakeData) {
                        return (
                          <CardCart
                            key={key}
                            image={cakeData.img1}
                            name={cakeData.name}
                            price={cakeData.price}
                            size={cardCart.size}
                            num={cardCart.num}
                            // isChecked={isAllChecked}
                            // setIsChecked={setIsAllChecked}
                            isChecked={cardCart.isChecked}
                            onCheckboxChange={(isChecked) => handleCheckboxChange(cardCart.idcart, isChecked)}
                            onNumChange={(newNum) => handleNumChange(cardCart.idcart, newNum)}
                          />
                        );
                      } else {
                        return null;
                      }
                })}
            </div>
            <div className="summary">
                <div className="div_select">
                    <div id="selected">Đã chọn: </div>
                    <div id="select_number">
                        {/* {filteredCarts.filter((cart) => cart.isChecked).length} */}
                        {filteredCarts.reduce((total, cart) => {
                        if (cart.isChecked) {
                            
                            const cartIndex = carts.findIndex((c) => c.idcart === cart.idcart);
                            const cakeData = cake[cartIndex];
                            if (cakeData) {
                            console.log('price:', cakeData.price);
                            return total +  cart.num;
                            }
                        }
                        return total;
                    }, 0)}
                    </div>

                    <button id="btn_delete">Xóa</button>
                </div>
                
                <div className="div_total_price">
                    <div id="total_price">Tổng thanh toán: </div>
                    <div id="total_price_number">
              
                    {filteredCarts.reduce((total, cart) => {
                        if (cart.isChecked) {
                            
                            const cartIndex = carts.findIndex((c) => c.idcart === cart.idcart);
                            const cakeData = cake[cartIndex];
                            if (cakeData) {
                            console.log('price:', cakeData.price);
                            return total + cakeData.price * cart.num;
                            }
                        }
                        return total;
                    }, 0)}
                    </div>
                    <Link to ="/payment">
                      <button id="btn_buy">Mua hàng</button>
                    </Link>
                    
                </div>
                
            </div>

        </div>
    );
}
export default MyCart;