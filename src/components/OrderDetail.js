import BanhBongLan from "../assets/BanhBongLan.png";
import BanhKem1 from "../assets/BanhKem1.png";
import Tiramisu from "../assets/Tiramisu.png";

const OrderDetail = () => {
  const products = [
    {
      name: "Bánh bông lan",
      image: BanhBongLan,
      description: "Bánh bông lan vị dâu",
      price: 200000,
      quantity: 3,
    },
    {
      name: "Bánh kem",
      image: BanhKem1,
      description: "Bánh kem hoa",
      price: 200000,
      quantity: 3,
    },
    {
      name: "Tiramisu",
      image: Tiramisu,
      description: "Tiramisu vị cacao",
      price: 200000,
      quantity: 3,
    },
  ];

  return products;
};

export default OrderDetail;
