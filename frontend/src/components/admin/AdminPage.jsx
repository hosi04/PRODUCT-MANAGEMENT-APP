// Trong AdminPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import { fmtMoneyByCurrency } from "../../utils/fmtMoney";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userRule, setUserRule] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedRule = localStorage.getItem("rule");
    const storedUsername = localStorage.getItem("username");
    if (storedRule) setUserRule(storedRule);
    if (storedUsername) setUsername(storedUsername);

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/");
      setProducts(res.data.results || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      toast.error("Không thể tải danh sách sản phẩm");
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setForm({
        name: product.name,
        price: product.price,
        stock: product.stock || "",
        image: product.image || "",
      });
    } else {
      setEditingId(null);
      setForm({ name: "", price: "", stock: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (editingId) {
  //       await axios.put(`http://localhost:8000/api/products/${editingId}/`, form);
  //       toast.success("Cập nhật sản phẩm thành công!");
  //     } else {
  //       await axios.post("http://localhost:8000/api/products/", form);
  //       toast.success("Thêm sản phẩm thành công!");
  //     }
  //     fetchProducts();
  //     closeModal();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Lỗi khi lưu sản phẩm");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chuyển đổi kiểu dữ liệu trước khi gửi
      const dataToSend = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      };

      if (editingId) {
        await axios.put(`http://localhost:8000/api/products/${editingId}/`, dataToSend);
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await axios.post("http://localhost:8000/api/products/", dataToSend);
        toast.success("Thêm sản phẩm thành công!");
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi lưu sản phẩm");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}/`);
        toast.success("Xóa sản phẩm thành công!");
        fetchProducts();
      } catch (error) {
        console.error(error);
        toast.error("Không thể xóa sản phẩm");
      }
    }
  };

  return (
    <div className="admin-container">
      {/* Thanh top hiển thị username */}
      <div className="top-bar">
        <span className="user-info">
          Xin chào, <strong>{username}</strong> (rule_{userRule})
        </span>
      </div>

      <h1 className="admin-title">Quản lý sản phẩm</h1>

      {userRule === "admin" && (
        <button className="btn-green" onClick={() => openModal()}>+ Thêm sản phẩm</button>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            {userRule === "admin" && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td><img src={p.image} alt={p.name} className="admin-img" /></td>
              <td>{p.name}</td>
              <td>{fmtMoneyByCurrency(p.price)}</td>
              <td>{p.stock}</td>
              {userRule === "admin" && (
                <td>
                  <button className="btn-orange" onClick={() => openModal(p)}>Sửa</button>
                  <button className="btn-red" onClick={() => handleDelete(p.id)}>Xóa</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input type="text" name="name" placeholder="Tên sản phẩm" value={form.name} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Giá" value={form.price} onChange={handleChange} required />
              <input type="text" name="stock" placeholder="Số lượng" value={form.stock} onChange={handleChange} required />
              <input type="text" name="image" placeholder="Link ảnh" value={form.image} onChange={handleChange} />
              <div className="modal-buttons">
                <button type="submit" className="btn-green">
                  {editingId ? "Cập nhật" : "Thêm"}
                </button>
                <button type="button" className="btn-red" onClick={closeModal}>Đóng</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick pauseOnHover={false} draggable />
    </div>
  );
};

export default AdminPage;
