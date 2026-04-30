import {useState} from "react";
import IconRender from "../constants/icons";

const Sidebar= ({profile, contacts})=>{
    // State quản lý việc đóng/mở Sidebar trên giao diện Mobile
    const [isOpen, setIsOpen] = useState(false);
    // Nếu dữ liệu chưa kịp load từ App.jsx
    if (!profile) return null;

    const infoContacts= contacts?.filter(contact=> contact.Category==="Info");
    const linkContacts= contacts?.filter(contact=> contact.Category==="Link");

    return (
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
                        src={profile.AvtDarkImage} 
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
            
            {/* 2. Contact Information */}
            <div className={`transition-opacity duration-700 delay-100 ${isOpen ? "opacity-100 translate-y-0 visible mt-8" : "opacity-0 -translate-y-8 invisible h-0 overflow-hidden lg:h-auto lg:opacity-100 lg:translate-y-0 lg:visible lg:mt-8"}`}>
                <div className="h-[1px] bg-[#383838] my-8"/>
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
                    {/* 3. Social Links */}
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
    );     
}
export default Sidebar;