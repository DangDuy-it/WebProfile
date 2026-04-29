import { authServices } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import IconRender from '../constants/icons';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = ["About", "Resume", "Portfolio", "Contact"];
  const navigate = useNavigate();

  const isLoggedIn = authServices.isLoggedIn();

  const handleAdminClick = () =>{
    if (isLoggedIn) {
      navigate('/admin');
    }else{
        window.location.href = authServices.getGoogleAuthUrl();
    }
  }

  return (
    <nav className="
      /* Layout cho Desktop */
      lg:absolute lg:top-0 lg:right-0 
      lg:px-6
      lg:min-w-[400px] 
      lg:h-16 
      lg:bg-[#2b2b2c] 
      lg:border-l lg:border-b lg:border-[#383838] 
      lg:rounded-bl-[20px] lg:rounded-tr-[28px] 
      
      /* Layout cho Mobile (Dính dưới đáy) */
      max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full 
      max-lg:bg-[#2b2b2c]/90 max-lg:backdrop-blur-md max-lg:border-t
      max-lg:border-[#383838] max-lg:rounded-tl-[20px] max-lg:rounded-tr-[20px]
      max-lg:p-2 max-lg:shadow-lg
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
          <button className='group flex items-center gap-2 transition-all duration-300 ' 
                  onClick={handleAdminClick}>
            <span className='text-gray-400 group-hover:text-gray-100 transition-colors'>
              {isLoggedIn ? <IconRender iconName="FaSignOutAlt" /> : <IconRender iconName="FaSignInAlt" /> }
            </span>
            <span className='text-[13px] lg:text-sm font-medium  overflow-hidden max-w-0 group-hover:max-w-[100px] transition-all duration-300  text-gray-400 group-hover:text-gray-100'>
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          </button>
      </ul>
    </nav>
  );
};

export default Navbar;