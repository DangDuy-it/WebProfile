import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('adminToken'); // Đọc từ cookie

    if (!token) {
      navigate('/login');
      return;
    }

    // Token có → vào admin (có thể gọi API kiểm tra token hợp lệ sau)
    console.log('Token hợp lệ:', token);
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Chào mừng admin! Bạn đã đăng nhập thành công bằng Google.</p>
      {/* Nội dung edit profile, contact... */}
    </div>
  );
}