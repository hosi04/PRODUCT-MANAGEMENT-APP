// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";  // import useNavigate
// import "./AuthPage.css";

// const LoginForm = ({ onLoginSuccess }) => {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // khởi tạo hook điều hướng

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:8000/api/auth/login/", form);
//       console.log("Response data:", res);

//       if (res.status === 200 && res.data.detail === "Đăng nhập thành công") {
//         if (typeof onLoginSuccess === "function") {
//           onLoginSuccess(res.data.username);
//         }

//         // Lưu role vào localStorage
//         localStorage.setItem("username", res.data.username);
//         localStorage.setItem("rule", res.data.rule);

//         navigate("/admin");  // chuyển hướng sang /admin khi đăng nhập thành công
//       } else {
//         setError("Tên đăng nhập hoặc mật khẩu không đúng");
//       }
//     } catch (err) {
//       console.error("API login error:", err);
//       setError("Tên đăng nhập hoặc mật khẩu không đúng");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Đăng nhập</h2>
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
//         <button type="submit">Đăng nhập</button>

//         {/* Nút đăng ký */}
//         <button
//           type="button"
//           className="register-btn"
//           onClick={() => navigate("/register")}
//           style={{ marginTop: "10px", backgroundColor: "#4CAF50", color: "white" }}
//         >
//           Đăng ký
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AuthPage.css";

// const LoginForm = ({ onLoginSuccess }) => {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     // Giả lập "login thành công" nếu username và password có nhập
//     if (form.username && form.password) {
//       // lưu thông tin user vào localStorage
//       localStorage.setItem("username", form.username);
//       localStorage.setItem("rule", "user"); // bạn có thể đổi tùy role

//       if (typeof onLoginSuccess === "function") {
//         onLoginSuccess(form.username);
//       }

//       navigate("/admin"); // chuyển hướng
//     } else {
//       setError("Tên đăng nhập hoặc mật khẩu không được để trống");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Đăng nhập</h2>
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
//         <button type="submit">Đăng nhập</button>

//         <button
//           type="button"
//           className="register-btn"
//           onClick={() => navigate("/register")}
//           style={{ marginTop: "10px", backgroundColor: "#4CAF50", color: "white" }}
//         >
//           Đăng ký
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.username && form.password) {
      // phân quyền dựa trên username
      const rule = form.username === "admin" ? "admin" : "user";
      localStorage.setItem("rule", rule);

      if (typeof onLoginSuccess === "function") onLoginSuccess(form.username);

      navigate("/admin");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không được để trống");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />
        <button type="submit">Đăng nhập</button>

        <button
          type="button"
          className="register-btn"
          onClick={() => navigate("/register")}
          style={{ marginTop: "10px", backgroundColor: "#4CAF50", color: "white" }}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
