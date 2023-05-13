import React from "react";
import { Link } from "react-router-dom";
import { MenuList } from "../helpers/MenuList";
import CardCategory from "../components/CardCategory";
import CardFeedBack from "../components/CardFeedBack";
import CardCake from "../components/CardCake";
import banhkem1 from "../assets/BanhKem1.png";
import banhkem1_1 from "../assets/BanhKem1_1.png";
import banhkem1_2 from "../assets/BanhKem1_2.png";
import "../styles/DetailCake.css"
import {ListBestSeller} from "../helpers/ListBestSeller"
import {ListFeedBack} from "../helpers/ListFeedBack"
import { useState } from "react";


function Detail_item(){
    

    // const [counter,setCounter]=useState(0);

    return(
        <div className="detail">
            <div className="detail_item_card">
                <div className="detail_group_img">
                    <div className="detail_secondary_img">
                        <img className="detail_img_1" src={banhkem1_1}></img>
                        <img className="detail_img_2" src={banhkem1_2}></img>
                    </div>
                    <img className="detail_img_center" src={banhkem1}></img>
                </div>
                <div className="detail_info">
                    <div className="detail_name_review">
                        <h1>Bánh kem</h1>
                        <p>review</p>
                    </div>
                    <h2>150.000 VND </h2>
                    <div className="detail_button_size">
                        <p>Kích thước</p>
                        <div className="button_size">
                            <button>20-20-20 cm</button>
                            <button>30-30-30 cm</button>
                            <button>30-30-30 cm</button>
                            <button>Khác</button>
                        </div>

                    </div>
                    <div className="detail_number">
                        <p>Số lượng: </p>
                        <div className="detail_number_button">
                            <button> + </button>
                            <h2>00</h2>
                            <button> - </button>
                        </div>
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
                <div class="my-div">
                    <div class="line1_Chitiet"></div>
                    <div class="detail_BanhLienQuan"> 
                        <h2>Mô tả và Chi tiết của sản phẩm</h2>
                    </div>
                    <div class="line2_Chitiet"></div>
                </div>
                
                <div className="detail_ChiTiet_div">
                    <div className="detail_ChiTiet">
                        <h2>Chi tiết sản phẩm</h2>
                        <p>Bánh được làm thủ công không chất bảo quản. Hương vị .....</p>
                        <p>saucbyjhcbWIBCSIALHCDSULACBIL</p>
                        <p>CDSULACBILdhcbaeudbibvdueaihbCDSULACBILdhcbaeudbibvdueaihb</p>
                    </div>
                    <div className="detail_ChiTiet_div_img">
                        <img className="detail_ChiTiet_img" src={banhkem1_1}></img>
                    </div>
                </div>
                <div className="detail_MoTa_div">
                    <div className="detail_Mota_div_img">
                        <img className="detail_MoTa_img" src={banhkem1_2}></img>
                    </div>
                    <div className="detail_MoTa">
                        <h2>Mô tả sản phẩm</h2>
                        <p>Kích thước: 20-20-20 cm (dài- rộng - cao)</p>
                        <p>Khối lượng: 500g</p>
                        <p>Thành phần: Bột mì, trứng, dầu ô liu,.....</p>
                        <p>Cách bảo quản: Bảo quản trong nhiệt độ 20-25 độ C.</p>
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