import { useState } from 'react';
import IconRender from '../constants/icons';
import ModalInfo from './ModalInfo';

const SidebarAdmin = ({ profile, contacts, refreshData, volume, setVolume }) => {
    const API_URL = import.meta.env.VITE_API_URL ;
      // State quản lý việc đóng/mở Sidebar trên giao diện Mobile
    const [isOpen, setIsOpen] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            {/* Edit Profile Button */}
            <button 
                onClick={()=> setIsModalOpen(true)}>
                <div className="text-sm text-gray-400 hover:text-[#ffdb70] transition-colors">
                    <IconRender iconName="FaEdit" className="inline-block mr-1" />
                    <p>Edit Profile</p>
                </div>
            </button>
    

            
            {/* 3. Contact Information */}
            <div className={`transition-opacity duration-700 delay-100 ${isOpen ? "opacity-100 translate-y-0 visible mt-8" : "opacity-0 -translate-y-8 invisible h-0 overflow-hidden lg:h-auto lg:opacity-100 lg:translate-y-0 lg:visible "}`}>
                <div className="h-[1px] bg-[#383838] my-4"/>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        {infoContacts?.map((contact)=>(
                            <li key={contact.Id} className="flex items-center gap-4 text-sm">
                                <div className="bg-[#202022] text-[#ffdb70] w-11 h-11 flex items-center justify-center rounded-xl shadow-md border border-[#383838] shrink-0">
                                    <IconRender iconName={contact.Icon} />
                                </div>
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
                            </li>
                        ))}
                    </ul>
                    
                    <div className="h-[1px] bg-[#383838] my-8" />
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
                            </li>
                        ))}
                    </ul>
                </div>
        </aside>
        
        {/* Modal Info */}
        <ModalInfo 
            profile={profile} 
            isModalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen} 
            refreshData={refreshData} 
        />
    </>
    );  
};

export default SidebarAdmin;