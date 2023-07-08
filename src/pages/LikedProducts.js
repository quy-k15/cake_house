import React, { useState, useEffect } from "react";
import "../styles/LikedProducts.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { LikedProductData } from "../components/LikedProductData";
import SideMenu from "../components/SideMenu";
import { collection, getDocs, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from "react-router-dom";

function LikedProducts() {
  const [loves, setLoves] = useState([]);
  const [cake, setCake] = useState([]);
  const [email, setEmail] = useState('');
  const [userinfo, setUserinfo] = useState();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { user } = UserAuth();

  useEffect(() => {
    const getLoves = async () => {
      try {
        const lovesSnapshot = await getDocs(collection(db, 'loves'));
        const lovesArray = lovesSnapshot.docs.map((doc) => ({
          idlove: doc.id,
          ...doc.data()
        }));
        setLoves(lovesArray);
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };

    getLoves();
  }, []);

  useEffect(() => {
    const getCakeData = async () => {
      const cakePromises = loves.map(async (love) => {
        const cakeData = await getCake(love.idcake);
        return cakeData !== null ? cakeData : null;
      });
      const cakeDataArray = await Promise.all(cakePromises);
      setCake(cakeDataArray);
    };

    getCakeData();
  }, [loves]);

  const getCake = async (idcake) => {
    const q = query(collection(db, "cakes"), where("idcake", "==", idcake));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const cakeData = doc.data();
      return cakeData; // Return the cake data
    }

    return null;
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const userQuery = async () => {
      if (email) {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setUserinfo(doc.data());
        }
      }
    };

    userQuery();
  }, [email]);

  const currentUserid = userinfo?.idUser;
  const filteredCarts = loves.filter((love) => love.iduser === currentUserid);

  const deleteProduct = async (idlove) => {
    try {
      const loveDocRef = doc(db, 'loves', idlove);
      await deleteDoc(loveDocRef);
      setLoves(loves.filter((love) => love.idlove !== idlove));
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDeleteProduct = (idlove) => {
    setProductToDelete(idlove);
    setShowConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setProductToDelete(null);
  };

  return (
    <div className="full">
      <div className="leftSide">
        <SideMenu />
      </div>
      <div className="rightSide">
        <div className="LikeProduct">
          <ul className="ProductList">
            <div className="categories">
              <p className="spyt">Sản phẩm yêu thích</p>
              <p className="sl">Trạng thái</p>
              <p className="dg">Đơn giá</p>
              <p className="tt">Thao tác</p>
            </div>

            {filteredCarts.map((likedProduct, key) => {
              const loveIndex = loves.findIndex((love) => love.idlove === likedProduct.idlove);
              const cakeData = cake[loveIndex];

              if (cakeData) {
                return (
                  <li className="row" key={key}>
                    <Link to={`/detail/${cakeData.idcake}`} style={{ textDecoration: "none" }}>
                      <div id="image"><img className="CardCart_img" src={cakeData.img1} alt={cakeData.name} /></div>
                    </Link>
                    <Link to={`/detail/${cakeData.idcake}`} style={{ textDecoration: "none" }}>
                      <div id="name">{cakeData.name}</div>
                    </Link>
                    <div id="count">{cakeData.status}</div>
                    <div id="price">{cakeData.price/1000}.000</div>
                    <div id="icon" onClick={() => handleDeleteProduct(likedProduct.idlove)}><DeleteOutlineIcon /></div>
                    <div id="icon1"><AddShoppingCartIcon /></div>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="confirm_dialog">
          <div className="confirm_dialog-content">
            <h3>Xác nhận!</h3>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            <div className="confirm_buttons">
              <button onClick={() => deleteProduct(productToDelete)}>Xóa</button>
              <button onClick={handleCancelDelete}>Hủy</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default LikedProducts;
