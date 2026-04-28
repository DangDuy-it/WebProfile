import { Request, Response } from "express";
import prisma from "../config/db";

// Controller để lấy dữ liệu cho trang Home
export const getHomeData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await prisma.profile.findFirst({
            select: {
                Badge: true,
                Title: true,
                Description: true,
                AvtDarkImage: true,
                AvtLightImage: true
            }
        });

        if (result) {
            res.status(200).json({
                badge: result.Badge,
                title: result.Title,
                description: result.Description,
                avtDarkImage: result.AvtDarkImage,
                avtLightImage: result.AvtLightImage
            });
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch(err) {
        console.error('Error fetching home data:', err);
        res.status(500).json({ error: 'Error fetching home data' });
    }
}

// Controller để lấy dữ liệu cho trang About 
export const getAboutData = async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await prisma.profile.findFirst({
            include: {
                AboutHighlight: true
            }
        });

        if (profile) {
            const highlight = profile.AboutHighlight[0] || {};
            res.status(200).json([{
                title: profile.Title,
                intro: profile.Intro,
                body: profile.Body,
                avtDarkImage: profile.AvtDarkImage,
                avtLightImage: profile.AvtLightImage,
                university: highlight.University || null,
                major: highlight.Major || null,
                goal: highlight.Goal || null,
            }]);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch(err) {
        console.error('Error fetching about data:', err);
        res.status(500).json({ error: 'Error fetching about data' });   
    }
}
