// src/index.ts
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import passport from './config/passport';
import session from 'express-session';

import profileRoutes from './routes/profileRoutes';
import contactsRoutes from './routes/contactsRoutes';
import resumeRoutes from './routes/resumeRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  // Cho phép gửi cookie cross-origin
}));
app.use(express.json());

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 1 ngày
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Gắn routes
app.use('/api', profileRoutes);
app.use('/api', contactsRoutes);
app.use('/api', resumeRoutes);

// Route Google login
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=auth_failed', session: false }),
  (req, res) => {
    const user = req.user as any;
    if (!user || !user.token) {
          // Redirect về trang login frontend với thông báo lỗi
          const errorMessage = encodeURIComponent('Email không phải tài khoản admin. Vui lòng thử lại.');
          return res.redirect(`http://localhost:5173/login?error=${errorMessage}`);
        }

    // Lưu token vào cookie (cho JS frontend đọc được)
    res.cookie('adminToken', user.token, {
      httpOnly: false,            // Cho phép JS đọc cookie
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',            // Cho phép redirect cross-origin
      maxAge: 24 * 60 * 60 * 1000 // 1 ngày
    });

    // Redirect về /admin (không cần ?token= nữa)
    res.redirect('http://localhost:5173/admin');
  }
);

// // Route login (trang lỗi nếu đăng nhập thất bại)
// app.get('/login', (req, res) => {
//   res.send(`
//     <h1>Đăng nhập thất bại</h1>
//     <p>Chỉ tài khoản admin được phép. Vui lòng quay lại.</p>
//     <a href="/">Về trang chủ</a>
//   `);
// });

// Khởi động server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Server is running on port ${PORT}`);
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  }
});