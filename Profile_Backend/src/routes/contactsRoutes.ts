import { Router } from "express";
import { getContactData } from "../controllers/contactsControllers";

const router= Router();

// Route cho trang Contacts
router.get('/contacts', getContactData);

export default router;