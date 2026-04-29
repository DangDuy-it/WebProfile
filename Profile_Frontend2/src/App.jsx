import {useState, useEffect} from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import { contactsServices } from "./services/contactsServices";

function App() {
  const [activeTab, setActiveTab] = useState('About');
  const [sidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="text-[#ffdb70] text-center mt-20">Loading...</div>;
  };
  if (error) {
    return <div className="text-red-500 text-center mt-20">Error: {error}</div>;
  };

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
          AvtLightImage: sidebarData?.AvtLightImage
        }} 
        contacts={sidebarData?.ContactInfo} 
      />
      {/* flex-1 relative bg-[#1e1e1f] border border-[#383838] rounded-[30px] min-h-[500px] */}
      <div className="flex-1 relative 
      min-lg:min-w-[700px] 
      bg-[#1e1e1f] border border-[#383838] rounded-[30px] min-h-[500px] shadow-lg">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <section className="p-6 lg:p-4 animate-fade-in text-white lg:min-h-[800px] ">
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
    </main>
  );
}

export default App;