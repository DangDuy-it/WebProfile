import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * BƯỚC 1: CẤU HÌNH LƯU TRỮ (STORAGE)
 * DiskStorage cho phép bạn toàn quyền kiểm soát việc lưu file vào ổ đĩa.
 */
const storage = multer.diskStorage({
    // destination: Xác định thư mục nào file sẽ được lưu vào
    destination: (req, file,cb)=>{
        const uploadDir= "public/uploads";
        // Kiểm tra nếu thư mục chưa tồn tại thì tạo mới
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir); // null dùng để báo lỗi, nếu không có lỗi thì truyền null
    },
    // filename: Xác định tên file sẽ được lưu trên server
    filename: (req, file, cb)=>{
        // Chúng ta sẽ tạo một cái tên duy nhất bằng cách:
        // [Tên-trường] - [Thời-gian-hiện-tại] - [Số-ngẫu-nhiên] . [Đuôi-file-gốc]
        const uniqueSuffix= `${Date.now()}-${Math.round(Math.random()*1E9)}`;
        const fileExt= path.extname(file.originalname); // Lấy đuôi file gốc
        const fieldName= file.fieldname;
        cb(null, `${fieldName}-${uniqueSuffix}${fileExt}`);
    }
});
/**
 * BƯỚC 2: BỘ LỌC FILE (FILE FILTER)
 * Đảm bảo người dùng không upload "nhầm" file virus hoặc file không đúng định dạng.
 */
const fileFilter= (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback)=>{
    // Chỉ chấp nhận file ảnh (jpg, jpeg, png, gif) hoặc âm thanh / video (mp3, wav, mp4)
    const allowedTypes= /jpeg|jpg|png|gif|mp3|wav|mp4/;
    // Kiểm tra đuôi file và MIME type
    const extName= allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // file.mimetype có dạng "image/jpeg", "image/png", ...
    const mimeType= allowedTypes.test(file.mimetype);
    // Nếu cả đuôi file và MIME type đều hợp lệ thì chấp nhận file, ngược lại từ chối và trả về lỗi
    if(extName && mimeType){
        cb(null, true); // Chấp nhận file
    } else {
        cb(new Error('Only images and audio files are allowed')); // Từ chối file và trả về lỗi
    }
}
/**
 * BƯỚC 3: KHỞI TẠO MIDDLEWARE MULTER
 * Kết hợp cấu hình lưu trữ, bộ lọc và giới hạn dung lượng.
 */
export const upload= multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // Giới hạn dung lượng file là 50MB
    }
})

