import {useState, useEffect, useMemo} from "react";

const usePagination = (data= [])=>{
    // 1. Xác định số luọng item dựa trên màn hình 
    const getItemsPerPage=()=>{
        if (typeof window === "undefined") {
            return 9; // Mặc định cho desktop
        }
        const screenWidth = window.innerWidth;
        if( screenWidth >= 1024) return 9; // Desktop
        if( screenWidth >= 768) return 4; // Tablet
        return 2; // Mobile
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

    // 2. Lắng nghe thay đổi kích thướng màn hình
    useEffect(()=>{
        const handleResize=()=>{
            setItemsPerPage(getItemsPerPage());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 3. Tính toán số trang
    const totalPages= Math.ceil(data.length/itemsPerPage);
    // 4. Lấy dữ liệu cho trang hiện tại
    const currentData= useMemo(()=>{
        const startIndex= (currentPage-1)*itemsPerPage;
        return data.slice(startIndex, startIndex+itemsPerPage);
    }, [currentPage, itemsPerPage, data]);

    // 5. Hàm chuyển trang
    const goToPage=(pageNumber)=>{
        if(pageNumber === currentPage || pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Tự động về trang 1 khi data thay đổi
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1);
    }, [data]);
    // Đảm bảo trang hiện tại không vượt quá tổng số trang khi resize
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    return { currentData, currentPage, totalPages, goToPage };
}
export default usePagination;