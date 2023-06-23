import BanhBongLan from "../assets/BanhBongLan.png";
import BanhKem1 from "../assets/BanhKem1.png";
import MoChi from "../assets/MoChi.png";
import Macaron from "../assets/Macaron.png";
import Tiramisu from "../assets/Tiramisu.png";
import BlackForest from "../assets/BlackForest.png";
import Limburg from "../assets/LimburgPie.png";
import Cookies from "../assets/Cookies.png";

const ListBestSeller = [
  {
    id:"SP0001",
    name: "Bánh bông lan",
    image: BanhBongLan,
    price: 15.99,
    size: 300.0,
  },
  {
    id:"SP0002",
    name: "Bánh kem",
    image: BanhKem1,
    price: 15.99,
    size: 300.0,
  },  
  {
    id:"SP0003",
    name: "MoChi",
    image: MoChi,
    price: 15.99,
    size: 300.0,
  },
  {
    id:"SP0004",
    name: "Macaron",
    image: Macaron,
    price: 15.99,
    size: 300.0,
  },
  {
    id:"SP0005",
    name: "Tiramisu",
    image: Tiramisu,
    price: 15.99,
    size: 300.0,
  },
  {
    id:"SP0006",
    name: "Black Forest",
    image: BlackForest,
    price: 15.99,
    size: 300.0,
  },
  {
    id:"SP0007",
    name: "Limburg Pie",
    image: Limburg,
    price: 15.99,
    size: 300.0,
  },
  {
    id:"SP0008",
    name: "Cookie",
    image: Cookies,
    price: 15.99,
    size: 300.0,
  },

  
 
]
function getProductData(id){
  let productData = ListBestSeller.find(product => product.id===id);
  if(productData ==undefined){
    console.log("Không có sản phẩm nào có id là:" +id);
    return productData;
  }

}
export {ListBestSeller,getProductData};

