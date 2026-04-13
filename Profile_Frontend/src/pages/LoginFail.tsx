// src/pages/LoginFail.tsx
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/LoginFail.css';

export default function LoginFail() {
  const { lightMode } = useTheme();

  // Ảnh meme vui nhộn (có thể thay bằng ảnh bạn thích)
  const funnyImageLight = 'https://i.imgur.com/0j0j0j0.jpg'; // Ảnh light mode
  const funnyImageDark = 'https://i.imgur.com/1k1k1k1.jpg';  // Ảnh dark mode

  return (
    <div className="login-fail-page">
      <div className="container">
        <div className="fail-content">
          {/* Ảnh vui nhộn */}


          <h1>Đăng nhập thất bại 😅</h1>

          <p className="fail-message">
            Oops! Chỉ tài khoản admin mới được vào khu vực này thôi nhé! <br />
            Gmail của bạn chưa được cấp quyền, hoặc có thể bạn đang thử thách hệ thống quá sức rồi đấy! 🚀
          </p>

          <div className="fail-actions">
            <Link to="/" className="btn primary">
              Về trang chủ
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}