import { Request, Response } from "express";
import prisma from "../config/db";

// Controller để lấy dữ liệu cho trang Portfolio
export const getPortfolioData= async(req: Request, res: Response): Promise<void> => {
    try{
        const result= await prisma.project.findMany({
            where:{ IsVisible: true },
            orderBy:{OrderIndex: 'asc'},
            select:{
                Id: true,
                Title: true,
                Description: true,
                Category: true,
                ImageUrl: true,
                LinkDemo: true,
                LinkGithub: true,
                TechStack:true,
                OrderIndex: true,
            }
        
        })
        if(!result){
            res.status(404).json({ error: 'Projects not found' });
            return;
        }
        res.status(200).json(result);
    }catch(err){
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}