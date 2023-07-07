import React, { useState } from "react";
import NavbarOrders from "../components/NavbarOrders";
import SideMenu from "../components/SideMenu";
import { OrdersData } from "../components/OrdersData";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as lightStar } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Rated.css";


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

  return (
    <div className="MyOrders">
      <div className="leftSide">
        <SideMenu />
      </div>
      <div className="rightSide">
        <NavbarOrders />
        <div className="all_purchase">
          {OrdersData.map((val, key) => {
            return (
                <div
                className="row"
                key={key}
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {
                    if (val.link) {
                    window.location.pathname = val.link;
                    }
                }}
                >
                <div className="ruler_status">
                  <div id="id">
                    {val.id}
                    <div id="id_inf">123456789</div>
                  </div>

                  <div id="tradeDate">
                    {val.tradeDate}
                    <div id="tradeDate_inf">12/06/2023</div>
                  </div>
                  <div id="status">
                    {val.receivingdate}
                    <div id="status_inf">13/06/2023</div>
                  </div>
                  <div>
                    <button id="btn_detail">
                      Xem chi tiết <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>

                <div className="detail_purchase">
                  <div className="col1">
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
                    <button className="buyagain">Mua lại</button>
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