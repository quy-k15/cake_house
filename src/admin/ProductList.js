import { useState } from "react";
import { productRows } from "../components/productData";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";
import { DeleteOutline, Edit } from "@material-ui/icons";
import SideMenuAdmin from "./SideMenuAdmin";

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");

  const handleDelete = (id) => {
    const updatedRows = productRows.filter((product) => product.id !== id);
    // Cập nhật danh sách sản phẩm sau khi xóa
    // ...
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setQuantity(product.stock);
    setStatus(product.status);
  };

  const handleUpdate = () => {
    // Thực hiện cập nhật thông tin sản phẩm
    // ...
    // Đóng popup
    handleClosePopup();
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setQuantity("");
    setStatus("");
  };

  return (
    <>
      <div className="add-product-container">
        <Link to="/addcake" className="add-product-button">
          Thêm sản phẩm
        </Link>
      </div>
      <div className="product-list-container">
        <div className="side-menu">
          <SideMenuAdmin />
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Sản phẩm</th>
              <th className="table-header">Số lượng</th>
              <th className="table-header">Trạng thái</th>
              <th className="table-header">Giá</th>
              <th className="table-header">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {productRows.map((product) => (
              <tr key={product.id}>
                <td className="table-cell">{product.id}</td>
                <td className="table-cell">
                  <img src={product.img} alt="" className="product-image" />
                  {product.name}
                </td>
                <td className="table-cell">{product.stock}</td>
                <td className="table-cell">{product.status}</td>
                <td className="table-cell">{product.price}</td>
                <td className="table-cell">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
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
                <input
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                />
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
