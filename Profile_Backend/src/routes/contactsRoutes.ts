import { Router } from "express";
import { authAdmin } from "../middleware/authAdmin";
import {upload} from "../middleware/upload";
import { getContactData, updateInfo, createContact, deleteContact, updateContact } from "../controllers/contactsControllers";

const router= Router();

// Route cho trang Contacts
router.get('/contacts', getContactData);

//Admin
router.patch('/profile-info/:Id', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), authAdmin, updateInfo);
router.put('/contact', authAdmin, createContact);
router.delete('/contact/:Id', authAdmin, deleteContact);
router.patch('/contact/:Id', authAdmin, updateContact);


export default router;