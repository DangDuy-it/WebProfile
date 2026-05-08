import {useState, useEffect, useRef} from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import IconRender from "../constants/icons";
import { resumeServices } from "../services/resumeServices";
import FormAddTimeline from "../components/FormAddTimeline";

const Resume = () => {
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResumeData= async()=>{
        try{
            const data= await resumeServices.getResumeData();
            setResumeInfo(data);
            setLoading(false);
        }catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    const [showAddFormEdu, setShowAddFormEdu] = useState(false);
    const [showAddFormExp, setShowAddFormExp] = useState(false);

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchResumeData();
    }, []);

    const handleAddResume=async(newResume)=>{
        try{
            await resumeServices.createResumeData(newResume);
            alert("Resume added successfully");
            setShowAddFormEdu(false);
            setShowAddFormExp(false);
            await fetchResumeData();
        }catch (err) {
            alert("Failed to add resume: " + err.message);
        }
    };

    const handleUpdateResume=async(id, updatedResume)=>{
        try{
            await resumeServices.updateResumeData(id, updatedResume);
            alert("Resume updated successfully");
            await fetchResumeData();
        }catch (err) {
            alert("Failed to update resume: " + err.message);
        }
    };

    const handleDeleteResume=async(id)=>{
        try{
            await resumeServices.deleteResumeData(id);
            alert("Resume deleted successfully");
            await fetchResumeData();
        }catch (err) {
            alert("Failed to delete resume: " + err.message);
        }
    };

    const educationType= resumeInfo?.filter(resume=> resume.Type==="Education");
    const experienceType= resumeInfo?.filter(resume=> resume.Type==="Experience");

    if (loading) return ( <Loading /> );
    if (error) return <Error message={error} />;

    return (
        <section>
            {/* Education */}
            <div className="text-start mb-6 w-full">
                <div className="flex items-center gap-2 mb-4">
                    {/* Box chứa Icon */}
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#2b2b2b] shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/5">
                        <IconRender 
                        iconName="FaBookOpen" 
                        className="text-[#ffdb70] text-sm" 
                        />
                        <div className="absolute top-[100%] left-1/2 -translate-x-1/2 border-l-1 border-[#2b2b2b] h-full"></div>
                    </div>

                    <h2 className="text-xl font-bold text-white inline-block">Education</h2>
                    
                    <button className="px-2 text-gray-400 hover:text-[#ffdb70] transition-all duration-300 hover:rotate-90 " 
                            onClick={() => setShowAddFormEdu(!showAddFormEdu)}>
                        <IconRender iconName="FaPlus" className="text-sm" />
                    </button> 
                    
                         
                </div>

                <ul className="relative lg:ml-[9px] ml-[7px]">
                    {educationType?.map((item, index)=>(
                        <TimelineItem key={item.OrderIndex} 
                                    item={item} 
                                    isLast={!showAddFormEdu && index === educationType.length - 1} 
                                    onUpdate={handleUpdateResume}
                                    onDelete={handleDeleteResume}/>
                    ))}
                    {showAddFormEdu && (
                        <li className="flex items-start gap-4 mb-6 relative">
                            <div className="flex-shrink-0 w-4 flex flex-col items-center">
                               <div className="relative z-10 w-4 h-4 rounded-full bg-[#2B2B2C] flex items-center justify-center">
                                    <div className="w-2 h-2 bg-[#ffdb70] rounded-full shadow-[0_0_8px_#ffdb70]"></div>
                                </div>
                            </div>
                            <div className="text-gray-300 pr-6 w-full">
                                <FormAddTimeline type="Education" onAdd={handleAddResume} setIsModalOpen={setShowAddFormEdu} />
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            {/* Experience */}
            <div className="text-start mb-6 w-full relative">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#2b2b2b] shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/5">
                        <IconRender iconName="FaBriefcase" className="text-[#ffdb70] text-sm " />
                        <div className="absolute top-[100%] left-1/2 -translate-x-1/2 border-l-1 border-[#2b2b2b] h-full"></div>
                    </div>
                    <h2 className="text-xl font-bold text-white inline-block">Experience</h2>
                    
                    <button className="px-2 text-gray-400 hover:text-[#ffdb70] transition-all duration-300 hover:rotate-90 " 
                            onClick={() => setShowAddFormExp(!showAddFormExp)}>
                        <IconRender iconName="FaPlus" className="text-sm" />
                    </button> 
                </div>

                <ul className="relative lg:ml-[9px] ml-[7px]">
                    {experienceType?.map((item, index)=>(
                        <TimelineItem key={item.OrderIndex} 
                                    item={item} 
                                    isLast={!showAddFormExp && index === experienceType.length - 1} 
                                    onUpdate={handleUpdateResume}
                                    onDelete={handleDeleteResume}
                        />
                    ))}
                    {showAddFormExp && (
                        <li className="flex items-start gap-4 mb-6 relative">
                            <div className="flex-shrink-0 w-4 flex flex-col items-center">
                               <div className="relative z-10 w-4 h-4 rounded-full bg-[#2B2B2C] flex items-center justify-center">
                                    <div className="w-2 h-2 bg-[#ffdb70] rounded-full shadow-[0_0_8px_#ffdb70]"></div>
                                </div>
                            </div>
                            <div className="text-gray-300 pr-6 w-full">
                                <FormAddTimeline type="Experience" onAdd={handleAddResume} setIsModalOpen={setShowAddFormExp} />
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}
export default Resume;

const TimelineItem = ({ item, isLast, onUpdate, onDelete }) => {
    // State cục bộ để quản lý việc chỉnh sửa
    const [editForm, setEditForm] = useState({ ...item });

    const descriptionRef = useRef(null);

    const autoResize = (ref) => {
        if (ref && ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };
    // Cập nhật lại form nếu dữ liệu từ cha (database) thay đổi
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEditForm({ ...item });
    }, [item]);

    useEffect(() => {
        autoResize(descriptionRef);
    }, [editForm.Description]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    // Hàm Hủy: Trả về dữ liệu ban đầu của item đó
    const handleCancel = () => {
        setEditForm({ ...item });
    };

    return (
        <li className="flex items-start gap-4 mb-8 relative group">
            <div className="flex-shrink-0 w-4 flex flex-col items-center">
                {/* Container chính cho Dot/Trash */}
                <div className="group relative z-10 w-4 h-4 mt-1 flex items-center justify-center">
                    
                    {/* Dấu chấm */}
                    <div className="w-2 h-2 bg-[#ffdb70] rounded-full shadow-[0_0_8px_#ffdb70] transition-all duration-300 group-hover:scale-0 group-hover:opacity-0"></div>
                    
                    {/* Nút xóa */}
                    <button 
                        onClick={() => onDelete(item.Id)} 
                        className="absolute inset-0 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-110 transition-all duration-300 z-20"
                        title="Delete item"
                    >
                        <IconRender iconName="FaTrashAlt" className="text-[12px]" />
                    </button>

                </div>

                {/* Đường kẻ dọc nối các mục */}
                {!isLast && (
                    <div className="absolute top-5 left-[8px] -translate-x-1/2 border-l border-[#383838] h-[calc(100%+1.5rem)]"></div>
                )}
            </div>

            <div className="text-gray-300 pr-6 w-full">
                <input
                    name="Title"
                    value={editForm.Title}
                    onChange={handleChange}
                    className="text-sm text-gray-100 font-bold outline-none border-b border-transparent focus:border-[#ffdb70] w-full"
                />
                <input
                    name="Duration"
                    value={editForm.Duration}
                    onChange={handleChange}
                    className="text-sm text-[#C8A854] font-bold outline-none border-b border-transparent focus:border-[#ffdb70] w-full"
                />
                <textarea
                    ref={descriptionRef}
                    name="Description"
                    value={editForm.Description}
                    onChange={e => {
                        handleChange(e);
                        autoResize(descriptionRef);
                    }}
                    rows={2}
                    className="text-sm outline-none text-gray-300 pr-6 w-full resize-none border-b border-transparent focus:border-[#ffdb70]"
                />
                
                {/* Thanh công cụ xuất hiện khi hover hoặc khi dữ liệu bị thay đổi */}
                <div className="flex justify-end gap-3 mt-2">
                    
                    <button 
                        onClick={handleCancel} 
                        className="text-gray-400 text-xs hover:text-white"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onUpdate(item.Id,editForm)} 
                        className="text-[#ffdb70] text-xs font-bold hover:scale-105 transition-transform"
                    >
                        Save
                    </button>
                </div>
            </div>
        </li>
    );
};
