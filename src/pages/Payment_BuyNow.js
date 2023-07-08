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
import CardAddressUsed from "../components/CardAddressUsed";
const  Payment_BuyNow = () => {
  const history = useHistory(); // Access the history object
  const ShippingMethod = () => {
   
    const [usedAddresses, setUsedAddresses] = useState([]);
 
    
    const location = useLocation();
    const selectedCarts = location.state.selectedCarts;

    // Lấy thông tin user
    const {user}=UserAuth();
    const [userinfo,setUser]  = useState();
    const [email,setEmail]  = useState('');
    const [cake, setcake] = useState([]);
    // const [allPrice, setAllPrice] = useState(0);
   
    
  
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
    const getAddress = async () => {
      try {
        const addressSnapshot = await getDocs(collection(db, 'Address'));
        const addressArray = addressSnapshot.docs.map((doc) => ({
          idAddress: doc.id,
          ...doc.data()
        }));
  
        const currentUserid = userinfo?.idUser; 
        const usedAddresses = addressArray.filter((address) => address.used === true&& address.iduser === currentUserid);
        setUsedAddresses(usedAddresses);
        console.log("currentUserid", currentUserid);
  
        console.log("usedAddresses", usedAddresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    useEffect(() => {
        if (email) {
          UserQuery();
        
        }
      }, [email]);
    useEffect(() => {
      if (userinfo) {
        getAddress();
      }
    }, [userinfo]);
  

// thêm order lên firebase
const currentDate = new Date();
const formattedDate = new Intl.DateTimeFormat("en-GB").format(currentDate);
const handleAddOrder = async () => {
  try {
 
    const newOrder = {


      idorder: "",
      iduser: userinfo.idUser,
      idcart: "",
      date:{formattedDate},
      allPrice: cakes.length > 0 ? cakes[0].price * selectedCarts[0].num / 1000 + ".000 đ" : "",
      status:"Chờ xác nhận",
      address:usedAddresses
    };
      // const CartCol = collection(db, "orders");
      // const docRef = await addDoc( CartCol, newOrder);
      // const generatedId = docRef.id;
      // await updateDoc(doc(db, "orders", generatedId), {idorder: generatedId });

      console.log("cart created successfully!");
      history.push("/ConfirmPurchase");
      } catch (error) {
      console.error("Error creating order:", error);
      }
      

};
    // useEffect(() => {
    //   const totalPrice = selectedCarts.reduce(
    //     (total, cart) => total + parseFloat(cart.price),
    //     0
    //   );
    //   console.log("totalPrice", totalPrice);
    //   setAllPrice(totalPrice);
    //   console.log("allPrice", allPrice);
    //   console.log("selectedCarts",selectedCarts)
    // }, [selectedCarts]);

    const [cakes, setCakes] = useState([]);

    const fetchCakesWithQuery = async () => {
      const q = query(collection(db, "cakes"), where("idcake", "==", selectedCarts[0].idcake));
      const querySnapshot = await getDocs(q);
      const cakesArray = querySnapshot.docs.map((doc) => ({
        idcake: doc.id,
        ...doc.data()
      }));
      setCakes(cakesArray);
      console.log("cakes1",cakesArray)
    
    };
  
    useEffect(() => {
      if (selectedCarts[0] && selectedCarts[0].idcake) {
        fetchCakesWithQuery();
      }
      console.log("selectedCarts.idcake",selectedCarts[0].idcake)
    }, [selectedCarts]);

    return (
      <div className="payment_body">
        <div className="payment_body_left">
          <div className="address_info">
            <div style={{ padding: '20px' }}>
              <h3 className="width_common left">Thông tin nhận hàng</h3>
              <p>Họ và tên:  {userinfo&&userinfo.nameUser}</p>
              <p>Số điện thoại: {userinfo&&userinfo.phoneNum}</p>
              <p>Địa chỉ nhận hàng:</p>
              {usedAddresses.map((address) => (
                        <CardAddressUsed
                        key={address.idAddress}
                        name={address.name}
                        phonenum={address.phoneNumber}
                        address={`${address.province}, ${address.district}, ${address.ward}`}
                        isused={address.used}
                        />
                    ))}
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
                  // checked={selectedOption === "fast"}
                  // onChange={handleOptionSelect}
                />
                Nhanh
              </label>
              <label className="width_common choose">
                <input
                  type="radio"
                  name="shipping"
                  value="economical"
                  // checked={selectedOption === "economical"}
                  // onChange={handleOptionSelect}
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
              {/* {selectedCarts.map((cart) => (
              <CardOrder
                key={cart.idcart}
                image={cart.image}
                name={cart.name}
                price={cart.price}
                size={cart.size}
                num={cart.num}
                idcake={cart.idcake}
              />
            ))} */}
             {selectedCarts.map((cart) => (
        <CardOrder
          key={cart.idcart}
          image={cart.image}
          name={cart.name}
          price={cart.price} // Access the specific property containing the price value
          size={cart.size}
          num={cart.num}
          idcake={cart.idcake}
        />
      ))}
          
              <div className="donhang_tamtinh">
                <div className="tamtinh_price">
                <h3>Tạm tính:</h3>
                {/* {cakes[0].price * selectedCarts[0].num/1000}.000 đ */}
                {cakes.length > 0 ? cakes[0].price * selectedCarts[0].num/1000 + ".000 đ" : ""}
                  {/* <h3>Tạm tính: {selectedCarts.reduce((total, cart) => total + cart.price * cart.num, 0) / 1000}.000 VNĐ</h3> */}
                </div>
                <div className="relative">
                  <input className="form-control" type="text" name="tmpVoucherCode" placeholder="Nhập mã Voucher" data-gtm-form-interact-field-id="0" />
                  <button className="btn_chuasudung" type="button">Sử dụng</button>
                </div>
                <div>
                <div class="block_total_order width_common ">
                  <div class="thanhtien width_common space_bottom_10">
                    <div class="tamtinh_left left"><h3>Thành tiền:</h3></div>
                    <div class="tamtinh_right right txt_color_2"> 
                      {selectedCarts.map((cart) => (
                        <h3 key={cart.idcart}> {cakes.length > 0 ? cakes[0].price * selectedCarts[0].num/1000 + ".000 đ" : ""}</h3>
                      ))}</div>
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

export default Payment_BuyNow;
