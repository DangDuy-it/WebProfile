import { useState, useEffect, useRef } from "react";
import { portfolioServices } from "../services/portfolioServices";
import IconRender from "../constants/icons";

const FormProject = ({project, isModalOpen, setIsModalOpen, refreshData} ) => {
    const initialFormData = {
        Title: "",
        Category:"Web Design",
        ImageUrl: "",
        LinkDemo: "",
        LinkGithub: "",
    }
    const [formDataProject, setFormDataProject] = useState(initialFormData);
    const [preview, setPreview] = useState(null);
    const modalRef = useRef();
    // Khi Duy truyền 'project' từ Component cha vào, useEffect này sẽ tự động điền dữ liệu
    useEffect(()=>{
        if(project){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormDataProject(project); // Điền dữ liệu vào form khi 'project' thay đổi
            setPreview(project.ImageUrl);

        }else{
            setFormDataProject(initialFormData); // Reset form khi không có 'project' (tức là khi mở form để tạo mới)
            setPreview(null);
        }
    }, [project, isModalOpen]);

    // Hàm xử lý khi người dùng thay đổi giá trị trong form
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormDataProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm xử lý khi người dùng chọn file ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormDataProject(prev => ({ ...prev, ImageUrl: file })); // Lưu FILE để gửi cho Multer
            setPreview(URL.createObjectURL(file)); // Tạo link tạm để xem trước
        }
    };
    
    // Hàm xử lý khi người dùng submit form
    const handleSubmitProject=async(e)=>{
        e.preventDefault();

        // Dùng FormData vì có gửi FILE
        const data = new FormData();
        data.append("Title", formDataProject.Title);
        data.append("Category", formDataProject.Category);
        data.append("LinkDemo", formDataProject.LinkDemo);
        data.append("LinkGithub", formDataProject.LinkGithub);

        // Chỉ append ảnh nếu người dùng có chọn ảnh mới
        if (formDataProject.ImageUrl instanceof File) {
            data.append("ImageUrl", formDataProject.ImageUrl);
        }

        try{
            if(project?.Id){
                // Nếu có Id thì gọi API update
                await portfolioServices.updateProject(project.Id, data);
                alert("Project updated successfully!");
            }else{
                // Nếu không có Id thì gọi API create
                await portfolioServices.createProject(data);
                alert("Project created successfully!");
            }
            setFormDataProject(initialFormData); // Reset form sau khi submit thành công
            await refreshData(); // Làm mới dữ liệu sau khi cập nhật
            setIsModalOpen(false); // Đóng modal sau khi submit
        } catch (error) {
            console.error("Error submitting project:", error);
            alert("An error occurred while submitting the project.");
        }
    }
    // Nếu modal không mở, không render gì cả
    if(!isModalOpen) return null;

    return(
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div ref={modalRef} className="bg-[#1e1e1f] border border-[#383838] rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
                
                {/* Nút đóng */}
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-[#ffdb70]"
                >
                    <IconRender iconName="FaTimes" />
                </button>

                <h2 className="text-[#ffdb70] text-xl font-bold mb-6">
                    {project ? "Update Project" : "Add New Project"}
                </h2>

                <form onSubmit={handleSubmitProject} className="space-y-4">
                    {/* Phần chọn ảnh */}
                    <div className="flex flex-col items-center p-4 border-2 border-dashed border-[#383838] rounded-xl bg-[#2b2b2c]">
                        {preview && <img src={preview} alt="preview" className="h-32 mb-2 rounded-lg object-cover" />}
                        <input type="file" onChange={handleImageChange} className="text-xs text-gray-400 file:bg-[#ffdb70] file:border-none file:rounded file:px-2 file:py-1 file:mr-2 cursor-pointer" />
                    </div>

                    <input name="Title" value={formDataProject.Title} onChange={handleChange} placeholder="Project Title" className="w-full bg-[#1e1e1f] border border-[#383838] rounded-lg p-3 text-white outline-none focus:border-[#ffdb70]" required />

                    <select name="Category" value={formDataProject.Category} onChange={handleChange} className="w-full bg-[#1e1e1f] border border-[#383838] rounded-lg p-3 text-white outline-none focus:border-[#ffdb70]">
                        <option value="Web Design">Web Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Applications">Applications</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="LinkDemo" value={formDataProject.LinkDemo} onChange={handleChange} placeholder="Demo URL" className="bg-[#1e1e1f] border border-[#383838] rounded-lg p-3 text-white outline-none focus:border-[#ffdb70]" />
                        <input name="LinkGithub" value={formDataProject.LinkGithub} onChange={handleChange} placeholder="Github URL" className="bg-[#1e1e1f] border border-[#383838] rounded-lg p-3 text-white outline-none focus:border-[#ffdb70]" />
                    </div>

                    <button type="submit" className="w-full bg-[#ffdb70] text-black font-bold py-3 rounded-xl hover:bg-[#e6c565] transition-colors">
                        {project ? "Save Changes" : "Create Project"}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default FormProject;