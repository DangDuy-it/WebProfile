import { useState, useEffect, useRef } from "react";
import { profileServices } from "../services/profileServices";
import Loading from "../components/Loading";
import Error from "../components/Error";
import IconRender from "../constants/icons";
import FormHighlight from "../components/FormHighlight";
import FormSkill from "../components/FormSkill";

const AdminAbout = () => {
    const [aboutInfo, setAboutInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    const introRef = useRef(null);
    const bodyRef = useRef(null);

    // Hàm gộp chung cực kỳ gọn
    const autoResize = (ref) => {
        if (ref && ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    // const API_URL = import.meta.env.VITE_API_URL;


    // Update About form state
    const [formAbout, setFormAbout] = useState({
        Intro: aboutInfo?.Intro || "",
        Body: aboutInfo?.Body || "",
    });

    useEffect(()=>{
        // Dùng setTimeout để đảm bảo content thực sự đã render ra DOM rồi mới tính scrollHeight
        setTimeout(() => {
            [introRef, bodyRef].forEach(autoResize);
        }, 0);
    }, [formAbout.Intro, formAbout.Body]);

    // Update form state when aboutInfo changes
    useEffect(()=>{
        if(aboutInfo){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormAbout({
                Intro: aboutInfo.Intro,
                Body: aboutInfo.Body,
            });
        }
    }, [aboutInfo]);
    
    // Handle cancel edit
    const handleCancelEdit=()=>{
        setFormAbout({
            Intro: aboutInfo.Intro,
            Body: aboutInfo.Body,
        });
    }

    // Handle form input changes
    const handleChangeAbout=(e)=>{
        const { name, value } = e.target;
        setFormAbout(prev => ({ ...prev, [name]: value }));
    }

    // Handle form submission
    const handleSubmitAbout= async(e)=>{
        e.preventDefault();
        try{
            
            const profileId = aboutInfo?.Id;
            if (!profileId) return;
            await profileServices.updateAbout(aboutInfo?.Id, formAbout);
            alert("About information updated successfully!");

            // Refetch about data after update
            const data = await profileServices.getAboutData();
            setAboutInfo(data);
        }catch(err){
            alert("Failed to update about information: " + err.message);
        }
    }
    // Mỗi khi biến profile từ props thay đổi, cập nhật lại formDataInfo
    useEffect(()=>{
        if(aboutInfo){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormAbout({
                Intro: aboutInfo.Intro,
                Body: aboutInfo.Body,
            });
        }
    }, [aboutInfo]);


    // Fetch about data function
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
    // Fetch about data on component mount
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAboutData();
    }, []);


    // Insert About Highlight form states
    const [isFormHighlight, setIsFormHighlight] = useState(false);
    const [seletedHighlight, setSelectedHighlight] = useState(null);
    // Handle add new highlight
    const handleAddHighlight=()=>{
        setSelectedHighlight(null);
        setIsFormHighlight(true);
    }
    // Handle edit highlight
    const handleEditHighlight=(highlight)=>{
        setSelectedHighlight(highlight);
        setIsFormHighlight(true);
    }
    // Handle delete highlight
    const handleDeleteHighlight= async (Id)=>{
        if(window.confirm("Are you sure you want to delete this highlight?")){
            try{ 
                await profileServices.deleteAboutHighlight(Id);
                alert("Highlight deleted successfully!");
                await fetchAboutData(); // Refetch data after deletion
            }catch(err){
                alert("Failed to delete highlight: " + err.message);
            }
        }
    }

    const [isFormSkill, setIsFormSkill] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    // Handle add new skill
    const handleAddSkill=()=>{
        setSelectedSkill(null);
        setIsFormSkill(true);
    }
    // Handle edit skill
    const handleEditSkill=(skill)=>{
        setSelectedSkill(skill);
        setIsFormSkill(true);
    }
    // Handle delete skill
    const handleDeleteSkill= async (Id)=>{
        if(window.confirm("Are you sure you want to delete this skill?")){
            try{ 
                await profileServices.deleteSkill(Id);
                alert("Skill deleted successfully!");
                await fetchAboutData(); // Refetch data after deletion
            }catch(err){
                alert("Failed to delete skill: " + err.message);
            }
        }
    }

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
    

    if (loading) return (<Loading />);
    
    if (error) return <Error message={error} />;
    
    return (
        <section className="mt-10 w-full">
            {/* Intro */}
            <form onSubmit={handleSubmitAbout} >
                <header className="mb-4 text-gray-300 text-sm leading-relaxed text-start">
                    {/* Intro */}
                    <textarea 
                        ref={introRef}
                        name="Intro"
                        value={formAbout.Intro} 
                        onChange={(e)=>{
                            handleChangeAbout(e);
                            autoResize(introRef);
                        }}
                        className="w-full bg-transparent outline-none resize-none overflow-hidden block "
      
                        >
                    </textarea>
                    {/* Body */}
                    <textarea 
                        ref={bodyRef}
                        name="Body" 
                        value={formAbout.Body} 
                        onChange={(e)=>{
                            handleChangeAbout(e);
                            autoResize(bodyRef);
                        }}
                        className="w-full bg-transparent outline-none resize-none overflow-hidden block"
                        >             
                    </textarea>
                </header>
                <div className="flex justify-end gap-2 mr-10"> 
                    <button type="button" onClick={handleCancelEdit} className="bg-gray-600 text-sm px-3 px-3 font-bold rounded hover:bg-[#383838] hover:text-[#ffdb70] transition-colors duration-300">Cancel</button>
                    <button type="submit" className="text-sm font-bold text-gray-800 px-3 px-3 bg-[#ffdb70]  rounded hover:bg-[#383838] hover:text-[#ffdb70] transition-colors duration-300">Save</button>
                </div>
            </form>

                        
            {/* Highlight */}
            <div className="text-start mb-6 w-full">
                <div className="flex  items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Quick Facts</h3>
                    <button 
                        onClick={handleAddHighlight} 
                        className="px-2 text-gray-400 hover:text-[#ffdb70] transition-all duration-300 hover:rotate-90"
                        >
                        <IconRender iconName="RiAddLine" className="text-2xl" />
                    </button>
                </div>
                <ul className="grid grid-cols-1 gap-4 text-sm text-gray-300 border-2 border-[#1e1e1f] p-4 rounded-lg bg-[#222224] shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300">
                    {aboutInfo?.AboutHighlight?.map((item)=>(
                        <li key={item.Id} className="flex items-center text-gray-300 overflow-hidden group">
                            {/* Edit button */}
                            <div className="flex items-center gap-2 mr-4 relative group">
                                <div className="transition-all duration-300 transform  group-hover:opacity-0">
                                    <IconRender iconName={item.Icon} className="text-xl text-[#ffdb70]" />

                                </div>
                                <button onClick={()=>handleEditHighlight(item)} className="absolute transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <IconRender iconName="RiEditLine" className="text-lg text-[#ffdb70]" />
                                    
                                </button>
                            </div>
                            <span className="font-medium text-white mr-2 whitespace-nowrap flex-shrink-0">{item.Name}:</span>
                            <span className="truncate flex-1 min-w-0">{item.Description}</span>

                            {/* Delete button */}
                            <button onClick={() => handleDeleteHighlight(item.Id)} className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-colors">
                                <IconRender iconName="RiDeleteBinLine" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Skills */}
            <div className="text-start mb-6 w-full">
                {/* Add Skill Button */}
                <div className="flex  items-center mb-4"> 
                    <h3 className="text-xl font-bold text-white">My Skills</h3>
                    <button 
                        onClick={handleAddSkill} 
                        className="flex px-2 items-center gap-2 text-gray-400 hover:text-[#ffdb70] transition-all duration-300 hover:rotate-90"
                        >
                        <IconRender iconName="RiAddLine" className="text-2xl" />
                    </button>
                </div>
                {/* Skill List */}
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Frontend Skills */}
                    <li className="group/card relative bg-[#222224] border-2 border-[#1e1e1f] p-4 rounded-lg shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300 mt-4 md:mt-0">
                        {/* Skill Category Header */}
                        <h4 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                     flex items-center gap-2 bg-[#222224] px-2 py-1 rounded-[10px] text-md font-bold text-[#ffdb70] border-2 border-[#1e1e1f] shadow-md
                                     group-hover/card:bg-[#ffdb70] group-hover/card:border-[#ffdb70] group-hover/card:text-gray-600 transition-colors duration-300">
                            <IconRender iconName={renderSkillIcon("Frontend")} /> Frontend
                        </h4>
                        {/* Skill Items */}
                        <div className="flex flex-col items-center w-full gap-2 mt-4">
                            {frontendSkills?.map((skill) => (
                                <div key={skill.Id} className="group grid grid-cols-[30px_1fr_auto] gap-4 items-center text-gray-300 my-2 w-full max-w-[180px]">
                                    {/* Skill Icon */}
                                    <div className="flex items-center gap-2 mr-4 relative group">
                                        {/* Skill Icon */}
                                        <div className="transition-all duration-300 transform  group-hover:opacity-0">
                                            <IconRender iconName={skill.Icon} className="flex justify-center text-[#ffdb70] text-xl" /> 
                                        </div>
                                        {/* Edit button */}
                                        <button onClick={()=>handleEditSkill(skill)} className="absolute transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <IconRender iconName="RiEditLine" className="text-lg text-[#ffdb70]" />
                                        </button>
                                    </div>
                                    {/* Skill Name */}
                                    <p className="text-sm group-hover:text-white transition-colors">{skill.Name}</p>
                                    {/* Delete button */}
                                    <button onClick={() => handleDeleteSkill(skill.Id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-colors">
                                        <IconRender iconName="RiDeleteBinLine" />
                                    </button>
                                </div>
                                
                            ))}
                        </div>
                    </li>
                    {/* Backend Skills */}
                    <li className="group/card relative bg-[#222224] border-2 border-[#1e1e1f] p-4 rounded-lg shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300 mt-4 md:mt-0">
                        {/* Backend Skills Header */}
                        <h4 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                     flex items-center gap-2 bg-[#222224] px-2 py-1 rounded-[10px] text-md font-bold text-[#ffdb70] border-2 border-[#1e1e1f] shadow-md
                                     group-hover/card:bg-[#ffdb70] group-hover/card:border-[#ffdb70] group-hover/card:text-gray-600 transition-colors duration-300">
                            <IconRender iconName={renderSkillIcon("Backend")} /> Backend
                        </h4>
                        {/* Backend Skills Items */}
                        <div className="flex flex-col items-center w-full gap-2 mt-4">
                            {backendSkills?.map((skill) => (
                                <div key={skill.Id} className="group grid grid-cols-[30px_1fr_auto] gap-4 items-center text-gray-300 my-2 w-full max-w-[180px]">
                                    {/* Skill Icon */}
                                    <div className="flex items-center gap-2 mr-4 relative group">
                                        {/* Skill Icon */}
                                        <div className="transition-all duration-300 transform  group-hover:opacity-0">
                                            <IconRender iconName={skill.Icon} className="flex justify-center text-[#ffdb70] text-xl" /> 
                                        </div>
                                        {/* Edit button */}
                                        <button onClick={()=>handleEditSkill(skill)} className="absolute transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <IconRender iconName="RiEditLine" className="text-lg text-[#ffdb70]" />
                                        </button>
                                    </div>
                                    {/* Skill Name */}
                                    <p className="text-sm group-hover:text-white transition-colors">{skill.Name}</p>
                                    {/* Delete button */}
                                    <button onClick={() => handleDeleteSkill(skill.Id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-colors">
                                        <IconRender iconName="RiDeleteBinLine" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </li>
                    {/* Tool Skills */}
                    <li className="group/card relative bg-[#222224] border-2 border-[#1e1e1f] p-4 rounded-lg shadow-md hover:bg-[#2a2a2c] hover:border-[#ffdb70] transition-colors duration-300 mt-4 md:mt-0">
                        {/* Tool Skills Header */}
                        <h4 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                     flex items-center gap-2 bg-[#222224] px-2 py-1 rounded-[10px] text-md font-bold text-[#ffdb70] border-2 border-[#1e1e1f] shadow-md
                                     group-hover/card:bg-[#ffdb70] group-hover/card:border-[#ffdb70] group-hover/card:text-gray-600 transition-colors duration-300">
                            <IconRender iconName={renderSkillIcon("Tool")} /> Tool
                        </h4>
                        {/* Tool Skills Items */}
                        <div className="flex flex-col items-center w-full gap-2 mt-4">
                            {toolSkills?.map((skill) => (
                                <div key={skill.Id} className="group grid grid-cols-[30px_1fr_auto] gap-4 items-center text-gray-300 my-2 w-full max-w-[180px]">
                                    {/* Skill Icon */}
                                    <div className="flex items-center gap-2 mr-4 relative group">
                                        {/* Skill Icon */}
                                        <div className="transition-all duration-300 transform  group-hover:opacity-0">
                                            <IconRender iconName={skill.Icon} className="flex justify-center text-[#ffdb70] text-xl" /> 
                                        </div>
                                        {/* Edit button */}
                                        <button onClick={()=>handleEditSkill(skill)} className="absolute transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <IconRender iconName="RiEditLine" className="text-lg text-[#ffdb70]" />
                                        </button>
                                    </div>
                                    {/* Skill Name */}
                                    <p className="text-sm group-hover:text-white transition-colors">{skill.Name}</p>
                                    {/* Delete button */}
                                    <button onClick={() => handleDeleteSkill(skill.Id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-colors">
                                        <IconRender iconName="RiDeleteBinLine" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>

            <FormHighlight 
                highlight={seletedHighlight}   
                isModalOpen={isFormHighlight} 
                setIsModalOpen={setIsFormHighlight} 
                refreshData={fetchAboutData} 
            />    
            <FormSkill 
                skill={selectedSkill}   
                isModalOpen={isFormSkill} 
                setIsModalOpen={setIsFormSkill} 
                refreshSkills={fetchAboutData} 
            />

        </section>
    )
}
export default AdminAbout;