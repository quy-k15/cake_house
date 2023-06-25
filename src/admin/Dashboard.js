import Widget from "../components/Widget";
import Featured from "../components/Featured";
import "../styles/Order.css";
import SideMenuAdmin from "./SideMenuAdmin";

const Dashboard = () => {
  return (
    <div className="home">
      <div className="homeContainer">
      <SideMenuAdmin />
        <div className="widgets">
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
