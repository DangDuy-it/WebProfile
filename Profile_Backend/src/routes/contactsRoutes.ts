import { Router } from "express";
import { authAdmin } from "../middleware/authAdmin";
import { getContactData, updateInfo, createContact, deleteContact, updateContact } from "../controllers/contactsControllers";
import {upload} from "../middleware/upload";

const router= Router();

// Route cho trang Contacts
router.get('/contacts', getContactData);

//Admin
router.patch('/profile-info/:Id', upload.single('avatar'), authAdmin, updateInfo); 
router.put('/contact', authAdmin, createContact); 
router.delete('/contact/:Id', authAdmin, deleteContact);
router.patch('/contact/:Id', authAdmin, updateContact);


export default router;