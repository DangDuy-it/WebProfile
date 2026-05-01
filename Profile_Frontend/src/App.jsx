import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "./pages/Admin";
import MainLayout from "./layouts/User/MainLayout";
import LoginError from "./pages/LoginError";
import { authServices } from "./services/authServices";

// Component RequireAuth để bảo vệ route Admin
// Nếu chưa đăng nhập, tự động chuyển hướng đến Google Auth của Backend
const RequireAuth = ({ children }) => {
  if (!authServices.isLoggedIn()) {
    window.location.href = authServices.getGoogleAuthUrl();
    return null;
  }
  return children;
};

// Đưa logic hiện tại của trang chủ vào một component riêng


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />      
      <Route path="/login" element={<LoginError />} />      
      <Route 
        path="/admin" 
        element={
          <RequireAuth>
            <Admin />
          </RequireAuth>
        } 
      />
      {/* Route handle callback (nếu có, nhưng backend đang redirect lại /admin rồi) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;