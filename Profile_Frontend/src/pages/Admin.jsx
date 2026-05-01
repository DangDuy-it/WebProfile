
import { authServices } from '../services/authServices';

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white p-10">
      <div className="max-w-[1200px] mx-auto bg-[#1e1e1f] border border-[#383838] rounded-[30px] p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[#ffdb70] mb-6">Trang Quản Trị (Admin Dashboard)</h1>
        <p className="text-gray-300 mb-8">Chào mừng bạn trở lại, hệ thống chỉ cho phép duy nhất bạn truy cập.</p>
        
        <button 
          onClick={authServices.logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-colors font-semibold"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Admin;