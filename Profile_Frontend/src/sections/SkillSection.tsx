import React, { use, useEffect, useState } from "react";
import '../styles/Skills.css';
import { FaCode, FaServer, FaTools, FaDatabase, FaLayerGroup } from "react-icons/fa";


interface skill{
    Id: number;
    Name: String;
    Category: String;
    Level: number;
    Description: String;
    IsVisible: boolean;
}

const getCategoryIcon = (categroy: string)=>{
    switch( categroy?.toLowerCase()){
        case "fontend": return <FaCode className="skill-cat-icon" />;
        case "backend": return <FaServer className="skill-cat-icon" />;
        case "database": return <FaDatabase className="skill-cat-icon" />;
        case "tools": return <FaTools className="skill-cat-icon" />;
        default: return <FaLayerGroup className="skill-cat-icon" />;
    }
}


export default function SkillSection(){
    const [skills, setSkills]= useState<skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchSkills = async()=>{
            try{
                const response= await fetch('http://localhost:5000/api/skills');
                if( !response.ok){
                    throw new Error(`Lỗi tải dữ liệu: ${response.statusText}`);
                }
                const data= await response.json();
                setSkills(data || []);
            }
            catch(error: any){
                console.error('Error fetching skills:', error);
                setError(error.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchSkills();
    }, []);
    if(loading){
        return (
            <section className="skills" id="skills">
                <div className="container loading-wrap">
                    <p>Loading...</p>
                </div>
            </section>
        );
    }
    if(error){
        return (
            <section className="skills" id="skills">
                <div className="container error-wrap">
                    <p>Error: {error}</p>
                </div>
            </section>
        );
    }
    //Gộp bởi Category
    const groupedSkills= skills.reduce((acc, skill)=>{
        const cat = skill.Category || "Other";
        if(!acc[cat] ){
            acc[cat] = [];
        }
        acc[cat].push(skill);
        return acc;
    }, {} as Record<string, skill[]>);
    

    return (
        <section className="skills" id="skills">
            <div className="container">
                <div className="skills-head">
                    <h2 className="container-title">My Skills</h2>
                    <p className="container-intro">
                        Here are some of the technologies, tools, and languages I use to build my projects.
                    </p>
                </div>
                
                <div className="skills-grid"> 
                    {Object.keys(groupedSkills).map((category)=>(
                        <div key={category} className="skill-category-card" >
                            <div className="skill-category-header">
                                {getCategoryIcon(category)}    
                                <h3 className="skill-category-title">{category}</h3>
                            </div>
                            <div className="skills-list">
                                {groupedSkills[category].map((skill) => (
                                    <div key={skill.Id} className="skill-item">
                                        <div className="skill-info">
                                            <span className="skill-name">{skill.Name}</span>
                                        </div>
                                        <div className="skill-bar-bg">
                                            <div 
                                                className="skill-bar-fill" 
                                                style={{ width: `${Math.min(100, Math.max(0, skill.Level * 10))}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}


                </div>
            </div>
        </section>
    )
}




