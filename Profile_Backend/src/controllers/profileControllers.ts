import { Request, Response } from "express";
import { getRequest } from "../config/db";


// Controller để lấy dữ liệu cho trang Home
export const getHomeData= async (req: Request, res: Response): Promise<void> => {
    try{
        const request= await getRequest();
        
        // Thực hiện truy vấn lấy dữ liệu từ bảng Home
        const poolResult = await request.query(`
            SELECT
                Badge AS badge,
                Title AS title,
                Description AS description,
                AvtDarkImage AS avtDarkImage,
                AvtLightImage AS avtLightImage
            FROM Profile
        `);

        res.status(200).json(poolResult.recordset[0]);

    }
    catch(err){
        console.error('Error fetching home data:', err);
        res.status(500).json({ error: 'Error fetching home data' });
    }
}



// Controller để lấy dữ liệu cho trang About 

export const getAboutData= async (req: Request, res: Response): Promise<void> =>{
    try{
        const request = await getRequest();

        const poolResult= await request.query(`
            SELECT 
                p.Title2 AS title,
                p.Intro AS intro,
                p.Body AS body,
                p.AvtDarkImage AS avtDarkImage,
                p.AvtLightImage AS avtLightImage,

                a.University AS university,
                a.Major AS major,
                a.Focus AS focus,
                a.Goal AS goal,
                a.Fact AS fact

                FROM Profile p 
                LEFT JOIN About_highlight a ON p.Id= a.ProfileId

                WHERE p.Id=1
            
            `)
            res.status(200).json(poolResult.recordset); 
        
    }
    catch(err){
        console.error('Error fetching about data:', err);
        res.status(500).json({ error: 'Error fetching about data' });   
    }
}