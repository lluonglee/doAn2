const xlsx = require("xlsx");
const Subject = require("../models/subjectModel");
const Course = require("../models/courseModel");
const Semester = require("../models/semesterModel");


const importExcelData = async (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const firstRow = sheet["A1"] ? sheet["A1"].v : null;

    if (!firstRow) {
      return {
        status: "ERR",
        message: "Không có dữ liệu ở tiêu đề",
      };
    }

    // Match the semester info
    const semesterInfo = firstRow.match(/Học kỳ (\d+), (\d{4})-(\d{4})/);
    if (!semesterInfo) {
      return {
        status: "ERR",
        message:
          "Không tìm thấy thông tin học kỳ và năm học trong dòng tiêu đề",
      };
    }

    const hocKy = semesterInfo[1]; // Học kỳ (e.g., 1)
    const namHoc = `${semesterInfo[2]}-${semesterInfo[3]}`; // Năm học (e.g., 2024-2025)

    // Convert sheet data to JSON (skipping the first row, which contains the header)
    const sheetData = xlsx.utils.sheet_to_json(sheet, { range: 1 });

    // Process each row
    for (let row of sheetData) {
      // Sanitize headers to remove newline characters and carriage returns
      const sanitizedRow = {};
      for (const key in row) {
        const sanitizedKey = key.replace(/[\n\r]/g, " "); // Replace newline and carriage return with space
        sanitizedRow[sanitizedKey] = row[key];
      }

      console.log("Processing sanitized row:", sanitizedRow);

      // Parse subject-related fields with default values if missing
      const tinChiLyThuyet = sanitizedRow["TC lý thuyết"] || 0; // Default to 0 if missing
      const tinChiThucHanh = sanitizedRow["TC thực hành"] || 0; // Default to 0 if missing
      const soTinChi = tinChiLyThuyet + tinChiThucHanh; // Assuming so_tin_chi is sum of both

      console.log("tinChiLyThuyet:", tinChiLyThuyet);
      console.log("tinChiThucHanh:", tinChiThucHanh);

      // Check if subject exists, otherwise create it
      let existSubject = await Subject.findOne({
        ma_mon: sanitizedRow["Mã môn"],
      });
      if (!existSubject) {
        existSubject = new Subject({
          ma_mon: sanitizedRow["Mã môn"],
          ten_mon: sanitizedRow["Tên môn"] || "Không xác định", // Default name if missing
          so_tin_chi: soTinChi,
          tin_chi_ly_thuyet: tinChiLyThuyet,
          tin_chi_thuc_hanh: tinChiThucHanh,
        });
        await existSubject.save(); // Uncomment this to save subject
      }

      // Parse course-related fields with default values if missing
      const soTietTrucTiep = sanitizedRow["Số tiết trực tiếp/Tổng"]
        ? sanitizedRow["Số tiết trực tiếp/Tổng"].split("/")[0]
        : 0; // Default to 0 if missing
      const soTietTong = sanitizedRow["Số tiết trực tiếp/Tổng"]
        ? sanitizedRow["Số tiết trực tiếp/Tổng"].split("/")[1]
        : 0;

      // Check for required fields and set defaults if missing
      const maLopHocPhan = sanitizedRow["Mã lớp học phần"];
      if (!maLopHocPhan) {
        console.warn("Missing 'Mã lớp học phần' for row:", sanitizedRow);
        continue; // Skip this row if 'Mã lớp học phần' is missing
      }

      const loaiMonHoc = sanitizedRow["Loại MH"] || "Không xác định"; // Set default valid value for loai_mon_hoc

      // Check if course exists, otherwise create it
      let existCourse = await Course.findOne({
        ma_lop_hoc_phan: maLopHocPhan,
      });

      if (!existCourse) {
        // If course does not exist, create a new course and link to existing subject
        existCourse = new Course({
          subject: existSubject._id, // Link subject ID here
          ma_lop_hoc_phan: maLopHocPhan,
          si_so: sanitizedRow["Sĩ số"] || 0, // Default to 0 if missing
          so_tiet_truc_tiep: Number(soTietTrucTiep) || 0,
          loai_mon_hoc: loaiMonHoc, // Set the valid 'loai_mon_hoc'
          so_tiet_tong: Number(soTietTong) || 0,
        });
        await existCourse.save(); // Save the course
      } else {
        // If course exists, ensure the correct subject ID is still linked
        if (!existCourse.subject.equals(existSubject._id)) {
          existCourse.subject = existSubject._id; // Update the subject ID if necessary
          await existCourse.save(); // Save the updated course
        }
      }

      // Check and update semester
      let semester = await Semester.findOne({ hoc_ky: hocKy, nam_hoc: namHoc });
      if (!semester) {
        semester = new Semester({
          hoc_ky: hocKy,
          nam_hoc: namHoc,
          cac_lop_hoc_phan: [existCourse._id],
        });
      } else {
        if (!semester.cac_lop_hoc_phan.includes(existCourse._id)) {
          semester.cac_lop_hoc_phan.push(existCourse._id);
        }
      }
      await semester.save(); // Save the semester
    }

    return {
      status: "OK",
      message: "Dữ liệu đã được nhập thành công",
    };
  } catch (error) {
    console.error("Error importing Excel data:", error);
    return {
      status: "ERR",
      message: "Có lỗi xảy ra khi nhập dữ liệu",
    };
  }
};

module.exports = {
  importExcelData,
};
