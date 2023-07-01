import { useState } from "react";
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

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState(["Tiramisu", "Bánh kem", "Cookie", "Mochi"]);
  const [category, setCategory] = useState("");
  const [pdname, setName]=useState("");
  const [price, setPrice]=useState("");
  const [describe, setDescribe]=useState("");
  const [detail, setDetail]=useState("");

  const handleDelete = (id) => {
    const updatedRows = productRows.filter((product) => product.id !== id);
    // Cập nhật danh sách sản phẩm sau khi xóa
    // ...
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setQuantity(product.stock);
    setCategory(product.category);
    setName(product.pdname);
    setDescribe(product.describe);
    setDetail(product.detail);
    setPrice(product.price);
    setStatus(product.status);
    //"0" thì cập nhật trạng thái
    if (product.stock === 0) {
    setStatus("Hết hàng");
  }
  
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
  

  const handleUpdate = () => {
    // Thực hiện cập nhật thông tin sản phẩm
    if (status === "Hết hàng") {
      setQuantity(0);
    }
    // Đóng popup
    handleClosePopup();
  };


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
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Mô tả</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Chi tiết</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Giá</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Phân loại</TableCell>
                <TableCell className="tableCell" style={{ fontWeight: 'bold' }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productRows.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="tableCell">{product.id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={product.img} alt="" className="image" />
                      {product.pdname}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{product.describe}</TableCell>
                  <TableCell className="tableCell">{product.detail}</TableCell>
                  <TableCell className="tableCell">{product.stock}</TableCell>
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
                        onClick={() => handleDelete(product.id)}
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
              <label htmlFor="pdname">Tên sản phẩm:</label>
              <input
                type="text"
                id="pdname"
                value={pdname}
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
              <label htmlFor="quantity">Số lượng:</label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
    </>
  );
}
