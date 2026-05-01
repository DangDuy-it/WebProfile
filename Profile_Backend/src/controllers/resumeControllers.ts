import { Request, Response } from "express";
import prisma from "../config/db";

export const getResumeData= async(req: Request, res: Response): Promise<void> => {
    try{
        const result= await prisma.timeline.findMany({
            orderBy:{ OrderIndex: 'asc' },
            select:{
                Id: true,
                Title: true,
                Type: true,
                Duration: true,
                Description: true,
                OrderIndex: true,
            }
        });
        if(!result){
            res.status(404).json({ error: 'No timeline data found' });
            return;
        }
        res.status(200).json(result);
    }catch(err){
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}