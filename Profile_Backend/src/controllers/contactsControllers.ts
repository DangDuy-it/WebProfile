import { Request, Response } from "express";
import prisma from "../config/db";

// Controller để lấy dữ liệu cho phần Sidebar 
export const getContactData = async(req: Request, res: Response): Promise<void> => {
    try {
        const result = await prisma.profile.findFirst({
            select:{
                Title: true,
                Badge: true,
                AvtDarkImage: true,
                AudioUrl: true,
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
// Admin use only
// Update contact information 
export const updateInfo= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;
    const {Id} = req.params;
    const {Title, Badge, AvtDarkImage, AudioUrl} = req.body;

    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try{
        const updatedInfo= await prisma.profile.update({
            where: { Id: Number(Id) },
            data:{
                Title,
                Badge,
                AvtDarkImage,
                AudioUrl,

            }
        });
        res.status(200).json({
            message: 'Profile information updated successfully',
            data: {
                Title: updatedInfo.Title,
                Badge: updatedInfo.Badge,
                AvtDarkImage: updatedInfo.AvtDarkImage,
                AudioUrl: updatedInfo.AudioUrl
            }
        });
    }catch(err: any){
        if (err.code === 'P2025') {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Insert contact socialInfo & link
export const createContact =async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user; // token payload { email, name }
    const {Type, Name, Value, Icon, Category} = req.body;
    
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const currentProfileId = Number(user.Id || user.id);

    if(!Type || !Name || !Value || !Icon || !Category){
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try{
    
        const newContact= await prisma.contactInfo.create({
            data:{
                Type,
                Name,
                Value,
                Icon,
                Category,
                ProfileId: currentProfileId
            }
        })
        if(!newContact){
            res.status(400).json({ error: 'Failed to create contact' });
            return;
        }
        res.status(201).json({
            message: 'Contact created successfully',
            data: {
                Id: newContact.Id,
                Type: newContact.Type,
                Name: newContact.Name,
                Value: newContact.Value,
                Icon: newContact.Icon,
                Category: newContact.Category
            }
        });
    }catch(err){
        console.error('Error creating contact:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Delete contact SocialInfo & link
export const deleteContact= async(req: Request, res: Response): Promise<void> => {
    const user = (req as any).user; // token payload { email, name }
    const {Id} = req.params;
    
    if(!user){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const currentProfileId = Number(user.Id || user.id);
    try{
        
        const deletedContact= await prisma.contactInfo.delete({
            where: { Id: Number(Id), ProfileId: currentProfileId }
        });
        if(!deletedContact){
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        res.status(200).json({
            message: 'Contact deleted successfully',
            // data: deletedContact
        });
    } catch(err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Update contact SocialInfo & link
// export const updateContact = async(req: Request, res: Response): Promise<void> => {
//     const user = (req as any).user; // token payload { email, name }
//     const {Id} = req.params;
//     const {Type, Name, Value, Icon, Category} = req.body;
    
//     if(!user){
//         res.status(401).json({ error: 'Unauthorized' });
//         return;
//     }
//     if(!Type || !Name || !Value || !Icon || !Category){
//         res.status(400).json({ error: 'Missing required fields' });
//         return;
//     }
// }