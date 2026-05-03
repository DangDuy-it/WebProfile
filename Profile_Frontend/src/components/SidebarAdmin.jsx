import { useState, useEffect } from 'react';
import { contactsServices } from '../services/contactsServices';
import IconRender from '../constants/icons';


const SidebarAdmin = ({ profile, contacts, refreshData, volume, setVolume }) => {
      // State quản lý việc đóng/mở Sidebar trên giao diện Mobile
    const [isOpen, setIsOpen] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formDataInfo, setFormDataInfo]=useState({
        Title: profile?.Title || "",
        Badge: profile?.Badge || "",
        AvtDarkImage: profile?.AvtDarkImage || "",
        AudioSrc: profile?.AudioSrc || ""
    }); 
    console.log(profile);

    // Hàm xử lý thay đổi form data cho phần Info
    const handleChangeInfo=(e)=>{
        const {name, value}= e.target;
        setFormDataInfo(prev=>({
            ...prev,
            [name]: value
        }))
    }
    // Hàm xử lý lưu thông tin profile
    const handleSubmitInfo= async (e)=>{
        e.preventDefault();
        // Log ra để kiểm tra xem Id và Data có chuẩn không
        console.log("ID gửi đi:", profile?.Id);
        console.log("Data gửi đi:", formDataInfo);

        if (!profile?.Id) {
            alert("Không tìm thấy ID của profile!");
            return;
        }
        try{
            await contactsServices.updateProfileInfo(profile.Id, formDataInfo);
            await refreshData();
            setIsModalOpen(false);
            alert("Cập nhật thông tin profile thành công!");
        }catch(err){
            console.error("Lỗi khi cập nhật thông tin profile:", err);
            alert("Lỗi khi cập nhật thông tin profile!");
        }
    }
    //Mỗi khi biến profile từ props thay đổi, cập nhật lại formDataInfo
    useEffect(() => {
        if (profile) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormDataInfo({
                Title: profile.Title || "",
                Badge: profile.Badge || "",
                AvtDarkImage: profile.AvtDarkImage || "",
                AudioSrc: profile.AudioSrc || ""
            });
        }
    }, [profile]);




    // Nếu dữ liệu chưa kịp load từ App.jsx
    if (!profile) return null;
    
    // // 1. Xử lý xóa Contact
    // const handleDelete = async (id) => {
    //     if (!window.confirm("Duy có chắc chắn muốn xóa liên hệ này?")) return;
    //     try {
    //     await contactsServices.deleteContact(id);
    //     await refreshData(); // Gọi hàm từ Layout để cập nhật UI ngay lập tức
    //     } catch (err) {
    //     alert("Lỗi khi xóa contact!");
    //     }
    // };

    // // 2. Xử lý thêm nhanh (Mẫu)
    // const handleAddQuick = async () => {
    //     const newData = {
    //     Type: "Social",
    //     Name: "New Social",
    //     Value: "https://example.com",
    //     Icon: "FaLink",
    //     Category: "Contact"
    //     };
    //     try {
    //     setIsAdding(true);
    //     await contactsServices.createContact(newData);
    //     await refreshData(); // Cập nhật lại danh sách
    //     } catch (err) {
    //     alert("Lỗi khi thêm!");
    //     } finally {
    //     setIsAdding(false);
    //     }
    // };

    

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
            {/* Modal OverPlay */}
            {/* Modal Overlay */}
{isModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    
    {/* Form Container */}
    <div className="bg-[#1e1e1f] border border-[#383838] rounded-[20px] w-full max-w-md p-6 shadow-2xl animate-fade-in">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-xl font-bold">Cập nhật thông tin</h3>
        <button 
          onClick={() => setIsModalOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmitInfo} className="space-y-4">
        
        {/* Input Title */}
        <div>
          <label className="text-gray-400 text-xs uppercase mb-1 block">Họ và Tên</label>
          <input 
            type="text"
            name="Title"
            value={formDataInfo.Title}
            onChange={handleChangeInfo}
            className="w-full bg-[#2b2b2c] border border-[#383838] text-white p-3 rounded-xl focus:border-[#ffdb70] outline-none transition"
            placeholder="Nhập tên hiển thị..."
          />
        </div>

        {/* Input Badge */}
        <div>
          <label className="text-gray-400 text-xs uppercase mb-1 block">Danh hiệu / Vị trí</label>
          <input 
            type="text"
            name="Badge"
            value={formDataInfo.Badge}
            onChange={handleChangeInfo}
            className="w-full bg-[#2b2b2c] border border-[#383838] text-white p-3 rounded-xl focus:border-[#ffdb70] outline-none transition"
            placeholder="VD: Software Engineer"
          />
        </div>

        {/* Input Avatar Image URL */}
        <div>
          <label className="text-gray-400 text-xs uppercase mb-1 block">Link ảnh đại diện (URL)</label>
          <input 
            type="text"
            name="AvtDarkImage"
            value={formDataInfo.AvtDarkImage}
            onChange={handleChangeInfo}
            className="w-full bg-[#2b2b2c] border border-[#383838] text-white p-3 rounded-xl focus:border-[#ffdb70] outline-none transition"
            placeholder="https://..."
          />
        </div>

        {/* Input Audio Source URL */}
        <div>
          <label className="text-gray-400 text-xs uppercase mb-1 block">Link nhạc nền (URL)</label>
          <input 
            type="text"
            name="AudioSrc"
            value={formDataInfo.AudioSrc}
            onChange={handleChangeInfo}
            className="w-full bg-[#2b2b2c] border border-[#383838] text-white p-3 rounded-xl focus:border-[#ffdb70] outline-none transition"
            placeholder="https://..."
          />
        </div>

        {/* Nút hành động */}
        <div className="flex gap-3 pt-4">
          <button 
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 py-3 text-gray-400 hover:text-white transition"
          >
            Hủy bỏ
          </button>
          <button 
            type="submit"
            className="flex-1 bg-[#ffdb70] text-black font-bold py-3 rounded-xl hover:bg-[#ffe085] transition shadow-lg shadow-[#ffdb70]/10"
          >
            Lưu thay đổi
          </button>
        </div>

      </form>
    </div>
  </div>
)}
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
    );  
};

export default SidebarAdmin;