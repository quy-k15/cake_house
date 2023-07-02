
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const history = useHistory();
  const { user } = UserAuth();


  if (!user) {
    // history.replace("/login");
    history.push("/login"); // Điều hướng đến trang login
    return null; // Trả về null để không hiển thị bất kỳ gì trong khi đợi chuyển hướng
  }


  // useEffect(() => {
  //   if (!user) {
  //     history.push("/login"); // Điều hướng đến trang login
  //   }
  // }, [user, history]);

  // if (!user) {
  //   return null; // Trả về null để không hiển thị bất kỳ gì trong khi đợi chuyển hướng
  // }

  return children;
};

export default ProtectedRoute;