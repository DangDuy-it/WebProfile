import { Router } from "express";
import { getAboutData, getHomeData } from "../controllers/profileControllers";

const router= Router();

// Route cho trang Home
router.get('/home', getHomeData);
router.get('/about', getAboutData);


// Route cho trang About

export default router;