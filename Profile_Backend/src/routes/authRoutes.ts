import { Router } from 'express';
import passport from '../config/passport';
import { googleCallback, logout } from '../controllers/authControllers';

const router = Router();

// Route bắt đầu đăng nhập Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route xử lý callback sau khi Google xác thực thành công
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:5173/login?error=auth_failed', 
    session: false 
  }),
  googleCallback
);

// Route đăng xuất
router.get('/logout', logout);

export default router;