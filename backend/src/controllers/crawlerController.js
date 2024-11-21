const { crawlTimetable } = require("../services/crawlerService"); // Đường dẫn tới service

// Controller để crawl dữ liệu thời khóa biểu
const getTimetable = async (req, res) => {
  try {
    // Lấy các tham số từ request body
    const { khoaName, hocKyName } = req.body;

    // Gọi service để crawl dữ liệu
    const timetableData = await crawlTimetable(khoaName, hocKyName);

    // Trả kết quả về client
    res.status(200).json({
      success: true,
      data: timetableData,
    });
  } catch (error) {
    console.error("Error in getTimetable controller:", error);
    res.status(500).json({
      success: false,
      message: "Failed to crawl timetable data.",
      error: error.message,
    });
  }
};

module.exports = {
  getTimetable,
};
