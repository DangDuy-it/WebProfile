
import { Request, Response } from "express";
import prisma from "../config/db";

// Controller để lấy dữ liệu cho trang About
export const getAboutData= async(req: Request, res: Response): Promise<void> => {
    try{
        const result= await prisma.profile.findFirst({
            select:{
                Description: true,
                Intro: true,
                Body: true,
                Skill:{
                    where:{ IsVisible: true },
                    orderBy:{ Id: 'asc' },
                    select:{
                        Id: true,
                        Name: true,
                        Category: true,
                        Description: true,
                        Icon: true,
                    }
                },
                AboutHighlight:{
                    orderBy:{ OrderIndex: 'asc' },
                    select:{
                        Id: true,
                        Name: true,
                        Description: true,
                        Icon: true,
                        OrderIndex: true,
                    }
                }
            }
        });
        if(!result){
            res.status(404).json({ error: 'Profile not found' });
            return;
        }
        res.status(200).json(result);
    }catch(err){
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}









