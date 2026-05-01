import { Router } from 'express';
import {getResumeData} from '../controllers/resumeControllers';

const router = Router();

// Public route - get resume data
router.get('/resumes', getResumeData);


export default router;
