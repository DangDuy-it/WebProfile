import '../styles/About.css';
import {FaSun, FaMoon} from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function AboutSection() {
    interface AboutDataType{
        title: string;
        intro: string;
        body: string;
        avtDarkImage: string;
        avtLightImage: string;
        university: string;
        major: string;
        focus: string;
        goal: string;
        fact: string;
    }

    const [AboutData, setAboutData]= useState<AboutDataType | null>(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState<string | null>(null);

    useEffect(() => {
        const fetchAboutData= async ()=>{
            try{
                const response= await fetch('http://localhost:5000/api/about');

                if(!response.ok){
                    throw new Error(`Lỗi tải dữ liệu: ${response.statusText}`);
                }
                const data= await response.json();
                setAboutData(data[0]);
            } catch(err:any){
                console.error('Error fetching about data:', err);
                setError(err.message);
            } finally{
                setLoading(false);
            }
        };
        fetchAboutData();
    },[]);

    // Scroll to section function
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading){
        return(
        <section className="about" id="about">
            <div className="container loading-wrap">
            <p>Loading...</p>
            </div>
        </section>
        )
    }

    if(error){
        return(
        <section className="about" id="about">
            <div className="container error-wrap">
            <p>Error: {error}</p>
            </div>
        </section>
        )
    }

    return(
        <section className='about' id='about'>
            <h2 className='about-title'>About Me</h2>
            <div className="container about-grid">
                <div className="about-text-wrap">
                    <p className='about-badge'>
                        {AboutData?.title}
                    </p>
                    <p className="about-intro">
                        {AboutData?.intro}
                    </p>
                    <p className="about-body">
                        {AboutData?.body}
                    </p>
                    <ul className="about-highlights">
                        <li>
                            <span className='highlight-icon'>
                                <FaSun className='sun-icon'></FaSun>
                                <FaMoon className='moon-icon'></FaMoon>
                            </span>
                            <strong>University:</strong> {AboutData?.university}</li>
                        <li>
                            <span className='highlight-icon'>
                                <FaSun className='sun-icon'></FaSun>
                                <FaMoon className='moon-icon'></FaMoon>
                            </span>
                            <strong>Major:</strong> {AboutData?.major}</li>
                        <li>
                            <span className='highlight-icon'>
                                <FaSun className='sun-icon'></FaSun>
                                <FaMoon className='moon-icon'></FaMoon>
                            </span>
                            <strong>Current Focus:</strong> {AboutData?.focus}</li>
                        <li>
                            <span className='highlight-icon'>
                                <FaSun className='sun-icon'></FaSun>
                                <FaMoon className='moon-icon'></FaMoon>
                            </span>
                            <strong>Goal:</strong> {AboutData?.goal}</li>
                        <li>
                            <span className='highlight-icon'>
                                <FaSun className='sun-icon'></FaSun>
                                <FaMoon className='moon-icon'></FaMoon>
                            </span>
                            <strong>Fun fact:</strong> {AboutData?.fact}</li>
                    </ul>
                    <div className="btn-group">
                        <button onClick={() => scrollToSection('projects')} className="btn primary">View Projects</button>
                        <button onClick={() => scrollToSection('contact')} className="btn">Contact Me</button>
                    </div>
                </div>
                <div className="about-image-wrap">
                    <div className="hero-img-container">
                        <div className="hero-img-main hero-img-card">
                        <img 
                            src={AboutData?.avtDarkImage}
                            alt="Dang Duy - Developer" 
                            className='hero-img hero-img-dark'
                            />
                        </div>

                        <div className="hero-img-main hero-img-card">
                        <img 
                            src={AboutData?.avtLightImage}
                            alt="Dang Duy - Developer" 
                            className='hero-img hero-img-light'
                        />
                        </div>
                        
                        <div className="hero-img-layer1"></div>
                        <div className="hero-img-layer2"></div>
                        <div className="hero-img-frame"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
