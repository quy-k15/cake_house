import React, { useState, useEffect } from 'react';
import '../styles/Table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cake from '../assets/AB.png';
import Cake1 from '../assets/Tiramisu_Category.png';
import Cake2 from '../assets/img_Cake_Category.png';
import Cake3 from '../assets/img_Cookies_Category.png';
import Cake4 from '../assets/img_Mochi_Category.png';
import { collection, getDocs,doc,docs ,query, where,updateDoc} from 'firebase/firestore/lite';
import { db } from "../firebase";
import CardOrder from "../components/CardOrder";
import Noti_Success from "../components/Noti_Success";


const Listy = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState("");
  const [showNotiUpdate, setShowNotiUpdate] = useState(false);
  

  const handleRowClick = (orderId) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
    } else {
      setSelectedOrderId(orderId);
    }
  };
  const getOrders = async () => {
    try {
      const q = query(collection(db, "orders"));
      const querySnapshot = await getDocs(q);
      const ordersArray = querySnapshot.docs.map((doc) => ({
        idorder: doc.id,
        ...doc.data()
      }));
      setOrders(ordersArray);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

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
    // const handleUpdate = async (event) => {
    //   event.preventDefault();
  
    // Thực hiện cập nhật status order
    const handleUpdatestatus = async (event, updatedStatus) => {
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
          order.idorder === selectedOrderId ? updatedOrder : order
        );
        setOrders(updatedOrders);

        // Đóng popup
        setShowNotiUpdate(true);
        setTimeout(() => {
          setShowNotiUpdate(false);
        }, 3000);
      } catch (error) {
        console.error("Lỗi khi cập nhật đơn hàng:", error);
      }
    

    // const handleUpdate = async (event, updatedStatus) => {
    //   event.preventDefault();
    
    //   // Thực hiện cập nhật status order
    //   const updatedOrder = {
    //     ...orders.find((order) => order.idorder === selectedOrderId),
    //     status: updatedStatus,
    //   };
    
    //   try {
    //     // Update the order in Firestore
    //     if (selectedOrderId) {
    //       const orderDocRef = doc(db, "orders", selectedOrderId);
    //       await updateDoc(orderDocRef, updatedOrder);
    //       console.log("selectedOrderId", selectedOrderId);
    //     }
    
    //     // Cập nhật danh sách đơn hàng sau khi cập nhật
    //     const updatedOrders = orders.map((order) =>
    //       order.idorder === selectedOrderId ? updatedOrder : order
    //     );
    //     setOrders(updatedOrders);
    
    //     // Đóng popup
    //     setShowNotiUpdate(true);
    //     setTimeout(() => {
    //       setShowNotiUpdate(false);
    //     }, 3000);
    //   } catch (error) {
    //     console.error("Lỗi khi cập nhật đơn hàng:", error);
    //   }
    // };
  
    };
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>ID Đơn hàng</TableCell>
            <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>ID Khách hàng</TableCell>
            <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Ngày</TableCell>
            {/* <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Số lượng</TableCell> */}
            <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders.map((order) => {
          const orderCarts = Array.isArray(order.idcart) ? cart.filter((c) => order.idcart.includes(c.idcart)) : [];

            return (
              <React.Fragment key={order.idorder}>
                <TableRow
                  className={`orderRow ${selectedOrderId === order.idorder ? 'selected' : ''}`}
                  onClick={() => handleRowClick(order.idorder)}
                >
                  <TableCell className="tableCell-id">{order.idorder}</TableCell>
                  <TableCell className="tableCell">{order.iduser}</TableCell>
                  <TableCell className="tableCell">   {order.date && order.date.formattedDate ? order.date.formattedDate : 'N/A'}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </TableCell>
                </TableRow>
                {selectedOrderId === order.idorder && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      {/* Hiển thị thông tin sản phẩm */}
                      <div className="productInfo">
                        <div className="productDetails">
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
                        </div>
                        <div className='productInfo_div'>
                          <div>
                            <h3>Tổng tiền: {order.allPrice} đ</h3>
                          </div>
                          <div className='productInfo_btn'>
                            <button
                              className="btn_XacNhan"
                              style={style1}
                              onMouseEnter={() => setStyle1(hoverStyle)}
                              onMouseLeave={() => setStyle1(defaultStyle)} onClick={(event) => handleUpdatestatus(event, "Xác nhận")}>Xác nhận</button>

                            <button
                              className="btn_Huy"
                              style={style2}
                              onMouseEnter={() => setStyle2(hoverStyle)}
                              onMouseLeave={() => setStyle2(defaultStyle)}  onClick={(event) => handleUpdatestatus(event, "Không xác nhận")}>Hủy</button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
      {showNotiUpdate && <Noti_Success onClose={() => setShowNotiUpdate(false)}  status="Cập nhật thành công!"/>}
    </TableContainer>
  );
};

export default Listy;
