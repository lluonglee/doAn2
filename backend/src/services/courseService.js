const Course = require("../models/courseModel");
const Teacher = require("../models/teacherModels");
const Department = require("../models/departmentModel");

const createCourse = async (newCourse) => {
  const {
    subject,
    department,
    ma_lop_hoc_phan,
    si_so,
    so_tiet_truc_tiep,
    so_tiet_tong,
    loai_mon_hoc,
    hoc_ky,
    tkb,
    giang_vien_phu_trach,
  } = newCourse;

  try {
    const existingCourse = await Course.findOne({ subject, ma_lop_hoc_phan });
    if (existingCourse) {
      return {
        status: "ERR",
        message: "This ma lop hoac Subject has already been used",
      };
    }

    const createCourse = await Course.create({
      subject,
      department,
      ma_lop_hoc_phan,
      si_so,
      so_tiet_truc_tiep,
      so_tiet_tong,
      loai_mon_hoc,
      hoc_ky,
      tkb,
      giang_vien_phu_trach,
    });

    return {
      status: "OK",
      message: "Course created successfully",
      data: createCourse,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllCourse = async () => {
  try {
    const getAll = await Course.find();
    return {
      status: "OK",
      message: "get all course Successful",
      data: getAll,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};
const detailCourse = async (id) => {
  try {
    const course = await Course.findById(id);

    if (!course) {
      return {
        status: "ERR",
        message: "the Course not found",
      };
    }

    return {
      status: "OK",
      message: "Successfully",
      data: course,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const updateCourse = async (id, data) => {
  try {
    const existingCourse = await Course.findById(id);

    if (!existingCourse) {
      return {
        status: "ERR",
        message: "Course not found",
      };
    }

    const updateCourse = await Course.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "Ok",
      message: "Course updated successfully",
      data: updateCourse,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteCourse = async (id) => {
  try {
    const courseID = await Course.findById(id);
    if (!courseID) {
      return {
        status: "ERR",
        message: "not found Course ID",
      };
    }

    await Course.findByIdAndDelete(courseID);
    return {
      status: "Ok",
      message: "Delete Course successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
//assign Teacher
const assignTeacher = async (teacherId, courseId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return {
        status: "ERR",
        message: "can not find course",
      };
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return {
        status: "ERR",
        message: "can not find teacher",
      };
    }
    course.giang_vien_phu_trach = teacher._id;
    await course.save();
    teacher.cac_lop_dang_day.push(course._id);
    await teacher.save();
    return {
      status: "OK",
      message: "assign Teacher successfully",
      data: teacher,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const assignDepartment = async (departmentId, courseId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return {
        status: "ERR",
        message: "can not find course",
      };
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return {
        status: "ERR",
        message: "can not find Department",
      };
    }
    course.department = department._id;
    await course.save();

    return {
      status: "OK",
      message: "assign  successfully",
      data: course,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
module.exports = {
  createCourse,
  getAllCourse,
  detailCourse,
  updateCourse,
  deleteCourse,
  assignTeacher,
  assignDepartment,
};
