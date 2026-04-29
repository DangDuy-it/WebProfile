import { Link } from 'react-router-dom';

export default function LoginError() {


  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
      <div className="bg-[#1e1e1f] border border-[#383838] rounded-[30px] p-8 text-center max-w-md w-full shadow-lg">
        <h1 className="text-3xl font-bold text-[#ffdb70] mb-4">Login failed 😅</h1>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
              Oops! Only admin accounts can access this area! <br />
              Your email has not been granted access. 🚀
        </p>

        <Link 
          to="/" 
          className="inline-block bg-[#ffdb70] text-black font-semibold px-6 py-2 rounded-xl transition-all hover:bg-[#e0c060]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}