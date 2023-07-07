import React from "react";
import { Link } from "react-router-dom";
import { MenuList } from "../helpers/MenuList";
import CardCategory from "../components/CardCategory";
import CardFeedBack from "../components/CardFeedBack";
import CardCake from "../components/CardCake";
import DetailSlide from "../components/DetailSlide";
import Cake_category_slide from "../components/Cake_Category_Slide";
import ic_banker from "../assets/ic_banker.png";
import ic_banker2 from "../assets/ic_banker2.png";
import img_ChiTiet from "../assets/img_detail_ChiTiet.png";
import img_MoTa from "../assets/img_detail_MoTa.png";
import "../styles/DetailCake.css"
import {ListBestSeller} from "../helpers/ListBestSeller"
import {ListFeedBack} from "../helpers/ListFeedBack"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import Noti_Success from "../components/Noti_Success";
import Error_Need_Login from "../components/Error_Need_Login";
function Detail_item(){

    const { idcake } = useParams();// Lấy id cake từ home page
    const [cake,setCake]=useState([]);
    const[category, setCategory]=useState('');// gửi category qua qua cake_category_slide
    const[loves,setLoves]=useState([]);

    
  
    const getCake = async () => {
        try {
          const cakeRef = doc(collection(db, "cakes"), idcake);
          const cakeSnapshot = await  getDoc(cakeRef);
          if (cakeSnapshot.exists()) {
            const cakeData = cakeSnapshot.data();
            // setCake([cakeData]);
            setCake(cakeData);
            setCategory(cakeData.category); // Update the category state
            console.log("cakeData.category",cakeData.category);
          } else {
            console.error("Cake not found.");
          }
        } catch (error) {
          console.error("Error fetching cake:", error);
        }
      };

      useEffect(() => {
        getCake();
      }, [idcake]);


    // Tăng giảm số lượng
    const [count,setCount]=React.useState(1)
    function add(){
        setCount(prevCount => prevCount + 1)
    }
    function subtract(){
        if (count === 1) {
            // Prevent decrementing below 1
            return;
        }
        setCount(prevCount => prevCount - 1)
    }
    const defaultStyle = {
        backgroundColor: "",
        color: ""
    };
    // const hoverStyle = {
    //     backgroundColor: "white",
    //     color: "#CD8042"
    // };


    const selectedStyle = {
        backgroundColor: "white",
        color: "#CD8042"
    };

    const hoverStyle_White = {// Chuyển thành màu trắng
        backgroundColor: "#CD8042",
        color: "white"
    };
  
      const [style5, setStyle5] = useState(defaultStyle);

      const [style6, setStyle6] = useState(defaultStyle);
      const [style7, setStyle7] = useState(defaultStyle);
      const [style8, setStyle8] = useState(defaultStyle);


//    Lấy dữ liệu chọn size
    const [selectedSize, setSelectedSize] = useState('');
    const handleClickSize = (size) => {
        setSelectedSize(size);
    };


// Hiển thị thông báo khi add vô giỏ hàng thàng công
const [showNoti, setShowNoti] = useState(false);
const [showNotiLogin, setShowNotiLogin] = useState(false);


// Thêm sản phẩm vô giỏ hàng
const uploadTasks = []; 

    const { user } = UserAuth();
    const [idUser, setIdUser] = useState('');
    // console.log("user_id",user&&user.idUser);
    const [email,setEmail]  = useState('');
    const [userinfo,setUser]  = useState();

    // const SetEmails = () => {
    //     setEmail(user&&user.idUser);
    // };
   
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
            console.log("userinfo: ", userinfo);
        }
    };
    useEffect(() => {
        if (email) {
          UserQuery();
        }
      }, [email]);
    
    // console.log("user_email",user&&user.email);

    // useEffect(() => {
    //   if (user) {
    //     setIdUser(user&&user.idUser);
    //     console.log("user id: ", idUser);
    //   }
    // }, [user]);


    
    const handleAddCart = async () => {
        try {
            // UserQuery();
            if (!userinfo) {
                setShowNotiLogin(true);
                setTimeout(() => {
                    setShowNotiLogin(false);
                }, 3000);
                return;
              }

            const newCart = {
                idcake: idcake,
                idcart: "",
                iduser: userinfo.idUser,
                num: count,
                size: selectedSize
            };
                const CartCol = collection(db, "carts");
                const docRef = await addDoc( CartCol, newCart);
                const generatedId = docRef.id;
                await updateDoc(doc(db, "carts", generatedId), {  idcart: generatedId });

                console.log("cart created successfully!");
        } catch (error) {
            console.error("Error creating order:", error);
        }
        setShowNoti(true);
        setTimeout(() => {
            setShowNoti(false);
        }, 3000);
    };
        // Chuyển màu click Tim
        const [isClicked, setIsClicked] = useState(false);
        const [inputKey, setInputKey] = useState(0);

        //   const handleClick = () => {
        //     setIsClicked(!isClicked);
        //   };
        
        //   const getHeartColor = () => {
        //     if (isClicked) {
        //       return "var(--red)";
        //     } else {
        //       return "var(--star-color)";
        //     }
        //   };
            const getloves = async () => {
                try {
                const lovesSnapshot = await getDocs(collection(db, 'loves'));
                const lovesArray = lovesSnapshot.docs.map((doc) => ({
                    idlove: doc.id,
                    ...doc.data()
                }));
                setLoves(lovesArray);
                console.log("lovesArray",lovesArray);
                } catch (error) {
                console.error('Error fetching carts:', error);
                }
            };
            useEffect(()=>{
                getloves();
            },[]);
            useEffect(() => {
                const checkLikedStatus = () => {
                  const foundLike = loves.find(
                    (like) => like.idcake === idcake && like.iduser === userinfo?.idUser
                  );
                  setIsClicked(foundLike !== undefined);
                };
            
                checkLikedStatus();
                console.log("isClicked", isClicked);
              }, [loves, idcake, userinfo]);
            
              const handleAddLoveCake = async () => {
                try {
                  const newLove = {
                    idcake: idcake,
                    idlove: "",
                    iduser: userinfo?.idUser,
                  };
                  const docRef = await addDoc(collection(db, "loves"), newLove);
                  const generatedId = docRef.id;
                  await updateDoc(doc(db, "loves", generatedId), { idlove: generatedId });
                  setIsClicked(true);
                  console.log("Love entry added successfully!");
                  setInputKey((prevKey) => prevKey + 1);
                } catch (error) {
                  console.error("Error adding love entry:", error);
                }
              };
            
              const getHeartColor = () => {
                return isClicked ? "var(--red)" : "var(--star-color)";
              
        
              };
            
            //   useEffect(() => {
            //     getHeartColor();
            //     console.log("red");
            //   }, []);

    // const handleAddLoveCake = async () => {
    // setIsClicked(!isClicked);
    // try {
    //     // UserQuery();
    //     const newLove = {
    //     idcake: idcake,
    //     idlove: "",
    //     iduser: userinfo.idUser,

    //     };
    //     const CartCol = collection(db, "loves");
    //     const docRef = await addDoc( CartCol, newLove);
    //     const generatedId = docRef.id;
    //     await updateDoc(doc(db, "loves", generatedId), {  idlove: generatedId });

    //     console.log("loves created successfully!");
    //     } catch (error) {
    //     console.error("Error loving:", error);
    //     }
    // };

    return(
        <div className="detail">
            <div className="detail_item_card">
                <div className="detail_group_img">
                   {/* <DetailSlide/> */}
                   <DetailSlide dataFromParent={ idcake} />
                    
                    <div className="detail_love_div">
                        <div className="detail_love">
                            {/* <input type="radio" name="love" onClick={handleAddLoveCake} style={{ color: getHeartColor() }}key={inputKey}></input> */}
                            <input
                                type="radio"
                                name="love"
                                onClick={handleAddLoveCake}
                                style={{ color: getHeartColor() }}
                            />
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
                   
                        <div key={cake.idcake}>
                            <h1>{cake.name}</h1>
                        </div>
                      
                    </div>
                        {/* {cake.length > 0 && cake.map((cake) => (
                            <div key={cake.idcake}>
                                <h2>{cake.price} VNĐ</h2>
                            </div>
                        ))} */}
                    <div key={cake.idcake}>
                        <h2>{cake.price} VNĐ</h2>
                    </div>
                  
                    <div className="detail_button_size">
                        <p>Kích thước:</p>
                        <div className="button_size">
                            <button    style={selectedSize === "S" ? defaultStyle : selectedStyle}
                                onClick={() => handleClickSize("S")}>S</button>
                            <button style={selectedSize === "M" ? defaultStyle : selectedStyle}
                                onClick={() => handleClickSize("M")}>M</button>
                            <button style={selectedSize === "L" ? defaultStyle : selectedStyle}
                                onClick={() => handleClickSize("L")}>L</button>
                            <button style={selectedSize === "XL" ? defaultStyle : selectedStyle}
                                onClick={() => handleClickSize("XL")}>XL</button>
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
                            onMouseLeave={() => setStyle8(defaultStyle)}  onClick={handleAddCart}> 
                            <div className="detail_addcart_button" 
                                style={style8}
                                onMouseEnter={() => setStyle8(hoverStyle_White)}
                                onMouseLeave={() => setStyle8(defaultStyle)}
                               >Thêm vào giỏ hàng</div>
                            <div className="btn_addCart_icon">
                                <i class="fa-solid fa-cart-plus"></i>
                            </div>  
                        </button>
                        <button className="detail_buy_button" style={style5}
                            onMouseEnter={() => setStyle5(selectedStyle )}
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
            <div className="Cake_LienQuan">
                <Cake_category_slide dataFromParent={category || ""} />
                
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
                            <div key={cake.idcake}>
                                <p>{cake.detail}</p>
                            </div>
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
                        <div key={cake.idcake}>
                                    <ul>
                                        <li>
                                            {cake.describe}
                                        </li>
                                    </ul>
                                </div>
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
            {showNoti && <Noti_Success onClose={() => setShowNoti(false)}  status="Thêm vô giỏ hàng thành công!"/>}
            {showNotiLogin && <Error_Need_Login onClose={() => setShowNotiLogin(false)} />}
        </div>
    );
}
export default Detail_item;