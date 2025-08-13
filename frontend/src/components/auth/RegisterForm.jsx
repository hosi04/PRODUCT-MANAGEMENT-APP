// import React, { useState } from "react";
// import axios from "axios";
// import "./AuthPage.css";

// const RegisterForm = ({ onRegisterSuccess }) => {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     password2: "",
//     rule: "", // nếu muốn nhập rule luôn
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (form.password !== form.password2) {
//       setError("Mật khẩu không khớp");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8000/api/auth/register/", {
//         username: form.username,
//         password: form.password,
//         rule: form.rule || "user", // mặc định là user nếu không nhập
//       });
//       onRegisterSuccess && onRegisterSuccess();
//     } catch (err) {
//       if (err.response?.data?.detail) {
//         setError(err.response.data.detail);
//       } else {
//         setError("Đăng ký thất bại. Vui lòng thử lại.");
//       }
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Đăng ký</h2>
//       {error && <p className="error-msg">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Tên đăng nhập"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Mật khẩu"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password2"
//           placeholder="Nhập lại mật khẩu"
//           value={form.password2}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="rule"
//           placeholder="Quyền (vd: admin | staff)"
//           value={form.rule}
//           onChange={handleChange}
//         />
//         <button type="submit">Đăng ký</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // để chuyển trang
import "./AuthPage.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
    rule: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.password2) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/register/", {
        username: form.username,
        password: form.password,
        rule: form.rule || "user",
      });

      setSuccess("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => {
        navigate("/login"); // chuyển đến trang login
      }, 1500);
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password2"
          placeholder="Nhập lại mật khẩu"
          value={form.password2}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rule"
          placeholder="Quyền (vd: admin | staff)"
          value={form.rule}
          onChange={handleChange}
        />
        <button type="submit">Đăng ký</button>

        {/* Nút đăng nhập */}
        <button
          type="button"
          className="login-btn"
          onClick={() => navigate("/login")}
          style={{ marginTop: "10px", backgroundColor: "#4CAF50", color: "white" }}
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
