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
  const [statusOptions, setStatusOptions] = useState(["Còn hàng", "Hết hàng"]);

  const handleDelete = (id) => {
    const updatedRows = productRows.filter((product) => product.id !== id);
    // Cập nhật danh sách sản phẩm sau khi xóa
    // ...
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setQuantity(product.stock);
    setStatus(product.status);
    //"0" thì cập nhật trạng thái
    if (product.stock === 0) {
    setStatus("Hết hàng");
  }
  
  // "hết hàng" thì cập nhật số lượng
  if (product.status === "Hết hàng") {
    setQuantity(0);
  }
    setIsModalOpen(true);
  };
  
  const handleClosePopup = () => {
    setSelectedProduct(null);
    setQuantity("");
    setStatus("");
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
                      {product.name}
                    </div>
                  </TableCell>
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
              <label htmlFor="quantity">Số lượng:</label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="btn-fix">
              <label htmlFor="status">Trạng thái:</label>
              <select className="combobox"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((option) => (
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
