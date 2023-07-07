import React, { useState, useEffect } from "react";
import NavbarOrders from "../components/NavbarOrders";
import SideMenu from "../components/SideMenu";
import { OrdersData } from "../components/OrdersData";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as lightStar } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Rated.css";
import { collection, getDocs, doc, docs, query, where, updateDoc } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import CardOrder from "../components/CardOrder";
import { Link } from "react-router-dom";

function CompletedPurchase() {
  const [rating, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRateClick = () => {
    setShowPopup(true);
  };
  const handleSubmit = () => {
    // Perform the desired action here, such as sending the review to the server
    // You can access the rating and review values from the component's state

    // After submitting the review, you can close the popup or reset the form
    closePopup();
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const [orders, setOrders] = useState([]);
  const { user } = UserAuth();
  const [email, setEmail] = useState('');
  // const [userinfo,setUser]  = useState();
  const [cart, setCart] = useState([]);
  const [cake, setcake] = useState();
  const [userinfo, setUser] = useState();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showNotiUpdate, setShowNotiUpdate] = useState(false);

  const defaultStyle = {
    backgroundColor: "",
    color: ""
  };
  const hoverStyle = {
    backgroundColor: "#8F3C02",
    color: "white"
  };

  const [style2, setStyle2] = useState(defaultStyle);
  const handleUpdatestatus = async (event, selectedOrderId, updatedStatus) => {
    event.preventDefault();
    const updatedOrder = {
      ...orders.find((order) => order.idorder === selectedOrderId), // Spread the properties of the selected order
      // status: "Xác nhận",
      status: updatedStatus,
    };

    try {
      // Update the order in Firestore
      if (selectedOrderId) {
        const orderDocRef = doc(db, "orders", selectedOrderId);
        await updateDoc(orderDocRef, updatedOrder);
        console.log("selectedOrderId", selectedOrderId);
      }

      // Cập nhật danh sách đơn hàng sau khi cập nhật
      const updatedOrders = orders.map((order) =>
        order.idorder === selectedOrderId ? { ...order, status: updatedStatus } : order
      );
      setOrders(updatedOrders);
      window.location.reload();
      // Đóng popup
      setShowNotiUpdate(true);
      setTimeout(() => {
        setShowNotiUpdate(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
    }
  };


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
          const q = query(collection(db, "orders"), where("iduser", "==", userinfo.idUser), where("status", "==", "Hoàn thành"));
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
  return (
    <div className="MyOrders">
      <div className="leftSide">
        <SideMenu />
      </div>
      <div className="rightSide">
        <NavbarOrders />
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
                    {orderCarts.map((cart) => (
                      <Link to={`/detail/${cart.idcake}`} style={{ textDecoration: "none" }}>
                        <button className="buyagain">Mua lại</button>
                      </Link>
                    ))}
                    <button className="rate" onClick={handleRateClick}>
                      Đánh giá
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Đánh giá sản phẩm</h3>
            <div className="star_rate">
              <div className="rating-section">
                <label htmlFor="rating">Chất lượng:</label>
              </div>
              <div className="star-rating-section">
                {[1, 2, 3, 4, 5].map((index) => (
                  <span
                    key={index}
                    onClick={() => handleRatingChange(index)}
                    className={`star ${index <= rating ? "active" : ""}`}
                  >
                    <FontAwesomeIcon icon={index <= rating ? solidStar : lightStar} />
                  </span>
                ))}
              </div>
            </div>
            <div className="review-section">
              <label htmlFor="review">Đánh giá:</label>
              <textarea className="review_fb" id="review" rows="4" />
            </div>
            <div className="popup-button">
              <button className="update-button" onClick={handleSubmit}>Đánh giá</button>
              <button className="close-button" onClick={closePopup}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletedPurchase;