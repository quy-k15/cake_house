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
    const [cartData, setCartData] = useState([]);
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
    
        UserQuery();
      }, [email]);
    
      useEffect(() => {
        const getOrders = async () => {
            try {
              if (userinfo && userinfo.idUser) {
                const ordersSnapshot = await getDocs(collection(db, 'orders', where("iduser", "==", userinfo.idUser)));
                console.log("ordersSnapshot:", ordersSnapshot);
                console.log("docs:", ordersSnapshot.docs);
                const ordersArray = ordersSnapshot.docs.map((doc) => ({
                  idcart: doc.id,
                  ...doc.data()
                }));
                console.log("ordersArray:", ordersArray);
                setOrders(ordersArray);
              }
            } catch (error) {
              console.error('Error fetching carts:', error);
            }
          };
        getOrders();
      }, [userinfo]);
    
      useEffect(() => {
        const fetchCartData = async () => {
          let cartPromises = [];
    
          if (orders.length > 0) {
            cartPromises = orders.map(async (order) => {
              const cartData = await getCartData(order.idcart[0]);
              if (cartData) {
                const cakeData = await getCakeData(cartData.idcake);
                return {
                  ...cartData,
                  cake: cakeData,
                };
              }
              return null;
            });
          }
    
          const cartDataArray = await Promise.all(cartPromises);
          setCartData(cartDataArray);
        };
    
        fetchCartData();
      }, [orders]);
    
      const getCartData = async (idcart) => {
        const q = query(collection(db, "carts"), where("idcart", "==", idcart));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const cartData = doc.data();
          console.log("cartData", cartData);
          return cartData;
        }
        return null;
      };
    
      const getCakeData = async (idcake) => {
        const q = query(collection(db, "cakes"), where("idcake", "==", idcake));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const cakeData = doc.data();
          console.log("cakeData", cakeData);
          return cakeData;
        }
        return null;
      };
    
    // const UserQuery = async () => {
    //     if (email) {
    //         const q = query(collection(db, "users"), where("email", "==", email));
    //         const querySnapshot = await getDocs(q);
    //         if (!querySnapshot.empty) {
    //             const doc = querySnapshot.docs[0];
    //             setUser(doc.data());
    //             console.log("user: ", userinfo);
    //         }

    //     }
    // };
    // useEffect(() => {
    //       UserQuery();
    //   }, [email]);

    // const getorders = async () => {
    // try {
    //     const ordersSnapshot = await getDocs(collection(db, 'orders'));
    //     const ordersArray = ordersSnapshot.docs.map((doc) => ({
    //     idcart: doc.id,
    //     ...doc.data()
    //     }));
    //     setorders(ordersArray );
    // } catch (error) {
    //     console.error('Error fetching carts:', error);
    // }
    // };
    // useEffect(()=>{
    //     getorders();
    // },[]);
    // const getcart = async (idcart) => {
    //     const q = query(collection(db, "carts"), where("idcart", "==", idcart));
    //     const querySnapshot = await getDocs(q);
    //     if (!querySnapshot.empty) {
    //       const doc = querySnapshot.docs[0];
    //       const cartData = doc.data();
    //       return cartData; // Return the cake data
    //     }

    //     return null;
    // };
    // useEffect(() => {
    //     const getCartData = async () => {
    //       const cartPromises = orders.map(async (order) => {
    //         const cartData = await getcart(order.idcart);
    //         return cartData !== null ? cartData : null;
    //       });
    //       const cartDataArray = await Promise.all(cartPromises);
    //       setcart(cartDataArray);
    //     };
      
    //     getCartData();
    // }, [orders]);
    // const getcake = async (idcake) => {
    //     const q = query(collection(db, "cakes"), where("idcake", "==", idcake));
    //     const querySnapshot = await getDocs(q);
    //     if (!querySnapshot.empty) {
    //       const doc = querySnapshot.docs[0];
    //       const cakeData = doc.data();
    //       return cakeData; // Return the cake data
    //     }

    //     return null;
    //   };

    return (
        <div className="MyOrders">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <NavbarOrders/>
                <div className="all_purchase">
                {orders.map((order) => {
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
                                       
                                        <div id="tradeDate_inf"> {order.date}</div>
                                    </div>
                                    
                                    <div >
                                        <button id="btn_detail">
                                            Xem chi tiết <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    
                                </div>
                                
                                <div className="detail_purchase">
                                {cartData
                                    .filter((cart) => cart.idcart === order.idcart)
                                    .map((cart) => (
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
                                    {/* <div className="col1">
                                        <div id="image">{val.image}</div>
                                    </div>
                                    <div className="col2">
                                        <div id="name">{val.name}</div>
                                        <div id="unit_price">
                                            {val.unit_price}
                                            <div id="unit_price_inf">100.000 (VND)</div>
                                        </div>
                                        <div id="quantity">
                                            {val.quantity}
                                            <div id="quantity_inf">02</div>
                                        </div>
                                    </div>
                                    <div className="col3">
                                        <div id="total_price">
                                            {val.total_price}
                                            <div id="total_price_inf">200.000 (VND)</div>
                                        </div>
                                        <button className="btn_purchase">Hủy đơn hàng</button>
                                       
                                    </div> */}
                                    
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