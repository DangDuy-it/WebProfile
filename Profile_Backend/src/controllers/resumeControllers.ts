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
// Admin use only
export const createResumeData= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const { Title, Type, Duration, Description, OrderIndex } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const currentProfileId = Number(user.Id);

    if(!Title || !Type || !Duration || !Description){
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    try{
        const maxOrderIndex= await prisma.timeline.aggregate({
            _max: { OrderIndex: true },
            where: { Type: Type, ProfileId: currentProfileId }
        })
        const newOrderIndex= (maxOrderIndex._max.OrderIndex || 0) + 1;

        const newResume= await prisma.timeline.create({
            data:{
                Title,
                Type,
                Duration,
                Description,
                OrderIndex: newOrderIndex,
                ProfileId: currentProfileId
            }
        })
        if(!newResume){
            res.status(400).json({ error: 'Failed to create resume data' });
            return;
        }
        res.status(201).json(newResume);
    }catch(err){
        console.error('Error creating resume data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateResumeData= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const {Id} = req.params;
    const { Title, Type, Duration, Description, OrderIndex } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const currentProfileId = Number(user.Id);
    // Kiểm tra xem bản ghi có tồn tại và thuộc về profile của người dùng hay không
    const existingResume = await prisma.timeline.findFirst({
        where: { Id: Number(Id), ProfileId: currentProfileId }
    });
    if(!existingResume){
        res.status(404).json({ error: 'Resume data not found' });
        return;
    }
    try{
        const updatedResume = await prisma.timeline.update({
            where: { Id: Number(Id) },
            data:{
                Title,
                Type,
                Duration,
                Description,
                OrderIndex
            }
        })
        if(!updatedResume){
            res.status(404).json({ error: 'Failed to update resume data' });
            return;
        }
        res.status(200).json(updatedResume);
    }catch(err){
        console.error('Error updating resume data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteResumeData= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const {Id} = req.params;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const currentProfileId = Number(user.Id);
    
    try{
        const deletedResume = await prisma.timeline.deleteMany({
            where: { Id: Number(Id), ProfileId: currentProfileId }
        });
        if(deletedResume.count === 0){
            res.status(404).json({ error: 'Resume data not found' });
            return;
        }
        res.status(200).json({ message: 'Resume data deleted successfully' });
    }catch(err){
        console.error('Error deleting resume data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}