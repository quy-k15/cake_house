import React from "react";
import { Link } from "react-router-dom";
import { MenuList } from "../helpers/MenuList";
import CardCategory from "../components/CardCategory";
import CardFeedBack from "../components/CardFeedBack";
import CardCake from "../components/CardCake";
import DetailSlide from "../components/DetailSlide";
import ic_banker from "../assets/ic_banker.png";
import ic_banker2 from "../assets/ic_banker2.png";
import img_ChiTiet from "../assets/img_detail_ChiTiet.png";
import img_MoTa from "../assets/img_detail_MoTa.png";
import "../styles/DetailCake.css"
import {ListBestSeller} from "../helpers/ListBestSeller"
import {ListFeedBack} from "../helpers/ListFeedBack"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore/lite";

import { db } from "../firebase";
function Detail_item(){

    const { idcake } = useParams();
    const [cakes,setCake]=useState([]);
    
    const getCake = async () => {
        try {
            const cakeRef = doc(collection(db, "cakes"), idcake);
            const cakeSnapshot = await getDoc(cakeRef);
          if (cakeSnapshot.exists()) {
            const cakeData = cakeSnapshot.data();
            setCake([cakeData]);
            console.log(cakeData);
          } else {
            console.error("Cake not found.");
          }
        } catch (error) {
          console.error("Error fetching cake:", error);
        }
    };
    useEffect(()=>{
       
        getCake();
    },[idcake])


    // Tăng giảm số lượng
    const [count,setCount]=React.useState(0)
    function add(){
        setCount(prevCount => prevCount + 1)
    }
    function subtract(){
        setCount(prevCount => prevCount - 1)
    }
    // Thay đổi màu button từ cam => trắng
    // const [bgColor, setBgColor] = useState("");
    // const [textColor, setTextColor] = useState("");
    // const handleMouseEnter = () => {
    //     setBgColor("white");
    //     setTextColor("#CD8042");
    //   };
    
    //   const handleMouseLeave = () => {
    //     setBgColor("");
    //     setTextColor("");
    //   };

    const defaultStyle = {
        backgroundColor: "",
        color: ""
    };
    const hoverStyle = {
        backgroundColor: "white",
        color: "#CD8042"
    };
    const hoverStyle_White = {// Chuyển thành màu trắng
        backgroundColor: "#CD8042",
        color: "white"
    };
      const [style1, setStyle1] = useState(defaultStyle);
      const [style2, setStyle2] = useState(defaultStyle);
      const [style3, setStyle3] = useState(defaultStyle);
      const [style4, setStyle4] = useState(defaultStyle);
      const [style5, setStyle5] = useState(defaultStyle);

      const [style6, setStyle6] = useState(defaultStyle);
      const [style7, setStyle7] = useState(defaultStyle);
      const [style8, setStyle8] = useState(defaultStyle);

    // Chuyển màu click Tim
    const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const getHeartColor = () => {
    if (isClicked) {
      return "var(--red)";
    } else {
      return "var(--star-color)";
    }
  };
    return(
        <div className="detail">
            <div className="detail_item_card">
                <div className="detail_group_img">
                   {/* <DetailSlide/> */}
                   <DetailSlide cakes={cakes} />
                    <div className="detail_love_div">
                        <div className="detail_love">
                            <input type="radio" name="love" onClick={handleClick} style={{ color: getHeartColor() }}></input>
                        </div>
                        <p>700 lượt thích</p>
                    </div>
                    
                </div>
                <div className="detail_info">
                    <div className="detail_review">
                        <div className="detail_rating_star">
                            <input type="radio" name="html"></input>
                            <input type="radio" name="html"></input>
                            <input type="radio" name="html"></input>
                            <input type="radio" name="html"></input>
                            <input type="radio" name="html"></input>
                        </div>
                        <p>(200 đánh giá)</p>
                    </div>
                    <div className="detail_name_review">
                        {cakes.length > 0 && cakes.map((cake) => (
                            <div key={cake.idcake}>
                                <h1>{cake.name}</h1>
                            </div>
                        ))}
                        {/* <h1>Bánh kem</h1> */}
                    </div>
                    {cakes.length > 0 && cakes.map((cake) => (
                            <div key={cake.idcake}>
                                <h2>{cake.price} VNĐ</h2>
                            </div>
                    ))}
                  
                    <div className="detail_button_size">
                        <p>Kích thước:</p>
                        <div className="button_size">
                            <button   style={style1}
                            onMouseEnter={() => setStyle1(hoverStyle)}
                            onMouseLeave={() => setStyle1(defaultStyle)}>S</button>
                            <button style={style2}
                            onMouseEnter={() => setStyle2(hoverStyle)}
                            onMouseLeave={() => setStyle2(defaultStyle)}>M</button>
                            <button style={style3}
                            onMouseEnter={() => setStyle3(hoverStyle)}
                            onMouseLeave={() => setStyle3(defaultStyle)}>L</button>
                            <button style={style4}
                            onMouseEnter={() => setStyle4(hoverStyle)}
                            onMouseLeave={() => setStyle4(defaultStyle)}>Khác</button>
                        </div>
                    </div>
                    <div className="detail_number">
                        <div className="detail_number_info">
                            <p>Số lượng: </p>
                        </div>
                        <div className="detail_number_button">
                            <button onClick={subtract} style={style6}
                            onMouseEnter={() => setStyle6(hoverStyle_White)}
                            onMouseLeave={() => setStyle6(defaultStyle)}> - </button>
                            <h2>{count}</h2>
                            <button onClick={add} style={style7}
                            onMouseEnter={() => setStyle7(hoverStyle_White)}
                            onMouseLeave={() => setStyle7(defaultStyle)}> + </button>
                        </div>
                    </div>
                    <div className="detail_buy">
                        <button className="btn_addCart" style={style8}
                            onMouseEnter={() => setStyle8(hoverStyle_White)}
                            onMouseLeave={() => setStyle8(defaultStyle)}> 
                            <div className="detail_addcart_button" style={style8}
                            onMouseEnter={() => setStyle8(hoverStyle_White)}
                            onMouseLeave={() => setStyle8(defaultStyle)}>Thêm vào giỏ hàng</div>
                            <div className="btn_addCart_icon">
                                <i class="fa-solid fa-cart-plus"></i>
                            </div>  
                        </button>
                        <button className="detail_buy_button" style={style5}
                            onMouseEnter={() => setStyle5(hoverStyle)}
                            onMouseLeave={() => setStyle5(defaultStyle)}> Mua Ngay</button>
                    </div>
                </div>
            </div>
            <div class="my-div">
                <div class="line1_LienQuan"></div>
                <div class="detail_BanhLienQuan"> 
                    <h2>Những loại bánh liên quan</h2>
                </div>
                <div class="line2_LienQuan"></div>
            </div>
            <div className="HomeBestSeller">
                {ListBestSeller.slice(0, 4).map((cardCake, key) => {
                    return (
                        <CardCake
                        key={key}
                        image={cardCake.image}
                        name={cardCake.name}
                        price = {cardCake.price}
                        size = {cardCake.size}
                        />
                    );
                })}
            </div>
            <div className="detail_ChiTiet_MoTa">
                <div className="chitiet_background">
                    <div class="my-div">
                        <div class="line1_Chitiet"></div>
                        <div class="detail_BanhLienQuan"> 
                            <h2>Mô tả và Chi tiết của sản phẩm</h2>
                        </div>
                        <div class="line2_Chitiet"></div>
                    </div>
                    <div className="detail_ChiTiet_div">
                    <div className="detail_ChiTiet">
                        <div className="detail_ChiTiet_header">
                            <div className="detail_header_img_div">
                                <img className="detail_header_img" src={ic_banker}></img>
                            </div>
                            <h2>Chi tiết sản phẩm</h2>
                        </div>
                        <div className="detail_ChiTiet_info">
                            {cakes.length > 0 && cakes.map((cake) => (
                                <div key={cake.idcake}>
                                    <p>{cake.detail}</p>
                                </div>
                            ))}
                           
                            {/* <p>Bánh được làm thủ công không chất bảo quản. Hương vị .....</p>
                            <p>saucbyjhcbWIBCSIALHCDSULACBIL</p>
                            <p>CDSULA CBILd hcbaeud bibvdu eaihbCDS ULACBI Ldhcbaeudbi bvdueaihb</p> */}
                        </div>
                    </div>
                    <div className="detail_ChiTiet_div_img">
                        <img className="detail_ChiTiet_img" src={img_ChiTiet}></img>
                    </div>
                </div>
                </div>
                <div className="detail_MoTa_div">
                    <div className="detail_Mota_div_img">
                        <img className="detail_MoTa_img" src={img_MoTa}></img>
                    </div>
                    <div className="detail_MoTa">
                        <div className="detail_MoTa_header">
                            <h2>Mô tả sản phẩm</h2>
                            <div className="detail_header_MoTa_img_div">
                                <img className="detail_header_MoTa_img" src={ic_banker2}></img>
                            </div>
                        </div>
                        <div className="detail_MoTa_info">
                            {cakes.length > 0 && cakes.map((cake) => (
                                <div key={cake.idcake}>
                                    <ul>
                                        <li>
                                            {cake.describe}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                            {/* <ul>
                                <li>Kích thước: 20-20-20 cm (dài- rộng - cao)</li>
                                <li>Khối lượng: 500g</li>
                                <li>Thành phần: Bột mì, trứng, dầu ô liu,.....</li>
                                <li>Cách bảo quản: Bảo quản trong nhiệt độ 20-25 độ C</li>
                                <li>aaaaa aaaaaaaa aaaaaa  aaaaaaaaaaaa aaaaaaa aaaaaa aaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaa</li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail_Feedback">
                <div class="my-div_feedback">
                    <div class="line1_Chitiet"></div>
                    <div class="detail_BanhLienQuan"> 
                        <h2>Đánh giá của khách hàng</h2>
                    </div>
                    <div class="line2_Chitiet"></div>
                </div>
                <div className="detai_item_FeedBack">
                    {ListFeedBack.slice(0, 2).map((cardFeedBack, key) => {
                    return (
                        <CardFeedBack
                        key={key}
                        image={cardFeedBack.image}
                        name={cardFeedBack.name}
                        comment={cardFeedBack.comment}
                        />
                    );
                    })}
                </div>
            </div>
        </div>
    );
}
export default Detail_item;