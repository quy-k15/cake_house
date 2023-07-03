
import React, {  useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { db } from "../firebase";
const ProtectedRoute = ({ children }) => {
  const history = useHistory();
  const { user } = UserAuth();
  // const [userinfo, setUser] = useState();
  // const [email, setEmail] = useState('');

  // useEffect(() => {
  //   if (user) {
  //     setEmail(user.email);
  //   }
  // }, [user]);

  // const UserQuery = async () => {
  //   const q = query(collection(db, "users"), where("email", "==", email));
  //   const querySnapshot = await getDocs(q);
  //   if (!querySnapshot.empty) {
  //     const doc = querySnapshot.docs[0];
  //     setUser(doc.data());
  //     console.log("user: ", userinfo);
  //   }
  // };

  // useEffect(() => {
  //   if (email) {
  //     UserQuery();
  //   }
  // }, [email]);

  if (!user) {
    history.push("/login");
    return null;
  }
  // if (userinfo && userinfo.isClient === false) {
  //   history.replace("/dashboard");
  //   return children;
  // }
  
  return children;
};

export default ProtectedRoute;