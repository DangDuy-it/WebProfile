import { Router } from "express";
import { authAdmin } from "../middleware/authAdmin";
import {upload} from "../middleware/upload";
import { getPortfolioData, createProject, updateProject, deleteProject } from "../controllers/portfolioControllers";

const router= Router();

// Route cho trang Portfolio
router.get('/portfolios', getPortfolioData);
// Admin use only
router.put('/portfolios', authAdmin, upload.single('ImageUrl'), createProject);
router.patch('/portfolios/:Id', authAdmin, upload.single('ImageUrl'), updateProject);
router.delete('/portfolios/:Id', authAdmin, deleteProject);

export default router;