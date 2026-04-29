

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = ["About", "Resume", "Portfolio", "Contact"];

  return (
    <nav className="
      /* Layout cho Desktop */
      lg:absolute lg:top-0 lg:right-0 
      lg:w-[400px] /* Cố định chiều rộng tại đây */
      lg:h-16 
      lg:bg-[#2b2b2c] 
      lg:border-l lg:border-b lg:border-[#383838] 
      lg:rounded-bl-[20px] lg:rounded-tr-[28px] 
      
      /* Layout cho Mobile (Dính dưới đáy) */
      max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full 
      max-lg:bg-[#2b2b2c]/90 max-lg:backdrop-blur-md max-lg:border-t
      
      /* Chung */
      flex items-center justify-center z-20 shadow-md border-[#383838]
    ">
      <ul className="flex items-center gap-6 lg:gap-10">
        {navItems.map((item) => (
          <li key={item}>
            <button
              onClick={() => setActiveTab(item)}
              className={`text-[13px] lg:text-sm font-medium transition-all duration-300 ${
                activeTab === item ? "text-[#ffdb70]" : "text-gray-400 hover:text-gray-100"
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;