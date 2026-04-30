import { Router } from "express";
import { getAboutData } from "../controllers/profileControllers";

const router= Router();

// Route cho trang About
router.get('/about', getAboutData);


export default router;