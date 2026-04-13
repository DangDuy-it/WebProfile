import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';
import {FaSun, FaMoon, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useTheme } from '../../contexts/ThemeContext';

// Navigation items với anchor links cho sections
const navItems = [
  { name: 'Home', sectionId: 'hero' },
  { name: 'About', sectionId: 'about' },
  { name: 'Skills', sectionId: 'skills' },
  { name: 'Projects', sectionId: 'projects' },
  { name: 'Contact', sectionId: 'contact' },
];

export default function Navbar() {
  const { lightMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get('adminToken');

  const handleAdminClick=()=>{
    if(isLoggedIn){
      navigate('/admin');
    } else {
      window.location.href='http://localhost:5000/api/auth/google';
    }
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container navbar-inner">
        <div className="logo">
          <NavLink to='/' className='logo-link'>
            DangDuy - <span>IT</span>
          </NavLink>
        </div>
        <div className="nav-links">
          {navItems.map(item =>(
            <a
              key={item.name}
              href={`#${item.sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.sectionId);
              }}
              className='nav-link'
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="buttons">

          <button className='theme-toggle' onClick={toggleTheme} aria-label='Chuyển chế độ sáng/ tối'>
            {lightMode ? <FaMoon/> : <FaSun/>}
          </button>
          
          <button className='admin-btn' onClick={handleAdminClick}>
            <span className='admin-icon'>
              {isLoggedIn ? <FaSignInAlt /> : <FaSignOutAlt />}
            </span>
            <span className='admin-text'>
              {isLoggedIn ? "Login" : "Logout"}
            </span>
          </button>
          
        </div>

      </div>
    </nav>
  );
}