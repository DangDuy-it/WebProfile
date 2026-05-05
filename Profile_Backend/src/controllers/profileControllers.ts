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

//Admin use only
// Update About information
export const updateAbout= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const {Id} = req.params;
    const { Intro, Body } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    // Kiểm tra xem profile có tồn tại không
    const existingProfile = await prisma.profile.findUnique({
        where: { Id: Number(Id) }
    });
    if(!existingProfile){
        res.status(404).json({ error: 'Profile not found' });
        return;
    }
    // Cập nhật thông tin About
    try{
        const updateAbout= await prisma.profile.update({
            where: { Id: Number(Id) },
            data: {
                Intro,
                Body,
            }
        })
        if(!updateAbout){
            res.status(404).json({ error: 'Profile not found' });
            return;
        }
        res.status(200).json({
            message: 'Profile updated successfully',
            data:{
                // Id: updateAbout.Id,
                Intro: updateAbout.Intro,
                Body: updateAbout.Body,
            }
        });
    }catch(err){
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Insert AboutHighlight
export const createAboutHighlight= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const { Name, Description, Icon, OrderIndex } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    // Kiểm tra xem profile có tồn tại không
    const existingProfile = await prisma.profile.findFirst();
    if(!existingProfile){
        res.status(404).json({ error: 'Profile not found' });
        return;
    }
    // Kiểm tra dữ liệu đầu vào
    if(!Name || !Description || !Icon ){
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    try{
        // 1. Tìm OrderIndex lớn nhất hiện tại
        const maxOrder = await prisma.aboutHighlight.aggregate({
            _max: {
                OrderIndex: true
            },
            where: {
                ProfileId: existingProfile.Id
            }
        });
        const newOrderIndex = (maxOrder._max.OrderIndex || 0) + 1;

        const newHighlight= await prisma.aboutHighlight.create({
            data:{
                Name,
                Description,
                Icon,
                OrderIndex: newOrderIndex,
                ProfileId: existingProfile.Id
            }
        })
        res.status(201).json({
            message: 'About highlight created successfully',
            data: newHighlight
        });
    } catch(err){
        console.error('Error creating about highlight:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update AboutHighlight
export const updateAboutHighlight= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const {Id} = req.params;
    const { Name, Description, Icon, OrderIndex } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    // 
    const currentProfileId = Number(user.Id || user.id);
    // Kiểm tra xem highlight có tồn tại không
    const existingHighlight = await prisma.aboutHighlight.findFirst({
        where: { Id: Number(Id), ProfileId: currentProfileId }
    });
    if(!existingHighlight){
        res.status(404).json({ error: 'About highlight not found' });
        return;
    }
    // Cập nhật thông tin AboutHighlight
    try{
        const updateHighlight= await prisma.aboutHighlight.updateMany({
            where: { Id: Number(Id), ProfileId: currentProfileId },
            data: {
                Name,
                Description,
                Icon,
                OrderIndex,
            }
        })
        if(updateHighlight.count === 0){
            res.status(404).json({ error: 'About highlight not found' });
            return;
        }
        res.status(200).json({
            message: 'About highlight updated successfully',
            data:{
                // Id: updateHighlight.Id,
                Name,
                Description,
                Icon,
                OrderIndex,
            }
        })
    }catch(err){
        console.error('Error updating about highlight:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Delete AboutHighlight
export const deleteAboutHighlight= async(req: Request, res: Response): Promise<void> => {
    // Lấy thông tin người dùng từ token
    const user = (req as any).user;
    const {Id} = req.params;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    // Lấy profileId từ token
    const currentProfileId = Number(user.Id || user.id);
    
    try{
        // Dùng deleteMany để lọc theo cả Id và ProfileId, đảm bảo chỉ xóa highlight của profile hiện tại  
        // deleteMany trả về số lượng bản ghi đã xóa, nếu count là 0 nghĩa là không tìm thấy highlight nào phù hợp với Id và ProfileId 
        const deletedHighlight= await prisma.aboutHighlight.deleteMany({
            where: { Id: Number(Id), ProfileId: currentProfileId }
        });
        // Nếu không có bản ghi nào bị xóa, trả về lỗi 404
        if(deletedHighlight.count === 0){
            res.status(404).json({ error: 'About highlight not found' });
            return;
        }
        // Xóa thành công, trả về thông báo thành công
        res.status(200).json({
            message: 'About highlight deleted successfully',
            
        });
    }catch(err){
        // Log lỗi chi tiết để dễ dàng debug
        console.error('Error deleting about highlight:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Increate Skill
export const createSkill = async(req: Request, res: Response): Promise<void> => {
    const user= (req as any).user;
    const { Name, Category, Icon } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    // Kiểm tra xem profile có tồn tại không
    const existingProfile = await prisma.profile.findFirst();
    if(!existingProfile){
        res.status(404).json({ error: 'Profile not found' });
        return;
    }
    // Kiểm tra dữ liệu đầu vào
    if(!Name || !Category || !Icon){
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    

    try{
        const maxOrder = await prisma.skill.aggregate({
            _max: {
                OrderIndex: true
            },
            where: {
                ProfileId: existingProfile.Id
            }
        });
        const newOrderIndex = (maxOrder._max.OrderIndex || 0) + 1;

        const newSkill= await prisma.skill.create({
            data:{
                Name,
                Category,
                Icon,
                OrderIndex: newOrderIndex,
                ProfileId: existingProfile.Id
            }
        })
        if(!newSkill){
            res.status(404).json({ error: 'Profile not found' });
            return;
        }
        res.status(201).json({
            message: 'Skill created successfully',
            data: {
                Id: newSkill.Id,
                Name: newSkill.Name,
                Category: newSkill.Category,
                Icon: newSkill.Icon,
                OrderIndex: newSkill.OrderIndex
            }
        });
    }catch(err){
        console.error('Error creating skill:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Update Skill
export const updateSkill= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user; // token payload { email, name }
    const {Id} = req.params;
    const { Name, Category, Icon, OrderIndex } = req.body;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    // Kiểm tra xem skill có tồn tại không
    const currentProfileId = Number(user.Id || user.id);
    const existingSkill = await prisma.skill.findFirst({
        where: { Id: Number(Id), ProfileId: currentProfileId }
    });
    if(!existingSkill){
        res.status(404).json({ error: 'Skill not found' });
        return;
    }
    // Cập nhật thông tin Skill
    try{
        const updateSkill= await prisma.skill.updateMany({
            where: { Id: Number(Id), ProfileId: currentProfileId },
            data: {
                Name,
                Category,
                Icon,
                OrderIndex,
            }
        })
        if(updateSkill.count === 0){
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        res.status(200).json({
            message: 'Skill updated successfully',
            data:{
                // Id: updateSkill.Id,
                Name,
                Category,
                Icon,
                OrderIndex,
            }
        })
    }catch(err){
        console.error('Error updating skill:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete Skill
export const deleteSkill= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user; // token payload { email, name }
    const {Id} = req.params;
    // Kiểm tra quyền truy cập
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const currentProfileId = Number(user.Id || user.id);

    try{
        const deletedSkill= await prisma.skill.deleteMany({
            where: { Id: Number(Id), ProfileId: currentProfileId }
        })
        if(deletedSkill.count === 0){
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        res.status(200).json({
            message: 'Skill deleted successfully',
        });
    }catch(err){
        console.error('Error deleting skill:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




