import React, { useEffect, useState } from "react";
import '../styles/Skills.css';
import { FaCode, FaServer, FaTools, FaDatabase, FaLayerGroup } from "react-icons/fa";

interface Skill {
    Id: number;
    Name: string;
    Category: string;
    Level: number;
    Description: string;
    IsVisible: boolean;
}

const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
        case "frontend": return <FaCode className="skill-cat-icon" />;
        case "backend": return <FaServer className="skill-cat-icon" />;
        case "database": return <FaDatabase className="skill-cat-icon" />;
        case "tools": return <FaTools className="skill-cat-icon" />;
        default: return <FaLayerGroup className="skill-cat-icon" />;
    }
};

export default function SkillSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/skills');
                if (!response.ok) {
                    throw new Error(`Lá»—i táº£i dá»¯ liá»‡u: ${response.statusText}`);
                }
                const data = await response.json();
                setSkills(data || []);
            } catch (err: any) {
                console.error('Error fetching skills:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) {
        return (
            <section className="skills" id="skills">
                <div className="container loading-wrap">
                    <p>Loading...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="skills" id="skills">
                <div className="container error-wrap">
                    <p>Error: {error}</p>
                </div>
            </section>
        );
    }

    // Gá»™p bá»Ÿi Category
    const groupedSkills = skills.reduce((acc, skill) => {
        const cat = skill.Category || "Other";
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

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
                    {Object.keys(groupedSkills).map((category) => (
                        <div key={category} className="skill-category-card">
                            <div className="skill-category-header">
                                {getCategoryIcon(category)}
                                <h3 className="skill-category-title">{category}</h3>
                            </div>
                            <div className="skills-list">
                                {groupedSkills[category].map((skill) => (
                                    <div key={skill.Id} className="skill-item">
                                        <div className="skill-info">
                                            <span className="skill-name">{skill.Name}</span>
                                            {/* Optional: Show percentage value
                                                <span className="skill-percentage">{skill.Level * 10}%</span>
                                            */}
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
    );
}
