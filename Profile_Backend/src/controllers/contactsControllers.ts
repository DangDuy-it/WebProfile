import { Request, Response } from "express";
import { getRequest } from "../config/db";

// Controller để lấy dữ liệu cho trang Contacts
export const getContactData= async(req: Request, res: Response): Promise<void>=>{
    try{
        const request= await getRequest();

        // Thực hiện truy vấn lấy dữ liệu từ bảng Contacts
        const poolResult= await request.query(
            `SELECT
                Id,
                Type,
                Name,
                Title,
                Value,
                Icon,
                IsVisible
            FROM ContactInfo
            WHERE IsVisible=1
            ORDER BY Id ASC
            `);
            res.status(200).json(poolResult.recordset);

    }
    catch(err){
        console.error('Error fetching contacts data:', err);
        res.status(500).json({ error: 'Error fetching contacts data' });
    }
}