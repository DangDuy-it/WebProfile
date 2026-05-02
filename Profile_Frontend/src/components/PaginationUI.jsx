import IconRender from "../constants/icons";

const PaginationUI = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex  justify-center items-center gap-3 mt-10">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-400 hover:text-[#ffdb70] disabled:opacity-30 transition-colors"
      >
        <IconRender iconName="FaChevronLeft" />
      </button>

      {/* Danh sách số trang */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-6 h-6 rounded-lg border transition-all duration-300 font-medium ${
            currentPage === page
              ? "bg-[#ffdb70] text-[#2b2b2b] border-[#ffdb70] shadow-[0_0_15px_rgba(255,219,112,0.3)]"
              : "bg-[#2b2b2b] text-gray-400 border-[#2b2b2b] hover:text-[#ffdb70] hover:bg-[#383838] "
          }`}
        >
          {page}
        </button>
      ))}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-400 hover:text-[#ffdb70] disabled:opacity-30 transition-colors"
      >
        <IconRender iconName="FaChevronRight" />
      </button>
    </div>
  );
};
export default PaginationUI;