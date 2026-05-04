import { useState, useEffect, useRef } from 'react';
import { contactsServices } from '../services/contactsServices';
import IconRender from '../constants/icons';

const ModalInfo = ({ profile, isModalOpen, setIsModalOpen, refreshData }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    // ... trong component của bạn
    const fileInputRef = useRef(null);
    const audioInputRef = useRef(null);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleAudioClick = () => {
        audioInputRef.current.click();
    }
    // Thêm State để lưu trữ file thật
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(profile?.AvtDarkImage ? `${API_URL}${profile?.AvtDarkImage}` : "");
    const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);

    const [formDataInfo, setFormDataInfo] = useState({
        Title: profile?.Title || "",
        Badge: profile?.Badge || "",
        AvtDarkImage: profile?.AvtDarkImage || "",
        AudioUrl: profile?.AudioUrl || ""
    }); 

    // Hàm xử lý thay đổi form data cho phần Info
    const handleChangeInfo = (e) => {
        const {name, value} = e.target;
        setFormDataInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Khi chọn file mới từ máy tính
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            
            // Tạo link preview tạm thời
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl); // Cập nhật ảnh hiển thị ngay lập tức
            
            // Giải phóng bộ nhớ khi component unmount
            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedAudio(file);
            
            // Tạo link preview tạm thời
            const objectUrl = URL.createObjectURL(file);
            setAudioPreviewUrl(objectUrl); // Cập nhật audio hiển thị ngay lập tức
            // Giải phóng bộ nhớ khi component unmount
            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    const handleClose = () => {
        // Reset states về mặc định
        setSelectedFile(null);
        setSelectedAudio(null);
        setAudioPreviewUrl(null);
        
        // Khôi phục dữ liệu ban đầu
        if (profile) {
            setFormDataInfo({
                Title: profile.Title || "",
                Badge: profile.Badge || "",
                AvtDarkImage: profile.AvtDarkImage || "",
                AudioUrl: profile.AudioUrl || ""
            });
            setPreviewUrl(profile.AvtDarkImage ? `${API_URL}${profile.AvtDarkImage}` : "");
        }
        
        setIsModalOpen(false);
    };

    const handleSubmitInfo = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('Title', formDataInfo.Title);
        data.append('Badge', formDataInfo.Badge);
        
        // Gửi ảnh với key 'avatar'
        if (selectedFile) {
            data.append('avatar', selectedFile); 
        }
        
        // Gửi nhạc với key 'audio'
        if (selectedAudio) {
            data.append('audio', selectedAudio);
        }

        try {
            await contactsServices.updateProfileInfo(profile.Id, data);
            await refreshData();
            handleClose(); // Đóng modal và reset trạng thái
            alert("Cập nhật thành công!");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi upload file!");
        }
    };

    // Mỗi khi biến profile từ props thay đổi, cập nhật lại formDataInfo
    useEffect(() => {
        if (profile) {
            const initialData = {
                Title: profile.Title || "",
                Badge: profile.Badge || "",
                AvtDarkImage: profile.AvtDarkImage || "",
                AudioUrl: profile.AudioUrl || ""
            };
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormDataInfo(initialData);
            
            const fullUrl = profile.AvtDarkImage 
                ? `${API_URL}${profile.AvtDarkImage}` 
                : "";
            setPreviewUrl(fullUrl);
            
            // Xóa state file cũ đi mỗi khi đổi profile/mở lại modal
            setSelectedFile(null);
            setSelectedAudio(null);
            setAudioPreviewUrl(null);
        }
    }, [API_URL, profile, isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1e1e1f] border border-[#383838] rounded-[20px] w-90  p-6 shadow-2xl animate-fade-in">

                <h3 className="text-white text-xl font-bold mb-4">Edit Profile</h3>
                <form onSubmit={handleSubmitInfo} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="text-[#ffdb70] text-xs uppercase mb-1 block">Name</label>
                        <input 
                            type="text"
                            name="Title"
                            value={formDataInfo.Title}
                            onChange={handleChangeInfo}
                            className="w-full bg-[#2b2b2c] border border-[#383838] text-white p-3 rounded-xl focus:border-[#ffdb70] outline-none transition"
                            placeholder="Nhập tên hiển thị..."
                        />
                    </div>
                    {/* Badge */}
                    <div>
                        <label className="text-[#ffdb70] text-xs uppercase mb-1 block">Badge</label>
                        <input 
                            type="text"
                            name="Badge"
                            value={formDataInfo.Badge}
                            onChange={handleChangeInfo}
                            className="w-full bg-[#2b2b2c] border border-[#383838] text-white p-3 rounded-xl focus:border-[#ffdb70] outline-none transition"
                            placeholder="VD: Software Engineer"
                        />
                    </div>
                    {/* Img and Audio */}
                    <div className="flex gap-4 items-center justify-center">
                        {/* Image */}
                        <div>
                            {/* <label className="text-gray-400 text-xs uppercase mb-1 block">Ảnh đại diện</label> */}
                            <div className="relative w-16 h-16 group cursor-pointer" onClick={handleImageClick}>
                                {/* Ảnh hiển thị */}
                                <img 
                                    src={previewUrl} 
                                    className="w-full h-full rounded-lg object-cover border border-[#383838] transition-opacity group-hover:opacity-70" 
                                    />
                                
                                {/* Lớp phủ khi Hover */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0  group-hover:opacity-100 transition-opacity">
                                    <IconRender iconName="RiEditFill" className="text-white text-lg group-hover:text-[#ffdb70]" />
                                </div>

                                {/* Input file ẩn hoàn toàn */}
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    />
                            </div>
                        </div>
                        {/* Audio */}
                        <div >
                            {/* <label className="text-gray-400 text-xs uppercase mb-1 block">Link nhạc nền (URL)</label> */}
                            <div className="relative w-16 h-16 group cursor-pointer" onClick={handleAudioClick}>
                                
                                <div className='w-full h-full rounded-lg border border-[#383838] flex items-center justify-center bg-[#2b2b2c] transition-opacity group-hover:opacity-50'>
                                    {audioPreviewUrl ? (
                                        
                                        <div className="flex items-end gap-[1px] h-10 w-full overflow-hidden px-2">
                                        {/* Tạo khoảng 20-30 thanh bar với độ cao ngẫu nhiên */}
                                        {[...Array(30)].map((_, i) => (
                                            <div
                                            key={i}
                                            className="w-[2px] bg-white animate-waveform"
                                            style={{
                                                // eslint-disable-next-line react-hooks/purity
                                                height: `${Math.random() * 100}%`,
                                                animationDelay: `${i * 0.05}s`
                                            }}
                                            />
                                        ))}
                                        </div>
                                    
                                ) : (
                                    <IconRender iconName="RiMusicFill" className="text-white text-lg group-hover:text-[#ffdb70]" />
                                )}
                                </div>
                                <input 
                                    type="file"
                                    ref={audioInputRef}
                                    accept="audio/*,video/*,mp4/*"
                                    onChange={handleAudioChange}
                                    className="hidden"
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-3 text-gray-400 hover:text-white transition"
                        >
                            Close
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 bg-[#ffdb70] text-black font-bold py-3 rounded-xl hover:bg-[#ffe085] transition shadow-lg shadow-[#ffdb70]/10"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalInfo;