import "../styles/Order.css"
import Table from "../components/Table";
import SideMenuAdmin from "./SideMenuAdmin";

const Order = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <SideMenuAdmin />
        <div className="listContainer">
        <div className="listTitle">Quản lý đơn hàng</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Order;