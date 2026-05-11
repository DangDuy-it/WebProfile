import { Request, Response } from "express";
import prisma from "../config/db";
import fs from 'fs';
import path from 'path';

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

// Admin use only
// Create new project
export const createProject= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const { Title, Category, ImageUrl, LinkDemo, LinkGithub } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const currentProfileId = Number(user.Id);


    let newImageUrl = ImageUrl;
    if (req.file) {
        newImageUrl = `/uploads/${req.file.filename}`;
    }

    if(!Title || !Category || !newImageUrl ){
        
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try{
        const maxOrderIndex= await prisma.project.aggregate({
            where:{ ProfileId: currentProfileId },
            _max:{ OrderIndex: true },
        });

        const newProject= await prisma.project.create({
            data: {
                Title,
                Category,
                ImageUrl: newImageUrl,
                LinkDemo,
                LinkGithub,
                OrderIndex: (maxOrderIndex._max.OrderIndex || 0) + 1,
                ProfileId: currentProfileId
            }
        });
        res.status(201).json({
            message:{"success": "Project created successfully"},
            project: {
                Id: newProject.Id,
                Title: newProject.Title,
                Category: newProject.Category,
                ImageUrl: newProject.ImageUrl,
                LinkDemo: newProject.LinkDemo,
                LinkGithub: newProject.LinkGithub,
                OrderIndex: newProject.OrderIndex,
            }
        });
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update project 
export const updateProject= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const { Id } = req.params;
    const { Title, Category, ImageUrl, LinkDemo, LinkGithub } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const currentProfileId = Number(user.Id);

    try{
        const oldProject = await prisma.project.findUnique({
            where: { Id: Number(Id) },
        });
        // Kiểm tra nếu project tồn tại và thuộc về profile hiện tại
        if (!oldProject || oldProject.ProfileId !== currentProfileId) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        let newImageUrl = req.body.ImageUrl || oldProject.ImageUrl;
        
        if (req.file) {
            newImageUrl = `/uploads/${req.file.filename}`;
            // Xóa ảnh cũ nếu có
            if (oldProject.ImageUrl) {
                const oldPath = path.join(process.cwd(), 'public', oldProject.ImageUrl);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }
        const updatedProject = await prisma.project.update({
            where: { Id: Number(Id) },
            data: {
                Title,
                Category,
                ImageUrl: newImageUrl,
                LinkDemo,
                LinkGithub,
            }
        });

        res.status(200).json({
            message: "Project updated successfully",
            project: {
                Id: updatedProject.Id,
                Title: updatedProject.Title,
                Category: updatedProject.Category,
                ImageUrl: updatedProject.ImageUrl,
                LinkDemo: updatedProject.LinkDemo,
                LinkGithub: updatedProject.LinkGithub,
                OrderIndex: updatedProject.OrderIndex,
            }
        });

    }catch(err){
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Delete project 
export const deleteProject= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const { Id } = req.params;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const currentProfileId = Number(user.Id);

    try{
        // 1. Tìm Project để lấy URL ảnh trước khi xóa
        const projectToDelete = await prisma.project.findFirst({
            where: {
                Id: Number(Id),
                ProfileId: currentProfileId,
            }
        });

        if(!projectToDelete){
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        // 2. Định vị và xóa ảnh trên ổ đĩa nếu tồn tại
        if (projectToDelete.ImageUrl) {
            const oldPath = path.join(process.cwd(), 'public', projectToDelete.ImageUrl);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        // 3. Tiến hành xóa Project trong Database
        await prisma.project.delete({
            where: { Id: Number(Id) }
        });

        res.status(200).json({ message: 'Project deleted successfully' });
    
    }catch(err){
        console.error('Error deleting project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}