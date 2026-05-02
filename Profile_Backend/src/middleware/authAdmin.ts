import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Lấy token từ Cookie (do Duy đã thiết lập res.cookie ở index.ts)
    const token = req.cookies.adminToken;

    if (!token) {
        return res.status(401).json({ error: 'Truy cập bị từ chối. Vui lòng đăng nhập.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret');
        (req as any).user = verified;
        next(); // Cho phép đi tiếp vào Controller (updateInfo, v.v.)
    } catch (err) {
        res.status(400).json({ error: 'Token không hợp lệ.' });
    }
};