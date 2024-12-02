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







// const saveCoursesToDB = async (courses) => {
//   try {
//     for (const course of courses) {
//       await Course.create({
//         type: course.type,  // "Ngoài giờ học"
//         courseCode: course.courseCode,  // Mã môn học
//         lecturer: course.lecturer,  // Giảng viên
//         room: course.room,  // Phòng học
//         time: course.time,  // Thời gian
//         weeks: course.weeks,  // Các tuần học
//       });
//     }
//     console.log("Courses saved successfully.");
//   } catch (error) {
//     console.error("Error saving courses to DB:", error);
//   }
// };


// function processCourseData(courseData) {
//   return courseData.map(course => {
//     const [type, details] = course;
    
//     // Tách các thông tin trong chuỗi `details`
//     const regex = /(\d{3}_\d+[A-Z]+\d+_.*?)(GV:\s.*?)(Phòng:\s.*?)(Tiết.*?)(Tuần học:\s(.*))/;
//     const match = details.match(regex);

//     if (match) {
//       const courseCode = match[1];  // Mã môn học
//       const lecturer = match[2].replace("GV:", "").trim();  // Giảng viên
//       const room = match[3].replace("Phòng:", "").trim();  // Phòng học
//       const time = match[4];  // Thời gian
//       const weeks = match[5].split("-").map(week => week.trim());  // Các tuần học

//       return {
//         type,  // "Ngoài giờ học"
//         courseCode,
//         lecturer,
//         room,
//         time,
//         weeks,
//       };
//     } else {
//       return null;  // Nếu không thể tách dữ liệu đúng
//     }
//   }).filter(item => item !== null);  // Lọc bỏ các phần tử null
// }

// const { crawlTimetable } = require("../services/crawlerService"); // Đường dẫn tới service

// const getTimetable = async (req, res) => {
//   try {
//     const { khoaName, hocKyName } = req.body;

//     if (!khoaName || !hocKyName) {
//       return res.status(400).json({
//         success: false,
//         message: "Both khoaName and hocKyName are required.",
//       });
//     }

//     // Lấy dữ liệu từ service
//     const timetableData = await crawlTimetable(khoaName, hocKyName);

//     // Xử lý và tách dữ liệu chi tiết từ mảng
//     const processedCourses = processCourseData(timetableData);

//     // Lưu dữ liệu vào cơ sở dữ liệu
//     await saveCoursesToDB(processedCourses);

//     // Trả kết quả về client
//     res.status(200).json({
//       success: true,
//       data: processedCourses,
//     });
//   } catch (error) {
//     console.error("Error in getTimetable controller:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to crawl and save timetable data.",
//       error: error.message,
//     });
//   }
// };
