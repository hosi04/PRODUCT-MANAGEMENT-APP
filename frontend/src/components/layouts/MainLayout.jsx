// import React from "react";
// import { Link } from "react-router-dom";

// const MainLayout = ({ children }) => {
//   return (
//     <div style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>

//       <main>{children}</main>

//       <footer style={{ marginTop: 40, textAlign: "center" }}>
//         © 2025 Your Company
//       </footer>
//     </div>
//   );
// };

// export default MainLayout;


import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>
      <main>
        <Outlet />
      </main>
      <footer style={{ marginTop: 40, textAlign: "center" }}>
        © 2025 Your Company
      </footer>
    </div>
  );
};

export default MainLayout;
