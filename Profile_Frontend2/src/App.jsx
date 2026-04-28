import {useState, useEffect, use} from "react";
import Sidebar from "./components/Sidebar";
import { contactsServices } from "./services/contactsServices";

function App() {
  const [activeTab, setActiveTab] = useState('about');
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
      <div className="flex-1 relative bg-[#1e1e1f] border border-[#383838] rounded-[30px] min-h-[500px] shadow-lg">
        {/* <Navbar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        
        <section className="p-6 lg:p-10 animate-fade-in text-white">
          <h2 className="text-3xl font-bold mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-[#ffdb70] after:rounded-full">
            {activeTab}
          </h2>
          
          {/* Nội dung các trang sẽ viết tiếp ở đây */}
          {activeTab === "About" && <p className="text-gray-400">Dữ liệu từ SQL Server đã sẵn sàng!</p>}
        </section>
      </div>
    </main>
  );
}

export default App;