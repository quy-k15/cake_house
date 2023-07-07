import React, { useState,useEffect } from "react";
import "../styles/Payment.css";
import Cake1 from "../assets/Tiramisu_Category.png";
import CardOrder from "../components/CardOrder";
import OrderDetail from "../components/OrderDetail";
import { useHistory, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { db } from "../firebase";
import Noti_Order from "../components/Noti_Order";
const Payment = () => {
  const history = useHistory(); // Access the history object
  const location = useLocation();
  const selectedCarts = location.state.selectedCarts;
  console.log("selectedCarts",selectedCarts);


  
  const ShippingMethod = () => {
    const [cakes,setCakes]=useState([]);
    const [selectedOption, setSelectedOption] = useState("");// Lấy những sản phẩm đã chọn bên giỏ hàng.
    const handleOptionSelect = (event) => {
      setSelectedOption(event.target.value);
    };
    
    // Lấy thông tin user
    const {user}=UserAuth();
    const [userinfo,setUser]  = useState();
    const [email,setEmail]  = useState('');
    const[allPrice,setAllPrice]=useState('');
  
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
  // Tính tổng tiền
  useEffect(() => {
    const fetchCakes = async () => {
      const cakeIds = selectedCarts.map((cart) => cart.idcake);
      const q = query(collection(db, "cakes"), where("idcake", "in", cakeIds));
      const querySnapshot = await getDocs(q);
      const cakesArray = querySnapshot.docs.map((doc) => ({
        idcake: doc.id,
        ...doc.data()
      }));
      setCakes(cakesArray);
    };

    if (selectedCarts.length > 0) {
      fetchCakes();
    }
  }, [selectedCarts]);


 
const calculateTotalPrice = () => {
  if (selectedCarts.length === 0) {
    return 0;
  }

  const totalPrice = selectedCarts.reduce((total, cart) => {
    if (cart.isChecked) {
      const cakePrice = cakes.find((cake) => cake.idcake === cart.idcake)?.price || 0;
      return total + (cakePrice * cart.num);
    }
    return total;
  }, 0);

  return totalPrice;

};
// thêm order lên firebase
const currentDate = new Date();
const formattedDate = new Intl.DateTimeFormat("en-GB").format(currentDate);
const handleAddOrder = async () => {
  try {
    const totalPrice = calculateTotalPrice();

    const newOrder = {
      idorder: "",
      iduser: userinfo.idUser,
      idcart: selectedCarts.map((cart) => cart.idcart),
      date:{formattedDate},
      allPrice: totalPrice,
      status:"Chờ xác nhận",
 
    };
      const CartCol = collection(db, "orders");
      const docRef = await addDoc( CartCol, newOrder);
      const generatedId = docRef.id;
      await updateDoc(doc(db, "orders", generatedId), {idorder: generatedId });

      console.log("cart created successfully!");
      history.push("/ConfirmPurchase");
      } catch (error) {
      console.error("Error creating order:", error);
      }
      

};


    return (
      <div className="payment_body">
        <div className="payment_body_left">
          <div className="address_info">
            <div style={{ padding: '20px' }}>
              <h3 className="width_common left">Thông tin nhận hàng</h3>
              <p>Họ và tên:  {userinfo&&userinfo.nameUser}</p>
              <p>Số điện thoại: {userinfo&&userinfo.phoneNum}</p>
              <p>Địa chỉ nhận hàng:</p>
            </div>
          </div>
          <div className="shipping_method">
            <div style={{ padding: '20px' }}>
              <h3 className="width_common left">Hình thức vận chuyển</h3>
              <label className="width_common choose">
                <input
                  type="radio"
                  name="shipping"
                  value="fast"
                  checked={selectedOption === "fast"}
                  onChange={handleOptionSelect}
                />
                Nhanh
              </label>
              <label className="width_common choose">
                <input
                  type="radio"
                  name="shipping"
                  value="economical"
                  checked={selectedOption === "economical"}
                  onChange={handleOptionSelect}
                />
                Tiết kiệm
              </label>
            </div>
          </div>
          <div className="checkout_method">
            <div style={{ padding: '20px' }}>
              <h3 className="width_common left">Phương thức thanh toán</h3>
              <p>Thanh toán khi nhận hàng</p>
            </div>
          </div>
        </div>
        <div className="payment_body_right">
          <div className="block_check_donhang">
            <div style={{ padding: '20px' }}>
              <h3>Đơn hàng</h3>
              {selectedCarts.map((cart) => (
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
              <div className="donhang_tamtinh">
                <div className="tamtinh_price">
                  <h3>Tạm tính: {calculateTotalPrice()} VNĐ</h3>
                </div>
                <div className="relative">
                  <input className="form-control" type="text" name="tmpVoucherCode" placeholder="Nhập mã Voucher" data-gtm-form-interact-field-id="0" />
                  <button className="btn_chuasudung" type="button">Sử dụng</button>
                </div>
                <div>
                <div class="block_total_order width_common ">
                  <div class="thanhtien width_common space_bottom_10">
                    <div class="tamtinh_left left"><h3>Thành tiền:</h3></div>
                    <div class="tamtinh_right right txt_color_2"><h3>{calculateTotalPrice()} VNĐ</h3></div>
                  </div>
                  <div class="btn_dathang width_common space_bottom_10">
                    <button type="submit" class="btn_site_2" onClick={handleAddOrder}>Đặt Hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  return <ShippingMethod />;
};

export default Payment;
