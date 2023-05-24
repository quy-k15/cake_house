import React from "react";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import pizza from "../assets/pizza.jpeg";
import tiramisu from "../assets/Tiramisu.png";
import mochi from "../assets/MoChi.png";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import "../styles/LikedProducts.css";

export const LikedProductData = [
    {
        image: <img src={mochi} />,
        name: "Pizza",
        count: 1,
        price: 50 + " VND",
        icon: <DeleteOutlineIcon/>, 
        icon1:<AddShoppingCartIcon />,
        link:"/"
    },
    {
        image: <img src={tiramisu} />,
        name: "Tiramisu",
        count: 10,
        price: 50 + " VND",
        icon: <DeleteOutlineIcon/>,
        icon1:<AddShoppingCartIcon />,
        link:"/addressbook"
    },
    
];
    

    

