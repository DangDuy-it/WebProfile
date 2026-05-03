import {useState, useEffect} from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import About from "../../pages/About";
import Resume from "../../pages/Resume";
import Portfolio from "../../pages/Portfolio";
import Contact from "../../pages/Contact";
import IconRender from "../../constants/icons";
import AudioPlayer from "../../hooks/AudioPlayer";
import { contactsServices } from "../../services/contactsServices";


const MainLayout = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [sidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const audioSrc = sidebarData?.AudioUrl ? `${API_URL}${sidebarData.AudioUrl}` : "";
  const [volume, setVolume, isNotPlaying] = AudioPlayer(audioSrc); // Truyền AudioSrc từ sidebarData vào hook AudioPlayer

  useEffect(()=>{
    const fetchContacts = async () => {
      try{
        const data= await contactsServices.getContacts();
        setSidebarData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

    if (loading) return (
        <Loading />
    );
    
    if (error) return <Error message={error} />;

  return (

   <main className="max-w-[1200px] mx-auto px-4 py-14 lg:flex lg:gap-6 items-start">
      
      {/* Truyền dữ liệu vào Sidebar:
          - profile: Lấy các thuộc tính Title, Badge, AvtDarkImage từ object gốc
          - contacts: Lấy mảng ContactInfo lồng bên trong
      */}
      <Sidebar 
        profile={{
          Title: sidebarData?.Title,
          Badge: sidebarData?.Badge,
          AvtDarkImage: sidebarData?.AvtDarkImage,
          AudioUrl: sidebarData?.AudioUrl
        }} 
        contacts={sidebarData?.ContactInfo} 
        volume={volume}
        setVolume={setVolume}
      />
      
      <div className="relative bg-[#1e1e1f] border border-[#383838] rounded-[30px] min-h-[767px] shadow-lg
                      max-w-[300px] 
                      md:min-w-[650px] 
                      lg:min-w-[700px]">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <section className="p-6 lg:p-4 animate-fade-in text-white relative ">
          <h2 className="text-3xl left-0 font-bold mb-6 relative pb-4 text-left 
          after:content-[''] after:absolute after:bottom-0 after:left-0 
          after:w-10 after:h-1 after:bg-[#ffdb70] after:rounded-full">
            {activeTab} 
          </h2>
          
          {/* Nội dung các trang sẽ viết tiếp ở đây */}
          <div className="w-full h-full">
            {activeTab === "About" && <About />}
            {activeTab === "Resume" && <Resume />}
            {activeTab === "Portfolio" && <Portfolio/>}
            {activeTab === "Contact" && <Contact />}
          </div>
        </section>
      </div>

      {isNotPlaying && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer transition-all duration-500">
          <div className="text-center animate-bounce ">
            <h2 className="text-[#ffdb70] text-2xl font-bold tracking-widest uppercase mb-4">
              Click to center...
            </h2>
            <div className="mb-4 flex justify-center text-[#ffdb70]">
              <IconRender iconName="FaMousePointer" className="text-4xl" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MainLayout;