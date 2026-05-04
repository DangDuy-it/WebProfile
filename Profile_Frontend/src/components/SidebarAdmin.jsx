import { useState } from 'react';
import IconRender from '../constants/icons';
import FormInfo from './FormInfo';
import FormContact from './FormContact';
import { contactsServices } from '../services/contactsServices';

const SidebarAdmin = ({ profile, contacts, refreshData, volume, setVolume }) => {
    const API_URL = import.meta.env.VITE_API_URL ;
      // State quản lý việc đóng/mở Sidebar trên giao diện Mobile
    const [isOpen, setIsOpen] = useState(false);

    const [isFormInfo, setIsFormInfo] = useState(false);
    const [isFormContact, setIsFormContact] = useState(false);

    const [selectedContact, setSelectedContact] = useState(null);


    // Hàm mở Modal để Thêm mới
    const handleAddNew = () => {
        setSelectedContact(null); // Đảm bảo form trắng
        setIsFormContact(true);
    };

    // Hàm mở Modal để Sửa
    const handleEdit = (contact) => {
        setSelectedContact(contact); // Truyền dữ liệu contact vào state
        setIsFormContact(true);
    };


    const handleDelete= async (Id)=>{
        if(window.confirm("Are you sure you want to delete this contact?")){
            try{
                await contactsServices.deleteContact(Id);
                alert("Contact deleted successfully!");

                await refreshData(); // Làm mới dữ liệu sau khi xóa
            }catch (error) {
                console.error('Error deleting contact:', error);
                alert("Failed to delete contact. Please try again.");
            }
        }
    }

    // Nếu dữ liệu chưa kịp load từ App.jsx
    if (!profile) return null;
        
    const infoContacts= contacts?.filter(contact=> contact.Category==="Info");
    const linkContacts= contacts?.filter(contact=> contact.Category==="Link");

    return (
    <>
        <aside className={`sidebar bg-[#1e1e1f] border border-[#383838] rounded-[30px] p-5 shadow-lg mb-8 lg:sticky lg:top-14 lg:min-w-[280px] z-10 transition-all duration-[500ms] ease-in-out overflow-hidden relative ${
        isOpen ? "max-h-[1000px] p-8" : "max-h-[160px] lg:max-h-[1000px] lg:p-5"
        }`}>
                {/* Nút Toggle chỉ hiện trên Mobile */}
                <button
                    onClick={()=> setIsOpen(!isOpen)}
                    className="lg:hidden absolute top-0 right-0 text-[#ffdb70] border-l border-b border-[#383838] p-1 rounded-bl-2xl bg-gradient-to-br from-[#383838] to-[#212121] shadow-md z-20"
                >
                    <IconRender iconName="RiArrowDropDownLine" className={`transition-transform duration-[500ms] text-2xl  ${isOpen ? "rotate-180" : ""} `}/>
                </button>
            {/* 1. Header Section: Avatar, Name , Badge  */}
            <div className="flex lg:flex-col items-center lg:text-center gap-4 relative">
                <figure className=" rounded-[20px] w-20 lg:w-36 flex items-center justify-center p-2 shadow-inner bg-gradient-to-br from-[#383838] to-[#212121]">
                    <img 
                        src={`${API_URL}${profile.AvtDarkImage}`}
                        alt={profile.Name} 
                        className="w-full rounded-xl object-cover aspect-square"
                        />
                </figure>
                <div className="flex-1">
                    <h1 className="text-xl tracking-tight text-white mb-2 whitespace-nowrap font-semibold">
                        {profile.Title}
                    </h1>
                    <p className="bg-[#2b2b2b] text-[11px] px-4 py-1.5 rounded-lg inline-block text-gray-200 font-light ">
                        {profile.Badge}
                    </p>
                </div>
            </div>
            
            {/* 2. Phần điều khiển âm lượng */}
            <div className="px-2 mt-4 relative group flex justify-center items-center gap-2">
                <div className="flex items-center gap-2 ">
                
                    {/* Icon Loa: Thay đổi icon dựa trên mức âm lượng */}
                    <div className="flex text-[#ffdb70] text-xl cursor-pointer ">
                        <IconRender 
                            iconName={volume === 0 ? "RiVolumeMuteFill" : volume < 0.5 ? "RiVolumeDownFill" : "RiVolumeUpFill"} 
                        />
                    </div>

                    {/* Thanh Input: Ẩn mặc định, hiện khi group (thẻ cha) được hover */}
                    <div className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:w-full group-hover:opacity-100">
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className={`w-full h-2 bg-[#383838] rounded-lg appearance-none cursor-pointer accent-[#ffdb70] outline-none flex-shrink-0`}
                            style={{
                                background: `linear-gradient(to right, #ffdb70 0%, #ffdb70 ${volume * 100}%, #383838 ${volume * 100}%, #383838 100%)`
                            }}
                        />
                    </div>
                </div>
            </div>

           
      
            {/* 3. Contact Information */}
            <div className={`transition-opacity duration-700 delay-100 ${isOpen ? "opacity-100 translate-y-0 visible mt-8" : "opacity-0 -translate-y-8 invisible h-0 overflow-hidden lg:h-auto lg:opacity-100 lg:translate-y-0 lg:visible "}`}>
                    <div className="flex items-center mx-4 mt-8 mb-6 gap-4">
                        {/* Nút Edit Profile */}
                        <div className="relative group">
                            <button 
                                onClick={() => setIsFormInfo(true)}
                                className="p-2 rounded-lg bg-[#202022] border border-[#383838] text-gray-400 hover:text-[#ffdb70] hover:border-[#ffdb70]/50 transition-all duration-300 shadow-sm"
                            >
                                <IconRender iconName="FaUserEdit" className="text-lg" />
                            </button>
                            
                            
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#1e1e1f] border border-[#383838] text-[#ffdb70] text-[10px] font-medium rounded-md shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                                Edit Profile
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#383838]"></div>
                               
                            </div>
                        </div>

                        {/* Thanh ngang Gradient tinh tế */}
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#383838] to-transparent"></div>

                        {/* Nút Add Contact */}
                        <div className="relative group">
                            <button 
                                onClick={() => handleAddNew()}
                                className="p-2 rounded-lg bg-[#202022] border border-[#383838] text-gray-400 hover:text-[#ffdb70] hover:border-[#ffdb70]/50 transition-all duration-300 shadow-sm"
                            >
                                <IconRender iconName="RiAddBoxLine" className="text-xl" />
                            </button>

                            
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#1e1e1f] border border-[#383838] text-[#ffdb70] text-[10px] font-medium rounded-md shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                                Add Contact
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#383838]"></div>
                            </div>
                        </div>
                    </div>
                    {/* Contact List */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        {infoContacts?.map((contact)=>(
                            <li key={contact.Id} className="flex items-center gap-4 text-sm">

                                <div className="relative group bg-[#202022] text-[#ffdb70] w-11 h-11 flex items-center justify-center rounded-xl shadow-md border border-[#383838] shrink-0 hover:bg-[#383838] transition-colors ">
                                {/* Edit button contact */}
                                    <div className='transition-all duration-300 transform  group-hover:opacity-0'>
                                        <IconRender iconName={contact.Icon}/>
                                    </div>
                                   
                                    <button onClick={()=> handleEdit(contact)} className='absolute transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'>
                                        <IconRender iconName="FaEdit" />
                                    </button>
                                </div>
                                {/* Contact Value */}
                                <div className="min-w-0 flex-1"> 
                                    <p>{contact.Name}</p>    
                                    {/* Logic auto create link for Email and Phone */}
                                    {contact.Type ==="Email" ? (
                                        <a href={`mailto:${contact.Value}`} className="text-gray-100 truncate block hover:text-[#ffdb70] transition-colors">
                                            {contact.Value}
                                        </a>
                                    ) : contact.Type ==="Phone" ? (
                                        <a href={`tel:${contact.Value}`} className="text-gray-100 truncate block hover:text-[#ffdb70] transition-colors">
                                            {contact.Value}
                                        </a>
                                    ) : (
                                        <p className="text-gray-100 truncate" title={contact.Value}>
                                        {contact.Value}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <button onClick={()=> handleDelete(contact.Id)}>
                                        <IconRender iconName="RiDeleteBinLine" className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Thanh ngang Gradient tinh tế */}
                     <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#383838] to-transparent my-8"></div>

                    {/* 4. Social Links */}
                    <ul className="flex justify-center items-center gap-4 text-xl pb-2">
                        {linkContacts?.map((contact)=>(
                            <li key={contact.Id} className="group relative hover:text-[#ffdb70] transition-colors">
                                <a href={contact.Value} target="_blank" rel="noopener noreferrer" className=" text-gray-400 hover:text-[#ffdb70] transition-all duration-[500ms] ease-out hover:-translate-y-1 block">
                                    <IconRender iconName={contact.Icon} />
                                </a>
                                <p className="absolute bottom-[25px] left-1/2 transform -translate-x-1/2 bg-[#2b2b2b] text-gray-200 text-xs font-light py-1 px-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                    {contact.Name}
                                </p>
                                <div className="absolute flex  gap-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2 left-1/2 ">
                                    {/* Edit */}
                                    <button onClick={()=> handleEdit(contact)} className='text-gray-400 hover:text-[#ffdb70] transition-colors'>
                                        <IconRender iconName="RiEdit2Line" />
                                    </button>
                                    {/* Delete */}
                                    <button onClick={()=> handleDelete(contact.Id)} className='text-gray-400 hover:text-[#ffdb70] transition-colors'>
                                        <IconRender iconName="RiDeleteBinLine" />
                                    </button>                             
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
        </aside>
        
        {/* Form Info */}
        <FormInfo 
            profile={profile} 
            isModalOpen={isFormInfo} 
            setIsModalOpen={setIsFormInfo} 
            refreshData={refreshData} 
        />
        {/* Form Create Contact */}
        <FormContact 
            contact={null} 
            isModalOpen={isFormContact}
            setIsModalOpen={setIsFormContact}
            refreshData={refreshData}
        />
        {/* Form Edit Contact */}
        <FormContact 
            contact={selectedContact} 
            isModalOpen={isFormContact}
            setIsModalOpen={setIsFormContact}
            refreshData={refreshData}
        />

    </>
    );  
};

export default SidebarAdmin;