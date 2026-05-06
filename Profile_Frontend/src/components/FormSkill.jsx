import { useState, useEffect } from "react";
import { profileServices } from "../services/profileServices";
import IconRender from "../constants/icons";
import IconPicker from "./IconPicker";



const FormSkill = ({skill, isModalOpen, setIsModalOpen, refreshSkills}) => {

    const [showBoxIcon, setShowBoxIcon] = useState(false); // State để quản lý việc hiển thị IconPicker

    const initialFormData = {
        Icon: "",
        Name: "",
        Category:"Frontend"
    };
    const [formDataSkill, setFormDataSkill] = useState(initialFormData);

    // Điền dữ liệu vào form khi 'skill' thay đổi (dùng cho cả trường hợp tạo mới và sửa)
    useEffect(()=>{
        if(skill){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormDataSkill(skill);
        }
        else{
            setFormDataSkill({
                Icon: "",
                Name: "",
                Category: "Frontend"
            });
        }
    }, [skill]);

    // Hàm xử lý khi người dùng thay đổi giá trị trong form
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormDataSkill(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // Hàm xử lý khi người dùng submit form
    const handleSubmitSkill=async(e)=>{
        e.preventDefault();

        const { Icon, Name } = formDataSkill;
        if (!Icon || !Name) {
            alert("Vui lòng điền đầy đủ các trường thông tin!");
            return;
        }
        try{
            if(skill?.Id){
                await profileServices.updateSkill(skill.Id, formDataSkill);
            }else{
                await profileServices.createSkill(formDataSkill);
            }
            alert("Lưu thành công!");
            setFormDataSkill(initialFormData); // Reset form sau khi submit thành công
            setIsModalOpen(false);
            await refreshSkills(); // Gọi hàm refreshSkills sau khi lưu thành công để cập nhật lại danh sách skills
        }
        catch (error) {
            console.error("Error submitting skill form:", error);
        }
    }

    // Hàm xử lý khi chọn icon từ picker
    const handleIconSelect = (iconName) => {
        setFormDataSkill(prev => ({
            ...prev,
            Icon: iconName // Nếu bạn dùng cả 2 trường Type và Icon giống nhau
        }));
        setShowBoxIcon(false); // Đóng IconPicker sau khi chọn
    };

    if (!isModalOpen) return null; // Không render form nếu modal không mở

    return(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"> 
            <div className="bg-[#1e1e1f] border border-[#383838] rounded-[20px] w-90  p-6 shadow-2xl animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-4">{skill ? "Edit Skill" : "Add Skill"}</h2>
                <form onSubmit={handleSubmitSkill}>
                    <div className="flex mb-4 items-center justify-between">

                        <div className="flex-1 mr-4">
                            <input
                                type="text"
                                name="Name"
                                placeholder="Name"
                                value={formDataSkill.Name}
                                onChange={handleChange}
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
                                    {formDataSkill.Icon ? (
                                        <IconRender iconName={formDataSkill.Icon} />
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
                                            selectedIcon={formDataSkill.Icon} 
                                            onSelect={handleIconSelect} 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Category */}
                    <div className="border px-3 py-2 w-full rounded-lg bg-[#2b2b2c] border-[#383838] text-white outline-none hover:border-[#ffdb70] focus:border-[#ffdb70] transition-colors">
                        <div className="flex mr-4 items-center gap-2">
                            <label className="block text-sm text-gray-400 mb-1">Category</label>
                            <select
                                name="Category"
                                value={formDataSkill.Category}
                                onChange={handleChange}
                                className="text-sm bg-[#2b2b2c] border border-[#383838] text-white outline-none cursor-pointer"
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Tool">Tool</option>
                            </select>
                        </div>
                    </div>

                    {/* Button Actions */}
                    <div className="mt-4 flex justify-center font-bold gap-4">

                        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors">
                            Close
                        </button>

                        <button type="submit" className="bg-[#ffdb70] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#ffdb70]/80 transition-colors">
                            {skill ? "Save" : "Create"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default FormSkill;