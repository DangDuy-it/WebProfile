import { Request, Response } from "express";
import prisma from "../config/db";

// Controller để lấy dữ liệu cho trang Contacts
export const getContactData = async(req: Request, res: Response): Promise<void> => {
    try {
        const result = await prisma.profile.findFirst({
            select:{
                Title: true,
                Badge: true,
                AvtDarkImage: true,
                AvtLightImage: true,
                ContactInfo:{
                    where:{ IsVisible: true },
                    orderBy:{ Id: 'asc' },
                    select:{
                        Id: true,
                        Type: true,
                        Name: true,
                        Value: true,
                        Icon: true,  
                        Category: true,     
                    }   
                }
            }
        });
        if (!result) {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }
        res.status(200).json(result);
    } catch(err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}