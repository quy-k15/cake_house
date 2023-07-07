import React from "react";
import { Link } from "react-router-dom";
import { ListCart } from "../helpers/ListCart";
import CardCart from "../components/CardCart";
import "../styles/MyCart.css"

import {ListBestSeller} from "../helpers/ListBestSeller"
import {ListFeedBack} from "../helpers/ListFeedBack"
import { collection, getDocs,doc,docs ,query, where,updateDoc,deleteDoc} from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Noti_Success from "../components/Noti_Success";

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
  // Xóa sản phẩm khỏi giỏ hàng
  const [showNotiDelete, setShowNotiDelete] = useState(false);
  const handleDelete = async (id) => {
    try {
      // Delete the order from Firestore
      await deleteDoc(doc(db, 'carts', id));
      // Update the product list after deleting the product
      const updatedCarts = carts.filter((cart) => cart.idcart !== id);
      setcarts(updatedCarts);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };
  
  // ...
  
  const handleDeleteSelected = async () => {
    const selectedCartIds = filteredCarts
      .filter((cart) => cart.isChecked)
      .map((cart) => cart.idcart);
  
    try {
      // Delete selected carts from Firestore
      const deletePromises = selectedCartIds.map((id) =>
        deleteDoc(doc(db, 'carts', id))
      );
      await Promise.all(deletePromises);
  
      // Update the cart list after deleting the selected carts
      const updatedCarts = carts.filter(
        (cart) => !selectedCartIds.includes(cart.idcart)
      );
      setcarts(updatedCarts);
      setShowNotiDelete(true);
      setTimeout(() => {
        setShowNotiDelete(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting carts:', error);
    }
  };
  //CSS cho button
  const defaultStyle = {
    backgroundColor: "",
    color: ""
  };
  const hoverStyle = {
    backgroundColor: "#8F3C02",
    color: "white"
  };
  const [style1, setStyle1] = useState(defaultStyle);
  const [style2, setStyle2] = useState(defaultStyle);
    
// Gửi các cardcart đã tich sang trang payment
  const selectedCarts = filteredCarts.filter((cart) => cart.isChecked);
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

                    <button id="btn_delete" onClick={handleDeleteSelected} style={style1}
                      onMouseEnter={() => setStyle1(hoverStyle)}
                      onMouseLeave={() => setStyle1(defaultStyle)}>Xóa</button>
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
                    <Link to ={{
                      pathname: '/payment',
                      state: { selectedCarts }
                    }}>
                      <button id="btn_buy" style={style2}
                      onMouseEnter={() => setStyle2(hoverStyle)}
                      onMouseLeave={() => setStyle2(defaultStyle)}>Mua hàng</button>
                    </Link>
                    
                </div>
                
            </div>
            {showNotiDelete && <Noti_Success onClose={() => setShowNotiDelete(false)}  status="Xóa giỏ hàng thành công!"/>}

        </div>
    );
}
export default MyCart;