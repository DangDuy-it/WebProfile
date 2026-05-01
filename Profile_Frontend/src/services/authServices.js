import Cookies from 'js-cookie';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authServices = {
  // Kiểm tra trạng thái đăng nhập dựa trên token
  isLoggedIn: () => {
    return !!Cookies.get('adminToken');
  },

  // Lấy URL đăng nhập từ môi trường hoặc mặc định
  getGoogleAuthUrl: () => {
    return `${API_URL}/auth/google`;
  },

  // Xử lý đăng xuất (nếu bạn cần sau này)
  logout: () => {
    Cookies.remove('adminToken', { path: '/' });
    window.location.href = '/';
  }
};