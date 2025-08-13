import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import { fmtMoneyByCurrency } from "../../utils/fmtMoney";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchProducts(); // Load tất cả sản phẩm khi mount
  }, []);

  // Hàm lấy toàn bộ sản phẩm (nếu muốn)
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products-es/");
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Gọi API suggest search khi user gõ
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products-es/search/?q=${query}`
        );
        setSuggestions(res.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Khi user chọn 1 gợi ý hoặc submit tìm kiếm
  const handleSearch = async (keyword) => {
    if (!keyword.trim()) return;
    setQuery(keyword);
    setShowSuggestions(false);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/products-es/search/?q=${keyword}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  // Bổ sung xử lý khi nhấn Enter trong ô input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query.trim());
    }
  };

  return (
    <div className="product-container">
      <h1 className="product-title">Danh sách sản phẩm</h1>

      <div style={{ position: "relative", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}  // Thêm xử lý nhấn Enter
          className="search-input"
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSearch(item.name)}
                className="suggestion-item"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price-box">
                <span className="product-price">
                  {fmtMoneyByCurrency(product.price)}
                </span>
              </div>
              <div className="button-box">
                <button className="btn-cart">Giỏ hàng</button>
                <button className="btn-buy">Mua ngay</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
