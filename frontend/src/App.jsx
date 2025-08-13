// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import ProductList from "./components/web/ProductList";
// // import AdminProduct from "./components/admin/AdminPage";
// // import MainLayout from "./components/layouts/MainLayout";

// // function App() {
// //   return (
// //     <Router>
// //       <MainLayout>
// //         <Routes>
// //           <Route path="/web" element={<ProductList />} />
// //           <Route path="/admin" element={<AdminProduct />} />
// //           <Route path="*" element={<Navigate to="/web" replace />} />
// //         </Routes>
// //       </MainLayout>
// //     </Router>
// //   );
// // }

// // export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProductList from "./components/web/ProductList";
// import AdminProduct from "./components/admin/AdminPage";
// import LoginForm from "./components/auth/LoginForm";
// import RegisterForm from "./components/auth/RegisterForm";
// import MainLayout from "./components/layouts/MainLayout";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
        
//         <Route path="/" element={<MainLayout />}>
//           <Route path="web" element={<ProductList />} />
//           <Route path="admin" element={<AdminProduct />} />
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
// import { useState } from "react";

// function App() {
//   const [user, setUser] = useState(null);

//   // Hàm gọi khi login thành công
//   const handleLoginSuccess = (username) => {
//     setUser(username);
//     // Bạn có thể redirect hoặc làm gì thêm
//     // Ví dụ: chuyển trang tự động sau login:
//     // navigate("/web");
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Truyền onLoginSuccess vào LoginForm */}
//         <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/register" element={<RegisterForm />} />

//         <Route path="/" element={<MainLayout user={user} />}>
//           <Route path="web" element={<ProductList />} />
//           <Route path="admin" element={<AdminProduct />} />
//           <Route index element={<Navigate to="web" replace />} />
//           <Route path="*" element={<Navigate to="web" replace />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/web/ProductList";
import AdminProduct from "./components/admin/AdminPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import MainLayout from "./components/layouts/MainLayout";
import { useState } from "react";

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/" element={<MainLayout user={user} />}>
          <Route path="web" element={<ProductList />} />
          <Route
            path="admin"
            element={
              <PrivateRoute user={user}>
                <AdminProduct />
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
