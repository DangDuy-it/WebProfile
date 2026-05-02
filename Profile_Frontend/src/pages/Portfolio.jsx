import { useState, useEffect, useMemo } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import PaginationUI from "../components/PaginationUI";
import ProjectCard from "../components/ProjectCard";
import usePagination from "../hooks/usePagination";
import IconRender from "../constants/icons";
import { portfolioServices } from "../services/portfolioServices";

const Portfolio = () => {
    const [portfolioInfo, setPortfolioInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [isOpen, setIsOpen] = useState(false);
    
    
    const filteredProjects = useMemo(() => {
        if (!portfolioInfo) return [];
        return activeCategory === "All" 
        ? portfolioInfo 
        : portfolioInfo.filter(item => item.Category === activeCategory);
    }, [portfolioInfo, activeCategory]);
    const { currentData, totalPages, currentPage, goToPage } = usePagination(filteredProjects || []);

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
                {/* {projectsByCategory?.find(cat=>cat.category===activeCategory)?.projects.map((project)=>(
                    <ProjectCard key={project.Id} project={project} />
                ))} */}
                {currentData?.map((project)=>(
                    <ProjectCard key={project.Id} project={project} />
                ))}
            </div>
            {/* Hiển thị bộ nút phân trang */}
            {totalPages > 1 && (
                <PaginationUI 
                    totalPages={totalPages} 
                    currentPage={currentPage} 
                    onPageChange={goToPage} 
                />
            )}
        </section>
    )
}
export default Portfolio;

