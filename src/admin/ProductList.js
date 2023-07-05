import { useState , useEffect} from "react";
import { productRows } from "../components/productData";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";
import { DeleteOutline, Edit } from "@material-ui/icons";
import SideMenuAdmin from "./SideMenuAdmin";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, getDocs,doc,docs,updateDoc,deleteDoc } from 'firebase/firestore/lite';
import { db } from "../firebase";
import Noti_Success from "../components/Noti_Success";

function ProductList() {
  const [cakes,setcakes]=useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState(["Tiramisu", "Bánh kem", "Cookie", "Mochi"]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice]=useState("");
  const [describe, setDescribe]=useState("");
  const [detail, setDetail]=useState("");

 
  const handleDelete = async (id) => {
    // const updatedRows = productRows.filter((product) => product.id !== id);
    // Cập nhật danh sách sản phẩm sau khi xóa
    // ...
    // Cập nhật danh sách sản phẩm sau khi cập nhật
    try {
      // Delete the order from Firestore
      await deleteDoc(doc(db, 'cakes', id));


       // Update the product list after deleting the product
      const updatedCakes = cakes.filter((cake) => cake.idcake !== id);
      setcakes(updatedCakes);

      
  
      // Update the state or perform any additional actions as needed
      setShowNotiDelete(true);
      setTimeout(() => {
        setShowNotiDelete(false);
      }, 3000);
  
    } catch (error) {
      console.error('Error deleting cake:', error);
    }

  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setQuantity(product.stock);
    setCategory(product.category);
    setName(product.name);
    setDescribe(product.describe);
    setDetail(product.detail);
    setPrice(product.price);
    setStatus(product.status);
    setIsModalOpen(true);
  };
  
  const handleClosePopup = () => {
    setSelectedProduct(null);
    setName("");
    setDescribe("");
    setDetail("");
    setPrice("");
    setQuantity("");
    setStatus("");
    setCategory("");
    setIsModalOpen(false);
  };


  const handleUpdate = async (event) => {
    event.preventDefault();

    // Thực hiện cập nhật thông tin sản phẩm
    const updatedProduct = {
      ...selectedProduct,
      name: name,
      describe: describe,
      detail: detail,
      status: status,
      price: price,
      category: category,
    };
    console.log("selectedProduct",selectedProduct)

    try {
      // Update the product in Firestore
      if (selectedProduct && selectedProduct.idcake) {
        const cakeDocRef = doc(db, "cakes", selectedProduct.idcake);
        await updateDoc(cakeDocRef, updatedProduct);
        console.log("selectedProduct",selectedProduct)
      }

      // Cập nhật danh sách sản phẩm sau khi cập nhật
      const updatedCakes = cakes.map((cake) =>
        cake.idcake === selectedProduct.idcake ? updatedProduct : cake
      );
      setcakes(updatedCakes);

      // Đóng popup
      handleClosePopup();
      setShowNotiUpdate(true);
      setTimeout(() => {
        setShowNotiUpdate(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }

  };
  const getCakes = async () => {
    try {
      const cakesSnapshot = await getDocs(collection(db, 'cakes'));
      const cakesArray = cakesSnapshot.docs.map((doc) => ({
        idcake: doc.id,
        ...doc.data()
      }));
      setcakes(cakesArray);
    } catch (error) {
      console.error('Error fetching cakes:', error);
    }
  };

  useEffect(()=>{
    getCakes();
  },[]);

  // Hiển thị thông báo 
const [showNotiUpdate, setShowNotiUpdate] = useState(false);
const [showNotiDelete, setShowNotiDelete] = useState(false);


  return (
    <>
      <div className="add-product-container">
        <Link to="/addcake" className="add-product-button">
          Thêm sản phẩm
        </Link>
      </div>
      <div className="side-menu">
        <SideMenuAdmin />
      </div>
      <div className="listcontainer">
        <p className="product_title">Quản lý sản phẩm</p>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
                {/* <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Mô tả</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Chi tiết</TableCell> */}
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Đã bán</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Giá</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Phân loại</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cakes.map((product) => (
                <TableRow key={product.idcake}>
                  <TableCell className="tableCell">{product.idcake}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={product.img1} alt="" className="image" />
                      {product.name}
                    </div>
                  </TableCell>
                  {/* <TableCell className="tableCell">{product.describe}</TableCell>
                  <TableCell className="tableCell">{product.detail}</TableCell> */}
                  <TableCell className="tableCell">{product.sole}</TableCell>
                  <TableCell className="tableCell">{product.status}</TableCell>
                  <TableCell className="tableCell">{product.price}</TableCell>
                  <TableCell className="tableCell">{product.category}</TableCell>
                  <TableCell className="tableCell">
                    <Link
                        to="#"
                        className="action-link"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="action-icon" />
                    </Link>
                    <DeleteOutline
                        className="action-icon"
                        onClick={() => handleDelete(product.idcake)}
                      />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chỉnh sửa sản phẩm</h2>
            <div className="btn-fix">
              <label htmlFor="name">Tên sản phẩm:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
          </div>
            <div className="btn-fix">
              <label htmlFor="describe">Mô tả:</label>
              <input
                type="text"
                id="describe"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              />
            </div>
            <div className="btn-fix">
              <label htmlFor="detail">Chi tiết:</label>
              <input
                type="text"
                id="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
            <div className="btn-fix">
              <label htmlFor="status">Trạng thái:</label>
              <input
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="btn-fix">
              <label htmlFor="price">Giá:</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="btn-fix">
              <label htmlFor="category">Phân loại</label>
              <select className="combobox"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button className="update-button" onClick={handleUpdate}>
              Cập nhật
            </button>
            <button className="close-button" onClick={handleClosePopup}>
              Đóng
            </button>
          </div>
        </div>
      )}
       {showNotiUpdate && <Noti_Success onClose={() => setShowNotiUpdate(false)}  status="Cập nhật sản phẩm thành công!"/>}
       {showNotiDelete && <Noti_Success onClose={() => setShowNotiDelete(false)}  status="Xóa sản phẩm thành công!"/>}
    </>
  );
}
export default ProductList;