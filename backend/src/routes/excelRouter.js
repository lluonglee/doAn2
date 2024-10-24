const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const excelController = require("../controllers/excelController");

// Tạo thư mục uploads nếu chưa tồn tại
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình multer để lưu trữ file Excel
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Sử dụng đường dẫn đã tạo
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên file
    }
});

const upload = multer({ storage: storage });

// Định tuyến yêu cầu POST cho việc import file Excel
router.post('/import', upload.single('file'), excelController.importExcel); // Middleware multer trước khi gọi controller

module.exports = router;
