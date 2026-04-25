import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all visible skills
export const getSkills = async ( req: Request, res: Response) => {
    try{
        const skills= await prisma.skill.findMany({
            where: {IsVisible:true},
            orderBy: {OrderIndex:'asc'},
        })
        res.json(skills);
    }
    catch(error){
        console.error('Error fetching skills:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}


// // Get all visible skills
// export const getSkills = async (req: Request, res: Response) => {
//   try {
//     const skills = await prisma.skill.findMany({
//       where: { IsVisible: true },
//       orderBy: { OrderIndex: 'asc' },
//     });
//     res.json(skills);
//   } catch (error) {
//     console.error('Error fetching skills:', error);
//     res.status(500).json({ message: 'Lá»—i server khi láº¥y danh sÃ¡ch kÄ© nÄƒng', error });
//   }
// };

// // Get all skills (for admin)
// export const getAllSkills = async (req: Request, res: Response) => {
//   try {
//     const skills = await prisma.skill.findMany({
//       orderBy: { OrderIndex: 'asc' },
//     });
//     res.json(skills);
//   } catch (error) {
//     console.error('Error fetching all skills:', error);
//     res.status(500).json({ message: 'Lá»—i server khi láº¥y danh sÃ¡ch kÄ© nÄƒng', error });
//   }
// };

// // Get skill by ID
// export const getSkillById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const skill = await prisma.skill.findUnique({
//       where: { Id: Number(id) }
//     });
    
//     if (!skill) {
//       return res.status(404).json({ message: 'KhÃ´ng tÃ¬m tháº¥y kÄ© nÄƒng' });
//     }
    
//     res.json(skill);
//   } catch (error) {
//     console.error('Error fetching skill:', error);
//     res.status(500).json({ message: 'Lá»—i server khi láº¥y kÄ© nÄƒng', error });
//   }
// };

// // Create new skill
// export const createSkill = async (req: Request, res: Response) => {
//   try {
//     const { ProfileId, Name, Category, Level, Description, IsVisible, OrderIndex } = req.body;
    
//     // Default ProfileId to 1 if not provided (assuming single profile portfolio)
//     const profileId = ProfileId || 1;

//     const newSkill = await prisma.skill.create({
//       data: {
//         ProfileId: profileId,
//         Name,
//         Category,
//         Level: Level || 5,
//         Description,
//         IsVisible: IsVisible ?? true,
//         OrderIndex: OrderIndex || 0,
//       }
//     });
    
//     res.status(201).json(newSkill);
//   } catch (error) {
//     console.error('Error creating skill:', error);
//     res.status(500).json({ message: 'Lá»—i server khi táº¡o kÄ© nÄƒng', error });
//   }
// };

// // Update skill
// export const updateSkill = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { Name, Category, Level, Description, IsVisible, OrderIndex } = req.body;
    
//     const updatedSkill = await prisma.skill.update({
//       where: { Id: Number(id) },
//       data: {
//         Name,
//         Category,
//         Level,
//         Description,
//         IsVisible,
//         OrderIndex,
//       }
//     });
    
//     res.json(updatedSkill);
//   } catch (error) {
//     console.error('Error updating skill:', error);
//     res.status(500).json({ message: 'Lá»—i server khi cáº­p nháº­t kÄ© nÄƒng', error });
//   }
// };

// // Delete skill
// export const deleteSkill = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await prisma.skill.delete({
//       where: { Id: Number(id) }
//     });
    
//     res.json({ message: 'XÃ³a kÄ© nÄƒng thÃ nh cÃ´ng' });
//   } catch (error) {
//     console.error('Error deleting skill:', error);
//     res.status(500).json({ message: 'Lá»—i server khi xÃ³a kÄ© nÄƒng', error });
//   }
// };
