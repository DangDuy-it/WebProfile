import {useState, useEffect} from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import IconRender from "../constants/icons";
import { resumeServices } from "../services/resumeServices";

const Resume = () => {
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
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
        fetchResumeData();
    }, []);

    const educationType= resumeInfo?.filter(resume=> resume.Type==="Education");
    const experienceType= resumeInfo?.filter(resume=> resume.Type==="Experience");

    console.log(educationType);

    if (loading) return (
        <Loading />
    );
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
                    {/* <div className="bg-[#ffdb70] w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/5">
                        <img src="/assets/book.svg" alt="book" className="w-8 h-8 "/>
                    </div> */}
                    
                    <h2 className="text-xl font-bold text-white inline-block">Education</h2>
                </div>

                <ul className="relative lg:ml-[9px] ml-[7px]">
                    {educationType?.map((item, index)=>(
                        <TimelineItem key={item.OrderIndex} item={item} isLast={index === educationType.length - 1} />
                    ))}
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
                </div>

                <ul className="relative lg:ml-[9px] ml-[7px]">
                    {experienceType?.map((item, index)=>(
                        <TimelineItem key={item.OrderIndex} 
                                    item={item} 
                                    isLast={index=== experienceType.length-1} 
                        />
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Resume;

const TimelineItem =({item, isLast})=>(
    <li className="flex items-start gap-4 mb-6 relative">

        <div className="flex-shrink-0 w-4 flex flex-col items-center">
            {/* Dấu chấm */}
           <div className="relative z-10 w-4 h-4 rounded-full bg-[#2B2B2C] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#ffdb70] rounded-full shadow-[0_0_8px_#ffdb70]"></div>
            </div>
            
            {/* Đường kẻ dọc nối các mục */}
            {!isLast && <div className="absolute top-2 left-[9px] -translate-x-1/2 border-l-1 border-[#2b2b2b] md:h-[130%] h-[110%]"></div>}
        </div>


        
        <div className="text-gray-300 pr-6">
            <h3 className="text-sm text-gray-100 font-bold">{item.Title}</h3>
            <span className="text-sm text-[#C8A854] font-bold">{item.Duration}</span>
            <p className="text-sm">{item.Description}</p>
        </div>
    </li>
)
