import { Request, Response } from "express";
import prisma from "../config/db";

// Controller để lấy dữ liệu cho trang Contacts
export const getContactData = async(req: Request, res: Response): Promise<void> => {
    try {
        const result = await prisma.contactInfo.findMany({
            where: { IsVisible: true },
            orderBy: { Id: 'asc' },
            select: {
                Id: true,
                Type: true,
                Name: true,
                Value: true,
                Icon: true,
                IsVisible: true
            }
        });
        res.status(200).json(result);
    } catch(err) {
        console.error('Error fetching contacts data:', err);
        res.status(500).json({ error: 'Error fetching contacts data' });
    }
}