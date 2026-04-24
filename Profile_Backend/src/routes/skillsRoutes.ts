import { Router } from 'express';
import {
  getSkills,
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillsControllers';

const router = Router();

// Public route - get visible skills
router.get('/skills', getSkills);

// Protected/Admin routes
router.get('/skills/all', getAllSkills);
router.get('/skills/:id', getSkillById);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

export default router;
