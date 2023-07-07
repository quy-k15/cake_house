import React from "react";
import NavbarOrders from "../components/NavbarOrders";
import SideMenu from "../components/SideMenu";
import {OrdersData} from "../components/OrdersData";
import { collection, getDocs,doc,docs ,query, where,updateDoc} from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import CardOrder from "../components/CardOrder";



function ConfirmPurchase() {
    const [orders, setOrders] = useState([]);
    const { user } = UserAuth();
    const [email,setEmail]  = useState('');
    // const [userinfo,setUser]  = useState();
    const [cart, setCart] = useState([]);
    const [cake,setcake]=useState();
    const [userinfo,setUser]  = useState();


    // const SetEmails = () => {
    //     setEmail(user&&user.idUser);
    // };
   
 
    useEffect(() => {
        if (user) {
          setEmail(user.email);
        }
      }, [user]);
    
      useEffect(() => {
        const getUserData = async () => {
          if (email) {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const doc = querySnapshot.docs[0];
              setUser(doc.data());
              console.log("user: ", doc.data());
              console.log("email: ", email);
            }
          }
        };
    
        getUserData();
      }, [email]);
    
      useEffect(() => {
        const getOrders = async () => {
          try {
            if (userinfo) {
              const q = query(collection(db, "orders"), where("iduser", "==", userinfo.idUser),where("status","==","Chờ xác nhận"));
              const querySnapshot = await getDocs(q);
              const ordersArray = querySnapshot.docs.map((doc) => ({
                idorder: doc.id,
                ...doc.data()
              }));
              setOrders(ordersArray);
              console.log("ordersArray", ordersArray);
              console.log("orders", orders);
            }
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
    
        if (userinfo) {
          getOrders();
        }
      }, [userinfo]);
    
      const getCartData = async (idcart) => {
        const q = query(collection(db, "carts"), where("idcart", "==", idcart));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const cartData = doc.data();
          return cartData; // Return the cart data
        }
    
        return null;
      };
    
      useEffect(() => {
        const getCartDataArray = async () => {
          const cartDataPromises = orders.flatMap(order => order.idcart.map(getCartData));
          const cartDataArray = await Promise.all(cartDataPromises);
          setCart(cartDataArray.filter(Boolean));
        };
    
        if (orders.length > 0) {
          getCartDataArray();
        }
      }, [orders]);



      // Tính tổng tiền:
      const calculateTotalPrice = () => {
        let totalPrice = 0;
      
        orders.forEach((order) => {
          const orderCarts = cart.filter((c) => order.idcart.includes(c.idcart));
          orderCarts.forEach((cart) => {
            const cartPrice = parseFloat(cart.price);
            const cartNum = parseInt(cart.num);
            totalPrice += cartPrice * cartNum;
          });
        });
      
        return totalPrice;
      };
// Trước khi render component
// const filteredCartIds = Array.from(new Set(cart.map(c => c.idcart))); // Lọc các idcart duy nhất
// const filteredOrderCarts = cart.filter(c => filteredCartIds.includes(c.idcart)); // Lọc các cart dựa trên idcart duy nhất

    return (
        <div className="MyOrders">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <NavbarOrders/>
                <div className="all_purchase">
                {orders.map((order) => {
                  const orderCarts = cart.filter((c) => order.idcart.includes(c.idcart));
                        return (
                            <div
                                className="row"
                               
                                // id={window.location.pathname == val.link ? "active" : ""}
                                // onClick={() => {
                                //     window.location.pathname = val.link;
                                // }}
                            >
                                {""}
                                <div className="ruler_status">
                                    <div id="id">
                                        <div id="id_inf">Mã số đơn hàng: {order.idorder} </div>
                                    </div>
                                    
                                    <div id="tradeDate">
                                       
                                        <div id="tradeDate_inf"> Ngày đặt hàng: {order.date.formattedDate}</div>
                                    </div>
                                    
                                    <div >
                                        <button id="btn_detail">
                                            Xem chi tiết <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    
                                </div>
                                
                                <div className="detail_purchase">
                                  {orderCarts.map((cart) => (
                                    <CardOrder
                                      key={cart.idcart}
                                      image={cart.image}
                                      name={cart.name}
                                      price={cart.price}
                                      size={cart.size}
                                      num={cart.num}
                                      idcake={cart.idcake}
                                    />
                                  ))}
                    
                                   
                                    <div className="col3">
                                      <div className="AllPrice"> Tổng giá đơn hàng: {order.allPrice} (VND)</div>
                                      <button className="btn_purchase">Hủy đơn hàng</button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        );
                    })}

                </div>
            </div>
           
        </div>
    );
}

export default ConfirmPurchase;