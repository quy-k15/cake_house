import React from "react";
import "../styles/Header.css"
function header({ name }) {
  return (
    <div class="my-div">
    <div class="line1"></div>
    <div class="header_name"> 
      <h2>{ name }</h2>
    </div>
    <div class="line2"></div>

</div>
  );
}

export default header;
