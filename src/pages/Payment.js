import React, { useState } from "react";
import "../styles/Payment.css";
import Cake1 from "../assets/Tiramisu_Category.png";
import CardOrder from "../components/CardOrder";
import OrderDetail from "../components/OrderDetail";
const Payment = () => {
  const ShippingMethod = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionSelect = (event) => {
      setSelectedOption(event.target.value);
    };

    return (
      <div className="payment_body">
        <div className="payment_body_left">
          <div className="address_info">
            <div style={{ padding: '20px' }}>
              <h3 className="width_common left">Thông tin nhận hàng</h3>
              <p>Customer name</p>
              <p>Customer phone</p>
              <p>Address Info</p>
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
              <CardOrder product={OrderDetail()} />
              <div className="donhang_tamtinh">
                <div className="tamtinh_price">
                  <h3>Tạm tính: allorder_price</h3>
                </div>
                <div className="relative">
                  <input className="form-control" type="text" name="tmpVoucherCode" placeholder="Nhập mã Voucher" data-gtm-form-interact-field-id="0" />
                  <button className="btn_chuasudung" type="button">Sử dụng</button>
                </div>
                <div>
                <div class="block_total_order width_common ">
                  <div class="thanhtien width_common space_bottom_10">
                    <div class="tamtinh_left left"><h3>Thành tiền:</h3></div>
                    <div class="tamtinh_right right txt_color_2"><h3>1.063.000đ</h3></div>
                  </div>
                  <div class="btn_dathang width_common space_bottom_10">
                    <button type="submit" class="btn_site_2">Đặt Hàng</button>
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
