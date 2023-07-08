import React, { useState, useEffect } from "react";
import NavbarOrders from "../components/NavbarOrders";
import SideMenu from "../components/SideMenu";
import { OrdersData } from "../components/OrdersData";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as lightStar } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Rated.css";
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import CardOrder from "../components/CardOrder";
import { Link } from "react-router-dom";

function CompletedPurchase() {
  const [rating, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user } = UserAuth();
  const [email, setEmail] = useState('');
  const [cart, setCart] = useState([]);
  const [userinfo, setUser] = useState(null);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRateClick = () => {
    setShowPopup(true);
  };

  const handleSubmit = async () => {
    try {
      // Get the review text from the textarea (assuming the textarea has an ID of "review")
      const reviewText = document.getElementById("review").value;
  
      // Prepare the data to update in the user document
      const updatedData = {
        rating: rating,
        review: reviewText
      };
  
      // Get the user's document ID from the userinfo state
      const userDocId = userinfo && userinfo.docId;
  
      console.log("userDocId:", userDocId); // Check the value of userDocId
  
      if (userDocId) {
        // Update the user document in Firestore with the new rating and review
        const userDocRef = doc(db, "users", userDocId);
        await updateDoc(userDocRef, updatedData);
      }
  
      // Close the popup or reset the form
      closePopup();
    } catch (error) {
      console.error("Error updating user rating:", error);
    }
  };
  

  const closePopup = () => {
    setShowPopup(false);
    setRating(0); // Reset the rating state
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const getUserData = async () => {
      if (email) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setUser({ ...doc.data(), docId: doc.id });
        }
      }
    };

    getUserData();
  }, [email]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (userinfo) {
          const ordersRef = collection(db, "orders");
          const q = query(ordersRef, where("iduser", "==", userinfo.idUser), where("status", "==", "Hoàn thành"));
          const querySnapshot = await getDocs(q);
          const ordersArray = querySnapshot.docs.map((doc) => ({
            idorder: doc.id,
            ...doc.data()
          }));

          setOrders(ordersArray);
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
    const cartsRef = collection(db, "carts");
    const q = query(cartsRef, where("idcart", "==", idcart));
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
      const cartDataPromises = orders.flatMap((order) => order.idcart.map(getCartData));
      const cartDataArray = await Promise.all(cartDataPromises);
      setCart(cartDataArray.filter(Boolean));
    };

    if (orders.length > 0) {
      getCartDataArray();
    }
  }, [orders]);

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
              <div className="row" key={order.idorder}>
                <div className="ruler_status">
                  <div id="id">
                    <div id="id_inf">Mã số đơn hàng: {order.idorder}</div>
                  </div>
                  <div id="tradeDate">
                    <div id="tradeDate_inf"> Ngày đặt hàng: {order.date.formattedDate}</div>
                  </div>
                  <div>
                    <button id="btn_detail">Xem chi tiết <i className="fa-solid fa-arrow-right"></i></button>
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
              <button className="update-button" onClick={handleSubmit}>
                Đánh giá
              </button>
              <button className="close-button" onClick={closePopup}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletedPurchase;
