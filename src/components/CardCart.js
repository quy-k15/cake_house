import React from "react";
import { useState } from "react";

function CardCake({ image, name, price, size }) {
    //Tăng giảm số lượng
    
    const [count,setCount]=React.useState(1)
    function add(){
        setCount(prevCount => prevCount + 1)
    }
    function subtract(){
        setCount(prevCount => prevCount - 1)
    }
  
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
  

  return (
    <div className="CardCart">
        <div className="CardCart_input">
            <input type="checkbox" id="myCheckbox"></input>
            
        </div>
        <div className="CardCart_imgdiv"> 
            <img className ="CardCart_img" src={image}></img>
        </div>
        <div className="Cartinfo"> 
            <h2> {name} </h2>
            <h3> {size} (cm) </h3>
        </div>
        <div className="CartPrice">
            <h2>{price} (VND) </h2>
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
            <h2>{AllpriceNum()}(VND)</h2>


        </div>
      
    </div>
  );
}

export default CardCake;
