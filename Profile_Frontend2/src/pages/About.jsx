import { useState, useEffect } from "react";
import { profileServices } from "../services/profileServices";
import IconRender from "../constants/icons";


const About = () => {
    
    const [aboutInfo, setAboutInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchAboutData= async()=>{
            try{
                const data = await profileServices.getAboutData();
                setAboutInfo(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchAboutData();
    }, []);
    // Category Skill ( Frontend, Backend, Tool)
    const frontendSkills= aboutInfo?.Skill?.filter(skill=> skill.Category==="Frontend");
    const backendSkills= aboutInfo?.Skill?.filter(skill=> skill.Category==="Backend");
    const toolSkills= aboutInfo?.Skill?.filter(skill=> skill.Category==="Tool");

    const renderSkillIcon= (skillName)=>{
        const iconMap={
            "Frontend": "FaCode",
            "Backend": "FaServer",
            "Database": "DiMsqlServer",
            "Tool": "FaTools"
        }
        return iconMap[skillName] || "FaQuestion";
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffdb70]"></div>
        </div>
    );
    
    if (error) return <div className="text-red-500 p-5 text-center">Error: {error}</div>;
    
    return (
        <section className="mt-10 w-full">
            {/* Intro */}
            <header className="mb-4 text-gray-300 text-sm leading-relaxed text-start ">
                {/* <p>{aboutInfo?.Description}</p> */}
                <p className="mb-4">{aboutInfo?.Intro}</p>
                <p>{aboutInfo?.Body}</p>
            </header>
                        
            {/* Highlight */}
            <div className="text-start mb-6 w-full">
                <h3 className="text-xl font-bold text-white mb-4">Quick Facts</h3>
                <ul className="grid grid-cols-1 gap-4 text-gray-300 border-2 border-[#1e1e1f] p-4 rounded-lg bg-[#222224] shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300">
                    {aboutInfo?.AboutHighlight?.map((item)=>(
                        <li key={item.Id} className="flex items-center text-gray-300 overflow-hidden">
                            <IconRender iconName={item.Icon} className="mr-2 text-[#ffdb70] text-xl flex-shrink-0" />
                            <span className="font-medium text-white mr-2 whitespace-nowrap flex-shrink-0">{item.Name}:</span>
                            <span className="truncate flex-1 min-w-0">{item.Description}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Skills */}
            <div className="mb-6 w-full w-full">
                <h3 className="text-start text-xl font-bold text-white mb-6">My Skills</h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <li className="group relative bg-[#222224] border-2 border-[#1e1e1f] p-4 rounded-lg shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300 mt-4 md:mt-0">
                        <h4 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                     flex items-center gap-2 bg-[#222224] px-2 py-1 rounded-[10px] text-md font-bold text-[#ffdb70] border-2 border-[#1e1e1f] shadow-md
                                     group-hover:bg-[#ffdb70] group-hover:border-[#ffdb70] group-hover:text-gray-600 transition-colors duration-300">
                            <IconRender iconName={renderSkillIcon("Frontend")} /> Frontend
                        </h4>
                        <div className="flex flex-col items-center w-full gap-2 mt-4">
                            {frontendSkills?.map((skill) => (
                                <div key={skill.Id} className="grid grid-cols-[30px_1fr] gap-4 items-center text-gray-300 my-2 w-full max-w-[180px]">
                                    <p><IconRender iconName={skill.Icon} className="flex justify-center text-[#ffdb70] text-xl" /> </p>
                                    <p className="text-sm group-hover:text-white transition-colors">{skill.Name}</p>
                                </div>
                                
                            ))}
                        </div>
                    </li>
                    <li className="group relative bg-[#222224] border-2 border-[#1e1e1f] p-4 rounded-lg shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300 mt-4 md:mt-0">
                        <h4 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                     flex items-center gap-2 bg-[#222224] px-2 py-1 rounded-[10px] text-md font-bold text-[#ffdb70] border-2 border-[#1e1e1f] shadow-md
                                     group-hover:bg-[#ffdb70] group-hover:border-[#ffdb70] group-hover:text-gray-600 transition-colors duration-300">
                            <IconRender iconName={renderSkillIcon("Backend")} /> Backend
                        </h4>
                        <div className="flex flex-col items-center w-full gap-2 mt-4">
                            {backendSkills?.map((skill) => (
                                <div key={skill.Id} className="grid grid-cols-[30px_1fr] gap-4 items-center text-gray-300 my-2 w-full max-w-[180px]">
                                    <p><IconRender iconName={skill.Icon} className="flex justify-center text-[#ffdb70] text-xl" /> </p>
                                    <p className="text-sm group-hover:text-white transition-colors">{skill.Name}</p>
                                </div>
                            ))}
                        </div>
                    </li>
                    <li className="group relative bg-[#222224] border-2 border-[#1e1e1f] p-4 rounded-lg shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300 mt-4 md:mt-0">
                        <h4 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                     flex items-center gap-2 bg-[#222224] px-2 py-1 rounded-[10px] text-md font-bold text-[#ffdb70] border-2 border-[#1e1e1f] shadow-md
                                     group-hover:bg-[#ffdb70] group-hover:border-[#ffdb70] group-hover:text-gray-600 transition-colors duration-300">
                            <IconRender iconName={renderSkillIcon("Tool")} /> Tools
                        </h4>
                        <div className="flex flex-col items-center w-full gap-2 mt-4">
                            {toolSkills?.map((skill) => (
                                <div key={skill.Id} className="grid grid-cols-[30px_1fr] gap-4 items-center text-gray-300 my-2 w-full max-w-[180px]">
                                    <p><IconRender iconName={skill.Icon} className="flex justify-center text-[#ffdb70] text-xl" /> </p>
                                    <p className="text-sm group-hover:text-white transition-colors">{skill.Name}</p>
                                </div>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>

        </section>
    )
}
export default About;