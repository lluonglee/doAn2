const xlsx = require("xlsx");
const Subject = require("../models/subjectModel");
const Teacher = require("../models/teacherModels");
const Department = require("../models/departmentModel")
const Course = require("../models/courseModel")

const importExcelData = async (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    
    const sheetData = xlsx.utils.sheet_to_json(sheet, { range: 1 }); 
    const importedSubjects = [];
    const importedTeachers = [];
    const importDepartment = [];
    const importCourse = [];


    for (let row of sheetData) {
    
      const newSubject = new Subject({
        ma_mon: row.ma_mon,
        ten_mon: row.ten_mon,
        so_tin_chi: Number(row.so_tin_chi),
        tin_chi_ly_thuyet: Number(row.tin_chi_ly_thuyet),
        tin_chi_thuc_hanh: Number(row.tin_chi_thuc_hanh),
      });

      const savedSubject = await newSubject.save();
      importedSubjects.push(savedSubject);

      const newTeacher = new Teacher({
        ten: row.ten,
        email: row.email,
      });

      const savedTeacher = await newTeacher.save();
      importedTeachers.push(savedTeacher); // Lưu giảng viên đã tạo vào danh sách


      const newDepartment = new Department({
        ma_khoa: row.ma_khoa,
        ten_khoa: row.ten_khoa,
      });

      const savedDepartment = await newDepartment.save();
      importDepartment.push(savedDepartment); 


      const newCourse = new Course({
        ma_lop_hoc_phan: row.ma_lop_hoc_phan,
        si_so: row.si_so,
        so_tiet_truc_tiep: row.so_tiet_truc_tiep,
        so_tiet_tong: row.so_tiet_tong,
        loai_mon_hoc: row.loai_mon_hoc,

      });

      const savedCourse = await newCourse.save();
      importCourse.push(savedCourse); 




    }

    return {
      status: "OK",
      message: "Import thành công",
      subjects: importedSubjects,
      teachers: importedTeachers,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

module.exports = {
  importExcelData,
};
