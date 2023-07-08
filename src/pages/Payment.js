import React, { useState, useEffect } from "react";
import "../styles/Payment.css";
import Cake1 from "../assets/Tiramisu_Category.png";
import CardOrder from "../components/CardOrder";
import OrderDetail from "../components/OrderDetail";
import { useHistory, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where, } from 'firebase/firestore/lite';
import { db } from "../firebase";
import Noti_Order from "../components/Noti_Order";
import { VoucherData } from "../components/VoucherData";
import CardAddressUsed from "../components/CardAddressUsed";


const Payment = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const history = useHistory(); // Access the history object
  const location = useLocation();
  const selectedCarts = location.state.selectedCarts;
  console.log("selectedCarts", selectedCarts);



  const ShippingMethod = () => {
    const [cakes, setCakes] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");// Lấy những sản phẩm đã chọn bên giỏ hàng.
    const handleOptionSelect = (event) => {
      setSelectedOption(event.target.value);
    };

    // Lấy thông tin user
    const { user } = UserAuth();
    const [userinfo, setUser] = useState();
    const [email, setEmail] = useState('');
    const [allPrice, setAllPrice] = useState('');
    const [voucher,setvoucher]=useState([]);
    const [usedAddresses, setUsedAddresses] = useState([]);
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
        const totalPrice = calculateTotalPrice() - (calculateTotalPrice() * (inputValue /100));

        const newOrder = {
          idorder: "",
          iduser: userinfo.idUser,
          idcart: selectedCarts.map((cart) => cart.idcart),
          date: { formattedDate },
          allPrice: totalPrice,
          status: "Chờ xác nhận",
          address:usedAddresses

        };
        const CartCol = collection(db, "orders");
        const docRef = await addDoc(CartCol, newOrder);
        const generatedId = docRef.id;
        await updateDoc(doc(db, "orders", generatedId), { idorder: generatedId });

        console.log("cart created successfully!");
        history.push("/ConfirmPurchase");
      } catch (error) {
        console.error("Error creating order:", error);
      }


    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = () => {
      setIsModalOpen(true);
    };

    const getvoucher = async () => {
      try {
        const voucherSnapshot = await getDocs(collection(db, 'vouchers'));
        const voucherArray = voucherSnapshot.docs.map((doc) => ({
          idvoucher: doc.id,
          ...doc.data()
        }));
        setvoucher(voucherArray);
        console.log("voucherArray",voucherArray);
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };
    useEffect(()=>{
      getvoucher();
    },[]);
    const handleUpdate = async (event, val) => {
      event.preventDefault();
      setIsModalOpen(false);
      setInputValue(val.percent);
    }
    const handleCloseModal = async () => {
      setIsModalOpen(false);
    }
    useEffect(() => {
      if (userinfo) {
        getAddress();
      }
    }, [userinfo]);
    return (
      <>
        <div className="payment_body">
          <div className="payment_body_left">
            <div className="address_info">
              <div style={{ padding: '20px' }}>
                <h3 className="width_common left">Thông tin nhận hàng</h3>
                <p>Họ và tên:  {userinfo && userinfo.nameUser}</p>
                <p>Số điện thoại: {userinfo && userinfo.phoneNum}</p>
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
                    <input className="form-control" type="text" name="tmpVoucherCode" placeholder="Nhập mã Voucher" data-gtm-form-interact-field-id="0" value={"Giảm " + calculateTotalPrice() * (inputValue /100) + " VNĐ"}/>
                    <button className="btn_chuasudung" type="button" onClick={handleModal}>Chọn voucher</button>
                  </div>
                  <div>
                    <div class="block_total_order width_common ">
                      <div class="thanhtien width_common space_bottom_10">
                        <div class="tamtinh_left left"><h3>Thành tiền:</h3></div>
                        <div class="tamtinh_right right txt_color_2"><h3>{calculateTotalPrice() - (calculateTotalPrice()  * (inputValue /100))} VNĐ</h3></div>
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
        {isModalOpen && (
          <div className="modalvoucher">
            <div className="all_voucher">
              {/* {VoucherData.map((val, key) => { */}
              {voucher.map((val) => {
                return (
                  <div
                    className="row_voucher"
                    // key={key}
                  // id={window.location.pathname == val.link ? "active" : ""}
                  // onClick={() => {
                  //     window.location.pathname = val.link;
                  // }}
                  >
                    {""}

                    <div className="detail_voucher">
                      {/* <div className="col1">
                        <div id="image">{val.image}</div>
                      </div> */}
                      <div className="col2">
                        <div id="title">{val.title}</div>
                        <div id="content">{val.content}</div>
                        {/* <div id="time">{val.time}</div> */}
                      </div>
                      <div className="col3">
                        <button id="btn_use" onClick={(e) => handleUpdate(e, val)}>
                          Chọn
                        </button>

                      </div>
                    </div>
                  </div>
                );
              })}
              <button id="btn_close" onClick={(e) => handleCloseModal()}> Đóng </button>
            </div>

          </div>
        )}
      </>
    );
  };

  return <ShippingMethod />;
};

export default Payment;
