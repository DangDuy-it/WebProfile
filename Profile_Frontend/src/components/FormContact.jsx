import { useState, useEffect } from 'react';
import { contactsServices } from '../services/contactsServices';
import IconRender from '../constants/icons';
import IconPicker from './IconPicker';

const FormContact = ({ contact, isModalOpen, setIsModalOpen, refreshData }) => {
    
    const [showBoxIcon, setShowBoxIcon] = useState(false); // State để quản lý việc hiển thị IconPicker
    // State để quản lý dữ liệu form
    const initialFormData = {
        Type: "",
        Category: "Info",
        Name: "",
        Value: "",
        Icon: ""
    };
    
    const [formDataContact, setFormDataContact] = useState(initialFormData);

    // 2. Bộ khung mở rộng cho chức năng Sửa
    // Khi Duy truyền 'contact' từ Component cha vào, useEffect này sẽ tự động điền dữ liệu
    useEffect(()=>{
        if(contact){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormDataContact(contact); // Điền dữ liệu vào form khi 'contact' thay đổi
        }else{
            setFormDataContact(initialFormData); // Reset form khi không có 'contact' (tức là khi mở form để tạo mới)
        }
    }, [contact, isModalOpen]);
    
    // Hàm xử lý khi người dùng thay đổi giá trị trong form
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormDataContact(prev => ({
            ...prev,
            [name]: value
        }));
    }
    // Hàm xử lý khi chọn icon từ picker
    const handleIconSelect = (iconName) => {
        setFormDataContact(prev => ({
            ...prev,
            Icon: iconName // Nếu bạn dùng cả 2 trường Type và Icon giống nhau
        }));
        setShowBoxIcon(false); // Đóng IconPicker sau khi chọn
    };
    
    // Hàm xử lý khi người dùng submit form
    const handleSubmitContact=async(e)=>{
        e.preventDefault();

        // Kiểm tra xem các trường bắt buộc đã được nhập đủ chưa
        const { Type, Category, Name, Value, Icon } = formDataContact;
        if (!Type || !Category || !Name || !Value || !Icon) {
            alert("Vui lòng điền đầy đủ các trường thông tin!");
            return;
        }

        try{
            if (contact?.Id){
                // Gọi API để cập nhật liên hệ
                await contactsServices.updateContact(contact.Id, formDataContact);
                alert("Contact updated successfully!");
            } else {
                // Gọi API để tạo liên hệ mới
                await contactsServices.createContact(formDataContact);
                alert("Contact created successfully!");
            }
            setFormDataContact(initialFormData); // Reset form sau khi submit thành công
            await refreshData(); // Làm mới dữ liệu sau khi cập nhật
            setIsModalOpen(false); // Đóng modal sau khi submit
        } catch (error) {
            console.error("Error submitting contact form:", error);
        }
    }
    if(!isModalOpen) return null; // Nếu modal không mở, không render gì cả
    

    return(
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
            <div className="bg-[#1e1e1f] border border-[#383838] rounded-[20px] w-90  p-6 shadow-2xl animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-4">{contact ? "Edit Contact" : "Add New Contact"}</h2>
                <form  onSubmit={handleSubmitContact}>

                    {/* Type and Icon */}
                    <div className="flex items-center justify-center  mb-4">
                        {/* Type */}
                        <div className="flex-1 mr-4">
                            {/* <label className="block text-sm text-gray-400 mb-1">Type</label> */}
                            <input type="text"
                            name="Type"
                            value={formDataContact.Type}
                            onChange={handleChange}
                            placeholder='Type'
                            className='border w-full px-3 py-2 rounded-lg bg-[#2b2b2c] border-[#383838] text-white outline-none hover:border-[#ffdb70] focus:border-[#ffdb70] transition-colors'
                            />
                        </div>
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            {/* Nút bấm để mở Picker */}
                            <button
                                type="button"
                                onClick={() => setShowBoxIcon(!showBoxIcon)} // Toggle hiển thị IconPicker
                                className="flex items-center gap-3  bg-[#2b2b2c] border border-[#383838] text-white p-1 rounded-xl hover:border-[#ffdb70] transition-all"
                            >
                                <div className="w-8 h-8 bg-[#383838] rounded-lg flex items-center justify-center text-[#ffdb70]">
                                    {formDataContact.Icon ? (
                                        <IconRender iconName={formDataContact.Icon} />
                                    ) : (
                                        <span className="text-xs">?</span>
                                    )}
                                </div>

                            </button>

                            {/* Hiển thị Picker theo điều kiện */}
                            {showBoxIcon && (
                                <div className="relative mt-2">
                                    {/* Overlay để bấm ra ngoài thì đóng (Tùy chọn) */}
                                    <div 
                                        className="fixed inset-0 z-0" 
                                        onClick={() => setShowBoxIcon(false)}
                                    ></div>
                                    
                                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-80 h-auto">
                                        <IconPicker 
                                            selectedIcon={formDataContact.Icon} 
                                            onSelect={handleIconSelect} 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        {/* <label className="block text-sm text-gray-400 mb-1">Name</label> */}
                        <input type="text"
                            name="Name"
                            value={formDataContact.Name}
                            placeholder='Name'
                            onChange={handleChange}
                            className='border px-3 py-2 rounded-lg border-[#383838] bg-[#2b2b2c] w-full text-white outline-none focus:border-[#ffdb70] transition-colors'
                            />
                        </div>
                    <div className="mb-4">
                        {/* <label className="block text-sm text-gray-400 mb-1">Link</label> */}
                        <input type="text"
                            name="Value"
                            value={formDataContact.Value}
                            placeholder='Link (vd: email, phone, url...)'
                            onChange={handleChange}
                            className='border px-3 py-2 rounded-lg border-[#383838] bg-[#2b2b2c] w-full text-white outline-none focus:border-[#ffdb70] transition-colors'
                        />
                    </div>
                    {/* Form fields would go here */}
                    <div className="mb-4 flex  items-center gap-4 border px-3 py-2 rounded-lg border-[#383838] bg-[#2b2b2c] text-white outline-none focus:border-[#ffdb70] transition-colors">
                        <label className="block text-sm text-gray-400 mb-1">Category</label>
                        <select name="Category" id="" value={formDataContact.Category} onChange={handleChange} className='border border-[#383838] rounded-lg px-2 bg-[#2b2b2c] text-white outline-none focus:border-[#ffdb70] transition-colors'>
                            <option value="Info" className='text-sm text-gray-400'>Info</option>
                            <option value="Link" className='text-sm text-gray-400'>Link</option>
                        </select>
                    </div>
                    {/* Buttons */}
                    <div className="mt-4 flex justify-center font-bold gap-4"> 
                        <button 
                            type="button" 
                            onClick={()=> setIsModalOpen(false)} 
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                        >
                            Close
                        </button>

                        <button type="submit" className="bg-[#ffdb70] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#ffdb70]/80 transition-colors">
                            {contact ? "Save" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default FormContact;