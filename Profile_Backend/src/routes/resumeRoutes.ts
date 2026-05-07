import { Router } from 'express';
import {getResumeData,createResumeData, updateResumeData, deleteResumeData} from '../controllers/resumeControllers';
import {authAdmin} from '../middleware/authAdmin';

const router = Router();

// Public route - get resume data
router.get('/resumes', getResumeData);

// Admin use only 
router.put('/resume', authAdmin, createResumeData);
router.patch('/resume/:Id', authAdmin, updateResumeData);
router.delete('/resume/:Id', authAdmin, deleteResumeData);


export default router;
