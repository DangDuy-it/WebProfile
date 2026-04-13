import '../styles/Home.css';
import { useState, useEffect } from 'react';

export default function HeroSection() {

  interface HomeDataType {
    badge: string;
    title: string;
    description: string;
    avtDarkImage: string;
    avtLightImage: string;
  }

  const [HomeData, setHomeData]= useState<HomeDataType | null>(null);
  const [loading, setLoading]= useState(true);
  const [error, setError]= useState<string | null>(null);
  
  useEffect(() => {
    const fetchHomeData= async () => {
      try{
        const response = await fetch('http://localhost:5000/api/home');

        if(!response.ok){
          throw new Error(`Lỗi tải dữ liệu: ${response.statusText}`);
        }
        const data = await response.json();
        setHomeData(data);
      }
      catch(err: any){
        console.error('Error fetching home data:', err);
        setError(err.message);
      } finally{
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading){
    return(
      <section className="hero" id="hero">
        <div className="container loading-wrap">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </section>
    )
  }

  if(error){
    return(
      <section className="hero" id="hero">
        <div className="container error-wrap">
          <p>Error: {error}</p>
        </div>
      </section>
    )
  }

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="container hero-grid">
        <div className="hero-text-wrap">
          <div className="hero-badge">{HomeData?.badge}</div>
          <h1 className="hero-title">{HomeData?.title}</h1>
          <p className="hero-desc">
           {HomeData?.description}
          </p>
          <div className="btn-group">
            <button onClick={() => scrollToSection('projects')} className="btn primary">View Projects</button>
            <button onClick={() => scrollToSection('contact')} className="btn">Contact Me</button>
          </div>
        </div>

        <div className="hero-img-wrap">
          <div className="hero-img-container">
            <div className="hero-img-main hero-img-card">
              <img 
                src={HomeData?.avtDarkImage} 
                alt="Dang Duy - Developer" 
                className='hero-img hero-img-dark'
              />
            </div>

            <div className="hero-img-main hero-img-card">
              <img 
                src={HomeData?.avtLightImage} 
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
  );
}
