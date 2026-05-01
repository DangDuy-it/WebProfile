import IconRender from "../constants/icons";

const Error = ({ message }) => (
  <div className="flex flex-col items-center justify-center mt-20 p-6 bg-[#202022] border border-red-500/20 rounded-2xl">
    <div className="text-red-500 text-5xl mb-4">
      <IconRender iconName="RiErrorWarningLine" />
    </div>
    <h3 className="text-white text-lg font-bold mb-2">Đã có lỗi xảy ra</h3>
    <p className="text-gray-400 text-sm text-center">{message}</p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs"
    >
      Thử lại
    </button>
  </div>
);

export default Error;