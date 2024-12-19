const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const Semester = require("../models/semesterModel");
const Course = require("../models/courseModel");
const Subject = require("../models/subjectModel");

const exportExcelData = async (semesterId) => {
  try {
    // Ensure the 'exports' directory exists
    const exportsDir = path.join(__dirname, "../../exports");
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    // Find semester data
    const semester = await Semester.findById(semesterId).populate({
      path: "cac_lop_hoc_phan",
      populate: { path: "subject" },
    });

    if (!semester) {
      return { status: "ERR", message: "Không tìm thấy học kỳ" };
    }

    // Prepare Excel data
    const data = [
      [`Học kỳ ${semester.hoc_ky}, ${semester.nam_hoc}`], // Title row
      [
        "Mã lớp học phần",
        "Tên môn",
        "Mã môn",
        "TC lý thuyết",
        "TC thực hành",
        "Số tín chỉ",
        "Số tiết trực tiếp/Tổng",
        "Sĩ số",
        "Loại MH",
      ], // Header row
    ];

    for (const course of semester.cac_lop_hoc_phan) {
      const subject = course.subject;
      data.push([
        course.ma_lop_hoc_phan || "",
        subject?.ten_mon || "Không xác định",
        subject?.ma_mon || "Không xác định",
        subject?.tin_chi_ly_thuyet || 0,
        subject?.tin_chi_thuc_hanh || 0,
        subject?.so_tin_chi || 0,
        `${course.so_tiet_truc_tiep || 0}/${course.so_tiet_tong || 0}`,
        course.si_so || 0,
        course.loai_mon_hoc || "Không xác định",
      ]);
    }

    // Create Excel workbook and sheet
    const worksheet = xlsx.utils.aoa_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "SemesterData");

    // Define file path
    const filePath = path.join(
      exportsDir,
      `semester_${semester.hoc_ky}_${semester.nam_hoc}.xlsx`
    );

    // Write file to the specified path
    xlsx.writeFile(workbook, filePath);

    return { status: "OK", message: "Dữ liệu đã được xuất thành công", filePath, semester };
  } catch (error) {
    console.error("Lỗi khi xuất dữ liệu Excel:", error);
    return { status: "ERR", message: "Có lỗi xảy ra khi xuất dữ liệu" };
  }
};

module.exports = { exportExcelData };
