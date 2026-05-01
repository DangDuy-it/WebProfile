import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import IconRender from "../constants/icons";
import { portfolioServices } from "../services/portfolioServices";

const Portfolio = () => {
    const [portfolioInfo, setPortfolioInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        const fetchPortfolioData= async()=>{
            try{
                const data = await portfolioServices.getPortfolioData();
                setPortfolioInfo(data);
                setLoading(false);
            }catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchPortfolioData();
    }, []);

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    //Filter data by category
    const categories= ["All",...new Set(portfolioInfo?.map(item=> item.Category))];
    const projectsByCategory= [
        { category: "All", projects: portfolioInfo },
        ...categories.map(category=> ({
            category,
            projects: portfolioInfo?.filter(item=> item.Category === category)
        }))
    ]
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setIsOpen(false); 
    };

    return (
        <section>
            {/* Category Filter */}
            <ul className="gap-4 mb-6 text-xs font-medium text-gray-500
                            hidden md:flex ">
                {categories?.map(category => (
                    <li key={category} >
                        <button onClick={() => handleCategoryClick(category)} className={`hover:text-[#ffdb70] transition-colors duration-300 active:text-[#ffdb70] ${activeCategory === category ? "text-[#ffdb70]" : ""}`}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
            {/* --- Filter cho Mobile (Ẩn trên md, hiện trên mobile) --- */}
            <div className="md:hidden relative mb-8 text-xs font-medium ">
                {/* Button  */}
                <button onClick={()=> setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-2 bg-[#1e1e1f] border border-[#383838] rounded-lg text-gray-500 mb-2">
                    <span>{activeCategory}</span>
                    <IconRender iconName={isOpen ? "FaChevronUp" : "FaChevronDown"} className="ml-2" />
                </button>
                {/* Dropdown */}
                {isOpen &&(
                    <ul className="border border-[#383838] rounded-lg py-2 absolute w-full bg-[#1e1e1f] z-10">
                        {categories?.map(category=>(
                           <li key={category} className="py-1 text-gray-500 " >
                                <button onClick={() => 
                                    handleCategoryClick(category)} 
                                    className="block w-full text-left px-4 px-2 hover:text-[#ffdb70] transition-colors duration-300 ">
                                    {category}
                                </button>
                            </li>  
                        ))}
                    </ul>
                )}
            </div>
    
            {/* Project List */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projectsByCategory?.find(cat=>cat.category===activeCategory)?.projects.map((project)=>(
                    <ProjectCard key={project.Id} project={project} />
                ))}
            </div>
        </section>
    )
}
export default Portfolio;

//Component con cho mỗi project
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