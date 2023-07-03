import React , {useState}from "react";

import "../styles/ViewMore.css"

import { Link } from "react-router-dom";
function ViewMore({ Links, dataFromParent }) {
  
  const defaultStyle = {
    backgroundColor: "",
    color: ""
  };
  const hoverStyle = {
    backgroundColor: "#8F3C02",
    color: "white"
  };
  const [style1, setStyle1] = useState(defaultStyle);
  return (
    <div className="ViewMore_cpn">
      <Link to={`${Links}?Category=${dataFromParent}`}>
          <button className="btn_ViewMore_cpn"style={style1}
            onMouseEnter={() => setStyle1(hoverStyle)}
            onMouseLeave={() => setStyle1(defaultStyle)}> Xem thêm </button>
      </Link>

    </div>
  );
}
export default ViewMore;

