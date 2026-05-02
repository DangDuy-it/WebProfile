import IconRender from "../constants/icons";

const ProjectCard = ({project}) => {
    return (
        // Card Container
        <div className="group rounded-lg overflow-hidden">
            {/* Project Image */}
            <div className="overflow-hidden relative rounded-lg">
                <img 
                    src={project.ImageUrl} 
                    alt={project.Title} 
                    className=" group-hover:opacity-50 group-hover:scale-110 transition-all duration-300 " 
                />
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    {/* Icon Container */}
                    <div className="relative z-10 p-2 bg-[#383838] rounded-lg text-sm shadow-xl duration-300 transition-transform transform">
                        <IconRender iconName="FaRegEye" className="text-[#ffdb70]" />
                    </div>
                    {/* Link to Demo/Github */}
                    <a 
                        href={project.LinkDemo || project.LinkGithub || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="absolute inset-0 z-20"
                    ></a>
                </button>
            </div>
            {/* Project Details */}
            <h3 className="text-left p-2 text-gray-300 text-xs font-bold">{project.Title}</h3>
            {/* <p>{project.Description}</p>
            <p><strong>Category:</strong> {project.Category}</p> */}
        </div>
    );
};
export default ProjectCard;