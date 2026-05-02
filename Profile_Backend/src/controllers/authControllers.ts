import { Request, Response } from 'express';

export const googleCallback = (req: Request, res: Response) => {
    const user = req.user as any;

    if (!user || !user.token) {
        const errorMessage = encodeURIComponent('Email không phải tài khoản admin. Vui lòng thử lại.');
        return res.redirect(`http://localhost:5173/login?error=${errorMessage}`);
    }

    // Lưu token vào cookie
    res.cookie('adminToken', user.token, {
        httpOnly: false,           // Để JS frontend có thể đọc được
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 ngày
    });

    // Redirect về trang admin
    res.redirect('http://localhost:5173/admin');
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('adminToken');
    res.redirect('http://localhost:5173/');
};