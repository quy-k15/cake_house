import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import CardCart from "../components/CardCart";
import Noti_Success from "../components/Noti_Success";
import "../styles/MyCart.css";

function MyCart() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [carts, setCarts] = useState([]);
  const [cake, setCake] = useState([]);
  const [email, setEmail] = useState('');
  const [userinfo, setUserinfo] = useState();
  const [showNotiDelete, setShowNotiDelete] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cartToDelete, setCartToDelete] = useState(null);

  const { user } = UserAuth();

  const getcarts = async () => {
    try {
      const cartsSnapshot = await getDocs(collection(db, 'carts'));
      const cartsArray = cartsSnapshot.docs.map((doc) => ({
        idcart: doc.id,
        ...doc.data()
      }));
      setCarts(cartsArray);
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  };

  const getcake = async (idcake) => {
    const q = collection(db, "cakes");
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs.find((d) => d.id === idcake);
      const cakeData = doc.data();
      return cakeData; // Return the cake data
    }
    return null;
  };

  const UserQuery = async () => {
    if (email) {
      const q = collection(db, "users");
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs.find((d) => d.data().email === email);
        setUserinfo(doc.data());
      }
    }
  };

  const handleAllCheckedChange = () => {
    const updatedCarts = carts.map((cart) => ({ ...cart, isChecked: !isAllChecked }));
    setCarts(updatedCarts);
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckboxChange = (idcart, isChecked) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.idcart === idcart) {
        return { ...cart, isChecked };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };

  const handleNumChange = (cartId, newNum) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.idcart === cartId) {
        return { ...cart, num: newNum };
      }
      return cart;
    });
    setCarts(updatedCarts);

    const cartRef = doc(db, 'carts', cartId);
    updateDoc(cartRef, { num: newNum });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'carts', id));
      const updatedCarts = carts.filter((cart) => cart.idcart !== id);
      setCarts(updatedCarts);
      setShowConfirmDialog(false);
      setShowNotiDelete(true);
      setTimeout(() => {
        setShowNotiDelete(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const handleDeleteSelected = async () => {
    const selectedCartIds = carts.filter((cart) => cart.isChecked).map((cart) => cart.idcart);
    if (selectedCartIds.length > 0) {
      setShowConfirmDialog(true);
      setCartToDelete(selectedCartIds);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setCartToDelete(null);
  };

  const handleConfirmDelete = () => {
    const deletePromises = cartToDelete.map((id) => deleteDoc(doc(db, 'carts', id)));
    Promise.all(deletePromises)
      .then(() => {
        const updatedCarts = carts.filter((cart) => !cartToDelete.includes(cart.idcart));
        setCarts(updatedCarts);
        setShowConfirmDialog(false);
        setShowNotiDelete(true);
        setTimeout(() => {
          setShowNotiDelete(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error deleting carts:', error);
      });
  };

  useEffect(() => {
    getcarts();
  }, []);

  useEffect(() => {
    const getCakeData = async () => {
      const cakePromises = carts.map(async (cart) => {
        const cakeData = await getcake(cart.idcake);
        return cakeData !== null ? cakeData : null;
      });
      const cakeDataArray = await Promise.all(cakePromises);
      setCake(cakeDataArray);
    };
    getCakeData();
  }, [carts]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    UserQuery();
  }, [email]);

  const currentUserid = userinfo?.idUser;
  const filteredCarts = carts.filter((cart) => cart.iduser === currentUserid);

  const selectedCarts = filteredCarts.filter((cart) => cart.isChecked);

  // CSS styles for the buttons
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

  return (
    <div className="MyCart">
      <div className="MyCart_header">
        <div className="CardCart_input_all_div">
          <label className="CardCart_input_all">
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllCheckedChange}
            />
            <span className="checkmark_all"></span>
          </label>
        </div>
        <h3 className="MyCart_header_sp">Sản phẩm</h3>
        <h3 className="MyCart_header_pr">Đơn giá</h3>
        <h3 className="MyCart_header_num">Số lượng</h3>
        <h3 className="MyCart_header_allpr">Số tiền</h3>
      </div>
      <div className="MyCart_List">
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
            {filteredCarts.reduce((total, cart) => {
              if (cart.isChecked) {
                const cartIndex = carts.findIndex((c) => c.idcart === cart.idcart);
                const cakeData = cake[cartIndex];
                if (cakeData) {
                  return total + cart.num;
                }
              }
              return total;
            }, 0)}
          </div>
          <button
            id="btn_delete"
            onClick={handleDeleteSelected}
            style={style1}
            onMouseEnter={() => setStyle1(hoverStyle)}
            onMouseLeave={() => setStyle1(defaultStyle)}
          >
            Xóa
          </button>
        </div>

        <div className="div_total_price">
          <div id="total_price">Tổng thanh toán: </div>
          <div id="total_price_number">
            {filteredCarts.reduce((total, cart) => {
              if (cart.isChecked) {
                const cartIndex = carts.findIndex((c) => c.idcart === cart.idcart);
                const cakeData = cake[cartIndex];
                if (cakeData) {
                  return total + cakeData.price * cart.num;
                }
              }
              return total;
            }, 0)}
          </div>
          <Link
            to={{
              pathname: '/payment',
              state: { selectedCarts }
            }}
          >
            <button
              id="btn_buy"
              style={style2}
              onMouseEnter={() => setStyle2(hoverStyle)}
              onMouseLeave={() => setStyle2(defaultStyle)}
            >
              Mua hàng
            </button>
          </Link>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="confirm_dialog">
          <div className="confirm_dialog-content">
            <h3>Xác nhận!</h3>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            <div className="confirm_buttons">
              <button onClick={handleConfirmDelete}>Xóa</button>
              <button onClick={handleCancelDelete}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {showNotiDelete && (
        <Noti_Success
          onClose={() => setShowNotiDelete(false)}
          status="Đã xóa khỏi giỏ hàng!"
        />
      )}
    </div>
  );
}

export default MyCart;
