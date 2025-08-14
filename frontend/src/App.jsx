// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProductList from "./components/web/ProductList";
// import AdminProduct from "./components/admin/AdminPage";
// import LoginForm from "./components/auth/LoginForm";
// import RegisterForm from "./components/auth/RegisterForm";
// import MainLayout from "./components/layouts/MainLayout";
// import { useState } from "react";

// const PrivateRoute = ({ user, children }) => {
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// function App() {
//   const [user, setUser] = useState(null);

//   const handleLoginSuccess = (username) => {
//     setUser(username);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/register" element={<RegisterForm />} />

//         <Route path="/" element={<MainLayout user={user} />}>
//           <Route path="web" element={<ProductList />} />
//           <Route
//             path="admin"
//             element={
//               <PrivateRoute user={user}>
//                 <AdminProduct />
//               </PrivateRoute>
//             }
//           />
//           <Route index element={<Navigate to="web" replace />} />
//           <Route path="*" element={<Navigate to="web" replace />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProductList from "./components/web/ProductList";
// import AdminProduct from "./components/admin/AdminPage";
// import LoginForm from "./components/auth/LoginForm";
// import RegisterForm from "./components/auth/RegisterForm";
// import MainLayout from "./components/layouts/MainLayout";
// import { useState, useEffect } from "react";

// const PrivateRoute = ({ user, children }) => {
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// function App() {
//   // Đọc user từ localStorage khi App load
//   const [user, setUser] = useState(() => {
//     const username = localStorage.getItem("username");
//     return username ? { username } : null;
//   });

//   // Khi login thành công
//   const handleLoginSuccess = (username) => {
//     setUser({ username });
//     localStorage.setItem("username", username); // lưu vào localStorage
//   };

//   // Logout function
//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("username");
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/admin" replace /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
//         />
//         <Route path="/register" element={<RegisterForm />} />

//         <Route path="/" element={<MainLayout user={user} onLogout={handleLogout} />}>
//           <Route path="web" element={<ProductList />} />
//           <Route
//             path="admin"
//             element={
//               <PrivateRoute user={user}>
//                 <AdminProduct />
//               </PrivateRoute>
//             }
//           />
//           <Route index element={<Navigate to="web" replace />} />
//           <Route path="*" element={<Navigate to="web" replace />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import ProductList from "./components/web/ProductList";
import AdminProduct from "./components/admin/AdminPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import MainLayout from "./components/layouts/MainLayout";

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // đọc user từ localStorage khi App load
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    return username ? { username } : null;
  });

  // login thành công
  const handleLoginSuccess = (username) => {
    setUser({ username });
    localStorage.setItem("username", username);
  };

  // logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("username");
    localStorage.removeItem("rule");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/admin" replace /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/" element={<MainLayout user={user} onLogout={handleLogout} />}>
          <Route path="web" element={<ProductList />} />
          <Route
            path="admin"
            element={
              <PrivateRoute user={user}>
                <AdminProduct onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route index element={<Navigate to="web" replace />} />
          <Route path="*" element={<Navigate to="web" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
