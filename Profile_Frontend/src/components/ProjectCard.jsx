import IconRender from "../constants/icons";

const ProjectCard = ({project, onEdit, onDelete}) => {
    const API_URL = import.meta.env.VITE_API_URL;

    return (
        // Card Container
        <div className="group rounded-lg overflow-hidden items-center">
            {/* Project Image */}
            <div className="overflow-hidden relative rounded-lg">
                {/* 1. Hình ảnh dự án */}
                <img 
                    src={`${API_URL}${project.ImageUrl}`} 
                    alt={project.Title} 
                    className="group-hover:opacity-50 group-hover:scale-110 transition-all duration-300 " 
                />

                {/* 2. Lớp phủ đen khi hover (Overlay) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {/* Nút xem chi tiết (Mắt) */}
                    <a 
                        href={project.LinkDemo || project.LinkGithub || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 bg-[#383838] rounded-xl text-[#ffdb70] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#404040]"
                    >
                        <IconRender iconName="FaRegEye" className="text-xl" />
                    </a>
                </div>

                {/* 3. Nhóm nút Quản trị (Chỉ hiện khi có onEdit và onDelete) */}
                {(onEdit || onDelete) && (
                    <div className="absolute top-3 left-0 right-0 px-3 flex justify-between items-center z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        {/* Nút Sửa - Bên trái */}
                        {onEdit && (
                            <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(project); }}
                                className="p-2 bg-[#1e1e1f]/80 backdrop-blur-md rounded-lg text-gray-300 hover:text-[#ffdb70] border border-[#383838] transition-colors"
                                title="Edit Project"
                            >
                                <IconRender iconName="FaEdit" />
                            </button>
                        )}

                        {/* Nút Xóa - Bên phải */}
                        {onDelete && (
                            <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(project.Id); }}
                                className="p-2 bg-[#1e1e1f]/80 backdrop-blur-md rounded-lg text-gray-300 hover:text-red-500 border border-[#383838] transition-colors"
                                title="Delete Project"
                            >
                                <IconRender iconName="FaTrash" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            {/* Project Details */}
            <h3 className="text-left p-2 text-gray-300 text-xs font-bold">{project.Title}</h3>
            <p className="text-left p-2 text-gray-400 text-xs">{project.Category}</p>
        </div>
    );
};
export default ProjectCard;