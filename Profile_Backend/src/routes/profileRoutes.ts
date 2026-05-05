import { Router } from "express";
import { getAboutData, updateAbout, createAboutHighlight,updateAboutHighlight, deleteAboutHighlight, createSkill,updateSkill, deleteSkill } from "../controllers/profileControllers";
import { authAdmin } from "../middleware/authAdmin";

const router= Router();

// Route cho trang About
router.get('/about', getAboutData);
// Admin
router.patch('/about/:Id', authAdmin, updateAbout);
router.put('/about-highlight', authAdmin, createAboutHighlight);
router.patch('/about-highlight/:Id', authAdmin, updateAboutHighlight);
router.delete('/about-highlight/:Id', authAdmin, deleteAboutHighlight);
router.put('/skill', authAdmin, createSkill);
router.delete('/skill/:Id', authAdmin, deleteSkill);
router.patch('/skill/:Id', authAdmin, updateSkill);

export default router;