import React from "react";
import { useState } from "react";
import "../styles/CardCart.css";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { db } from "../firebase";

function CardCart({ image, name, price, size,num,isChecked, onCheckboxChange,onNumChange,cartId}) {
    //Tăng giảm số lượng
    
    const [count,setCount]=React.useState(num)
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
    const handleIncrement = () => {
        const updatedNum = count + 1;
        setCount(updatedNum);
        onNumChange(updatedNum);
        updateNumOnFirebase(cartId, updatedNum);
      };
      
      const handleDecrement = () => {
        if (count > 1) {
          const updatedNum = count - 1;
          setCount(updatedNum);
          onNumChange(updatedNum);
          updateNumOnFirebase(cartId, updatedNum);
        }
      };
      const updateNumOnFirebase = async (cartId, updatedNum) => {
        const cartRef = doc(db, 'carts', cartId);
        await updateDoc(cartRef, { num: updatedNum });
      };
    // Đổi màu button
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
    // Tính tổng tiền sản phẩm
    function AllpriceNum() {
    
        return count * price;
    }

    const [style1, setStyle1] = useState(defaultStyle);
    const [style2, setStyle2] = useState(defaultStyle);
   
    const handleCheckboxChange = () => {
        onCheckboxChange(!isChecked);
      };
    

  return (
    <div className="CardCart">
        <div class="CardCart_input_div"> 
            <label class="CardCart_input">
                {/* <input type="checkbox"/> */}
                {/* <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                /> */}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span class="checkmark"></span>
            </label>
        </div>

        <div className="CardCart_imgdiv"> 
            <img className ="CardCart_img" src={image}></img>
        </div>
        <div className="Cartinfo"> 
            <h2> {name} </h2>
            <h3> size: {size} </h3>
        </div>
        <div className="CartPrice">
            <h2>{price/1000}.000 (VND) </h2>
        </div>
       
        <div className="CartNum">
            <button onClick={subtract} style={style1}
            onMouseEnter={() => setStyle1(hoverStyle_White)}
            onMouseLeave={() => setStyle1(defaultStyle)}
            > - </button>

            <h2>{count}</h2>

            <button onClick={add} style={style2}
            onMouseEnter={() => setStyle2(hoverStyle_White)}
            onMouseLeave={() => setStyle2(defaultStyle)}> + </button>
        </div>
        <div className="CartAllPrice">
            <h2>{AllpriceNum()/1000}.000(VND)</h2>
        </div>
      
    </div>
  );
}

export default CardCart;
