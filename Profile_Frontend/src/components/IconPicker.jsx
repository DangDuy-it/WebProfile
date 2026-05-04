import { useState, useMemo } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as DiIcons from 'react-icons/di';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';

const Allicons={
    ...FaIcons,
    ...DiIcons,
    ...RiIcons,
    ...SiIcons
};

const IconPicker=({selectedIcon, onSelect})=>{
    const [searchTerm, setSearchTerm] = useState("");
    
    // Sử dụng useMemo để tối ưu hiệu suất khi lọc icons
    const filteredIcons = useMemo(()=>{
        const keys = Object.keys(Allicons);
        if(!searchTerm) return keys.slice(0, 20); // Giới hạn hiển thị 100 icon đầu tiên nếu không có từ khóa tìm kiếm

        return keys.filter(key => key.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 20); // Giới hạn hiển thị 100 icon đầu tiên sau khi lọc
    }, [searchTerm]);

    return(
        <div className="bg-[#2b2b2c] border border-[#383838] rounded-xl p-4 mt-2">
            <div className="flex items-center justify-between mb-4">
                <label className="text-gray-400 text-xs uppercase font-bold">
                    Chọn Icon {selectedIcon && <span className="text-[#ffdb70] ml-2">({selectedIcon})</span>}
                </label>
            </div>

            {/* Ô tìm kiếm icon */}
            <input 
                type="text"
                placeholder="Tìm nhanh icon (vd: mail, phone...)"
                className="w-full bg-[#1e1e1f] border border-[#383838] text-white p-2 rounded-lg mb-4 outline-none focus:border-[#ffdb70] transition-colors text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Lưới hiển thị Icon */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {filteredIcons.map((key) => {
                    const IconComponent = Allicons[key];
                    const isSelected = selectedIcon === key;

                    return (
                        <button
                            key={key}
                            type="button" // Quan trọng: để không trigger submit form
                            onClick={() => onSelect(key)}
                            title={key}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all ${
                                isSelected 
                                ? 'bg-[#ffdb70] text-black scale-110 shadow-lg' 
                                : 'bg-[#383838] text-white hover:bg-[#454545]'
                            }`}
                        >
                            <IconComponent size={20} />
                        </button>
                    );
                })}
            </div>

            {filteredIcons.length === 0 && (
                <p className="text-gray-500 text-center text-xs py-4">Không tìm thấy icon nào khớp...</p>
            )}
        </div>
    );
};
export default IconPicker;