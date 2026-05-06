import { useEffect, useState } from "react";
import { profileServices } from "../services/profileServices";
import IconRender from "../constants/icons";
import IconPicker from "./IconPicker";

const FormHighlight = ({highlight, isModalOpen, setIsModalOpen, refreshData}) => {

    const [showBoxIcon, setShowBoxIcon] = useState(false); // State để quản lý việc hiển thị IconPicker

    const initialFormData = {
        Icon: "",
        Name: "",
        Description: ""
    };
    const [formDataHighlight, setFormDataHighlight] = useState(initialFormData);

    // Điền dữ liệu vào form khi 'highlight' thay đổi (dùng cho cả trường hợp tạo mới và sửa)
    useEffect(()=>{
        if(highlight){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormDataHighlight(highlight);
        }else{
            setFormDataHighlight({
                Icon: "",
                Name: "",
                Description: ""
            });
        }
    }, [highlight]);

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormDataHighlight(prev => ({...prev, [name]: value}));
    }

    const handleSubmitHighlight=async(e)=>{
        e.preventDefault();

        const { Icon, Name, Description } = formDataHighlight;
        if (!Icon || !Name || !Description) {
            alert("Vui lòng điền đầy đủ các trường thông tin!");
            return;
        }
        try{
            if (highlight?.Id){
                await profileServices.updateAboutHighlight(highlight.Id, formDataHighlight);
            }else{
                await profileServices.createAboutHighlight(formDataHighlight);
            }
            alert("Lưu thành công!");
            setFormDataHighlight(initialFormData); // Reset form sau khi submit thành công
            setIsModalOpen(false);
            await refreshData(); // Gọi hàm refreshData sau khi lưu thành công để cập nhật lại danh sách highlights
        }catch(error){
            console.error("Lỗi khi lưu highlight:", error);
            alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
    }

    // Hàm xử lý khi chọn icon từ picker
    const handleIconSelect = (iconName) => {
        setFormDataHighlight(prev => ({
            ...prev,
            Icon: iconName // Nếu bạn dùng cả 2 trường Type và Icon giống nhau
        }));
        setShowBoxIcon(false); // Đóng IconPicker sau khi chọn
    };


    if (!isModalOpen) return null; // Không render form nếu modal không mở

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1e1e1f] border border-[#383838] rounded-[20px] w-90  p-6 shadow-2xl animate-fade-in" >
                <h2 className="text-xl font-bold text-white mb-4">{highlight ? "Edit Highlight" : "Create New Highlight"}</h2>
                <form onSubmit={handleSubmitHighlight}>
                        {/* Name and Icon */}
                        <div className="flex mb-4 items-center justify-between">
                            {/* Name */}
                            <div className="flex-1 mr-4">
                                
                                <input
                                    type="text"
                                    name="Name"
                                    value={formDataHighlight.Name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="border px-3 py-2 w-full rounded-lg bg-[#2b2b2c] border-[#383838] text-white outline-none hover:border-[#ffdb70] focus:border-[#ffdb70] transition-colors"
                                />
                            </div>

                            {/* Icon */}
                            <div>
                                {/* Nút bấm để mở Picker */}
                                <button
                                    type="button"
                                    onClick={() => setShowBoxIcon(!showBoxIcon)} // Toggle hiển thị IconPicker
                                    className="flex items-center  gap-3  bg-[#2b2b2c] border border-[#383838] text-white p-1 rounded-xl hover:border-[#ffdb70] transition-all"
                                >
                                    <div className="w-8 h-8 bg-[#383838] rounded-lg flex items-center justify-center text-[#ffdb70]">
                                        {formDataHighlight.Icon ? (
                                            <IconRender iconName={formDataHighlight.Icon} />
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
                                                selectedIcon={formDataHighlight.Icon} 
                                                onSelect={handleIconSelect} 
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    
                    <div>
                        <textarea
                            name="Description"
                            value={formDataHighlight.Description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border px-3 py-2 rounded-lg bg-[#2b2b2c] border-[#383838] text-white outline-none hover:border-[#ffdb70] focus:border-[#ffdb70] transition-colors w-full h-24 resize-none"
                        />
                    </div>
                    <div className="mt-4 flex justify-center font-bold gap-4">

                        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors">
                            Close
                        </button>
                        <button type="submit" className="bg-[#ffdb70] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#ffdb70]/80 transition-colors">
                            {highlight ? "Save" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormHighlight;

