import { Router } from "express";
import { getPortfolioData } from "../controllers/portfolioControllers";

const router= Router();

// Route cho trang Portfolio
router.get('/portfolios', getPortfolioData);

export default router;