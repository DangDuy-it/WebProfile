import { Router } from "express";
import { authAdmin } from "../middleware/authAdmin";
import { getContactData, updateInfo, createContact, deleteContact } from "../controllers/contactsControllers";

const router= Router();

// Route cho trang Contacts
router.get('/contacts', getContactData);

//Admin
router.patch('/profile-info/:Id', authAdmin, updateInfo); 
router.put('/contact', authAdmin, createContact); // Tạo mới hoặc cập nhật contact tùy vào Id có tồn tại hay không
router.delete('/contact/:Id', authAdmin, deleteContact);



export default router;