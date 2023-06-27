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
              <th className="table-header">Phân loại</th>
              <th className="table-header">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {productRows.map((product) => (
              <tr key={product.id}>
                <td className="table-cell">{product.id}</td>
                <td className="table-cell">
                  <div className="table-cell_name">
                    <img src={product.img} alt="" className="product-image" />
                    {product.name}
                  </div>
                </td>
                <td className="table-cell">{product.stock}</td>
                <td className="table-cell">{product.status}</td>
                <td className="table-cell">{product.price}</td>
                <td className="table-cell">{product.category}</td>
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
