import { Router } from "express";
import { getContactData } from "../controllers/contactsControllers";

const router= Router();

// Route cho trang Contacts
router.get('/contact', getContactData);

export default router;