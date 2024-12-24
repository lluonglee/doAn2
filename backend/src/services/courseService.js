const moment = require("moment");
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

// const assignTeacher = async (scheduleId, classId, teacherId) => {
//   try {
//     // Tìm schedule theo ID
//     const schedule = await Schedule.findById(scheduleId);
//     if (!schedule) {
//       throw new Error('Schedule not found');
//     }

//     // Tìm teacher theo ID và lấy danh sách schedules đã phân công
//     const teacher = await Teacher.findById(teacherId).populate({
//       path: 'schedules',
//       populate: {
//         path: 'classes',
//       },
//     });
//     if (!teacher) {
//       throw new Error('Teacher not found');
//     }

//     // Tìm class trong schedule
//     const classToAssign = schedule.classes.find((classItem) => classItem._id.toString() === classId);
//     if (!classToAssign) {
//       throw new Error('Class not found in schedule');
//     }

//     // Lọc các schedule mà giảng viên đã được phân công vào ít nhất một lớp
//     const assignedSchedules = teacher.schedules.filter((assignedSchedule) =>
//       assignedSchedule.classes.some(
//         (assignedClass) => assignedClass.giang_vien_phu_trach?.toString() === teacherId
//       )
//     );

//     // Kiểm tra trùng giờ trong các schedule đã được phân công
//     for (const assignedSchedule of assignedSchedules) {
//       for (const assignedClass of assignedSchedule.classes) {
//         if (
//           assignedClass.giang_vien_phu_trach?.toString() === teacherId && // Kiểm tra lớp đã phân công
//           assignedClass.classTime.toString() === classToAssign.classTime.toString() && // Trùng thời gian
//           assignedSchedule.dayOfWeek === schedule.dayOfWeek // Trùng ngày học
//         ) {
//           return {
//             status: 'Error',
//             message: `Teacher is already assigned to another class at the same time (${schedule.dayOfWeek}, ${classToAssign.classTime}).`,
//           };
//         }
//       }
//     }

//     // Kiểm tra xem lớp học đã có giảng viên chưa
//     if (classToAssign.giang_vien_phu_trach) {
//       if (classToAssign.giang_vien_phu_trach.toString() === teacherId) {
//         return { status: 'OK', message: 'Teacher is already assigned to this class' };
//       } else {
//         return { status: 'Error', message: 'This class is already assigned to another teacher' };
//       }
//     }

//     // Phân công giảng viên cho lớp học
//     classToAssign.giang_vien_phu_trach = teacher._id;

//     // Lưu lại schedule
//     await schedule.save();

//     // Kiểm tra xem schedule đã tồn tại trong danh sách schedules của teacher chưa
//     if (!teacher.schedules.includes(scheduleId)) {
//       teacher.schedules.push(scheduleId);
//       await teacher.save();
//     }

//     return { status: 'OK', message: 'Teacher assigned successfully and schedule updated' };

//   } catch (error) {
//     console.error(error);
//     return { status: 'Error', message: error.message };
//   }
// };




const assignTeacher = async (scheduleId, classId, teacherId) => {
  try {
    // Lấy thông tin schedule
    const schedule = await Schedule.findById(scheduleId).populate({
      path: 'classes',
      populate: {
        path: 'classTime',
      },
    });
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    // Lấy thông tin giáo viên và populate các schedules đã phân công
    const teacher = await Teacher.findById(teacherId).populate({
      path: 'schedules',
      populate: {
        path: 'classes',
        populate: {
          path: 'classTime',
        },
      },
    });
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    // Tìm lớp học trong schedule
    const classToAssign = schedule.classes.find(
      (classItem) => classItem._id.toString() === classId
    );
    if (!classToAssign) {
      throw new Error('Class not found in schedule');
    }

    const { thoiGianBatDau, thoiGianKetThuc } = classToAssign.classTime;

    // Hàm chuyển đổi định dạng "07g00" thành "07:00"
    const convertTimeFormat = (time) => time.replace('g', ':');
    const startTimeFormatted = convertTimeFormat(thoiGianBatDau);
    const endTimeFormatted = convertTimeFormat(thoiGianKetThuc);

    // Nếu lớp đã được phân công giáo viên
    if (classToAssign.giang_vien_phu_trach) {
      const assignedTeacher = await Teacher.findById(classToAssign.giang_vien_phu_trach);
      return {
        status: 'Error',
        message: `This class is already assigned to another teacher (${assignedTeacher.name}).`,
      };
    }

    // Lọc chỉ các schedules đã được phân công
    const assignedSchedules = teacher.schedules.filter((assignedSchedule) =>
      assignedSchedule.classes.some((classItem) => classItem.giang_vien_phu_trach)
    );

    // Kiểm tra thời gian trùng hoặc nằm trong khoảng thời gian đã phân công
    for (const assignedSchedule of assignedSchedules) {
      if (assignedSchedule.dayOfWeek === schedule.dayOfWeek) {
        for (const assignedClass of assignedSchedule.classes) {
          // Bỏ qua các lớp học chưa có giảng viên phụ trách
          if (!assignedClass.giang_vien_phu_trach) continue;

          const assignedStartTime = convertTimeFormat(assignedClass.classTime.thoiGianBatDau);
          const assignedEndTime = convertTimeFormat(assignedClass.classTime.thoiGianKetThuc);

          // Chuyển thời gian thành dạng Date để so sánh
          const startA = new Date(`1970-01-01T${startTimeFormatted}:00Z`);
          const endA = new Date(`1970-01-01T${endTimeFormatted}:00Z`);
          const startB = new Date(`1970-01-01T${assignedStartTime}:00Z`);
          const endB = new Date(`1970-01-01T${assignedEndTime}:00Z`);

          // Kiểm tra chồng chéo
          const isOverlap =
            (startA >= startB && startA < endB) || // Bắt đầu trong khoảng
            (endA > startB && endA <= endB) || // Kết thúc trong khoảng
            (startA <= startB && endA >= endB); // Bao trùm toàn bộ

          if (isOverlap) {
            return {
              status: 'Error',
              message: `Teacher is already assigned to another class at overlapping time (${schedule.dayOfWeek}, ${assignedStartTime}-${assignedEndTime}).`,
            };
          }
        }
      }
    }

    // Phân công giảng viên nếu không trùng
    classToAssign.giang_vien_phu_trach = teacher._id;
    await schedule.save();

    // Thêm schedule vào danh sách của giáo viên nếu chưa tồn tại
    if (!teacher.schedules.some((s) => s._id.toString() === scheduleId)) {
      teacher.schedules.push(scheduleId);
      await teacher.save();
    }

    return { status: 'OK', message: 'Teacher assigned successfully and schedule updated' };
  } catch (error) {
    console.error(error);
    return { status: 'Error', message: error.message };
  }
};


const updateTeacherAssignment = async (scheduleId, classId, newTeacherId) => {
  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) throw new Error("Schedule not found");

    const newTeacher = await Teacher.findById(newTeacherId).populate({
      path: "schedules",
      populate: {
        path: "classes",
      },
    });
    if (!newTeacher) throw new Error("New teacher not found");

    const classToUpdate = schedule.classes.find(
      (classItem) => classItem._id.toString() === classId
    );
    if (!classToUpdate) throw new Error("Class not found in schedule");

    if (
      classToUpdate.giang_vien_phu_trach?.toString() === newTeacherId &&
      !classToUpdate.giang_vien_phu_trach
    ) {
      return { status: "OK", message: "No changes required" };
    }

    const assignedSchedules = newTeacher.schedules.filter((assignedSchedule) =>
      assignedSchedule.classes.some(
        (assignedClass) =>
          assignedClass.giang_vien_phu_trach?.toString() === newTeacherId
      )
    );

    // for (const assignedSchedule of assignedSchedules) {
    //   for (const assignedClass of assignedSchedule.classes) {
    //     if (
    //       assignedClass.classTime.toString() === classToUpdate.classTime.toString() &&
    //       assignedSchedule.dayOfWeek === schedule.dayOfWeek
    //     ) {
    //       return {
    //         status: "Error",
    //         message: `Teacher conflict: ${schedule.dayOfWeek}, ${classToUpdate.classTime}`,
    //       };
    //     }
    //   }
    // }

    const previousTeacherId = classToUpdate.giang_vien_phu_trach;
    classToUpdate.giang_vien_phu_trach = newTeacher._id;
    await schedule.save();

    if (!newTeacher.schedules.includes(scheduleId)) {
      newTeacher.schedules.push(scheduleId);
      await newTeacher.save();
    }

    if (previousTeacherId) {
      const previousTeacher = await Teacher.findById(previousTeacherId);
      if (previousTeacher) {
        previousTeacher.schedules = previousTeacher.schedules.filter(
          (schedule) => schedule.toString() !== scheduleId
        );
        await previousTeacher.save();
      }
    }

    return { status: "OK", message: "Teacher updated successfully" };
  } catch (error) {
    console.error(error);
    return { status: "Error", message: error.message };
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
  updateTeacherAssignment,
};
