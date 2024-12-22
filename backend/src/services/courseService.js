const Course = require("../models/courseModel");
const Teacher = require("../models/teacherModels");
const Department = require("../models/departmentModel");
const Schedule = require("../models/schedule");
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
const getAllCourse = async (page, limit, search) => {
  const skip = (page - 1) * limit;
  const searchFilter = search
    ? { ma_lop_hoc_phan: new RegExp(search, "i") }
    : {};

  const [data, totalCount] = await Promise.all([
    Course.find(searchFilter)
      .skip(skip)
      .limit(limit)
      .populate("subject", "ma_mon ten_mon"), // Chỉ lấy các trường ma_mon và ten_mon
    Course.countDocuments(searchFilter),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    totalPages,
    currentPage: page,
  };
};

const detailCourse = async (id) => {
  try {
    const course = await Course.findById(id).populate(
      "subject",
      "ma_mon ten_mon"
    );

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

const assignTeacher = async (scheduleId, classId, teacherId) => {
  try {
    // Tìm schedule theo ID
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    // Tìm teacher theo ID và lấy danh sách schedules đã phân công
    const teacher = await Teacher.findById(teacherId).populate({
      path: 'schedules',
      populate: {
        path: 'classes',
      },
    });
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    // Tìm class trong schedule
    const classToAssign = schedule.classes.find((classItem) => classItem._id.toString() === classId);
    if (!classToAssign) {
      throw new Error('Class not found in schedule');
    }

    // Lọc các schedule mà giảng viên đã được phân công vào ít nhất một lớp
    const assignedSchedules = teacher.schedules.filter((assignedSchedule) =>
      assignedSchedule.classes.some(
        (assignedClass) => assignedClass.giang_vien_phu_trach?.toString() === teacherId
      )
    );

    // Kiểm tra trùng giờ trong các schedule đã được phân công
    for (const assignedSchedule of assignedSchedules) {
      for (const assignedClass of assignedSchedule.classes) {
        if (
          assignedClass.giang_vien_phu_trach?.toString() === teacherId && // Kiểm tra lớp đã phân công
          assignedClass.classTime.toString() === classToAssign.classTime.toString() && // Trùng thời gian
          assignedSchedule.dayOfWeek === schedule.dayOfWeek // Trùng ngày học
        ) {
          return {
            status: 'Error',
            message: `Teacher is already assigned to another class at the same time (${schedule.dayOfWeek}, ${classToAssign.classTime}).`,
          };
        }
      }
    }

    // Kiểm tra xem lớp học đã có giảng viên chưa
    if (classToAssign.giang_vien_phu_trach) {
      if (classToAssign.giang_vien_phu_trach.toString() === teacherId) {
        return { status: 'OK', message: 'Teacher is already assigned to this class' };
      } else {
        return { status: 'Error', message: 'This class is already assigned to another teacher' };
      }
    }

    // Phân công giảng viên cho lớp học
    classToAssign.giang_vien_phu_trach = teacher._id;

    // Lưu lại schedule
    await schedule.save();

    // Kiểm tra xem schedule đã tồn tại trong danh sách schedules của teacher chưa
    if (!teacher.schedules.includes(scheduleId)) {
      teacher.schedules.push(scheduleId);
      await teacher.save();
    }

    return { status: 'OK', message: 'Teacher assigned successfully and schedule updated' };

  } catch (error) {
    console.error(error);
    return { status: 'Error', message: error.message };
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
