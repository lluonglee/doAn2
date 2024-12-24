const Course = require("../models/courseModel");
const Schedule = require("../models/schedule");
const ClassTime = require("../models/classTimeModel");
const Teacher = require("../models/teacherModels");
const ClassRoom = require("../models/classRoomModal");

const assignCourseToSchedule = async (courseId, scheduleId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return { status: "ERR", message: "Cannot find course" };
    }

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return { status: "ERR", message: "Cannot find schedule" };
    }

    schedule.classes.push({
      ma_lop_hoc_phan: course._id,
    });
    await schedule.save();

    return {
      status: "OK",
      message: "Course assigned successfully",
      data: schedule,
    };
  } catch (error) {
    return { status: "ERR", message: error.message };
  }
};

const assignTeacherToCourse = async (courseId, teacherId) => {
  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return { status: "ERR", message: "Cannot find course" };
    }

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return { status: "ERR", message: "Cannot find teacher" };
    }

    // Assign the teacher to the course
    course.giang_vien_phu_trach = teacher._id;  // Assign teacher to course

    // Save the updated course
    await course.save();

    return {
      status: "OK",
      message: "Teacher assigned to course successfully",
      data: course,
    };
  } catch (error) {
    return { status: "ERR", message: error.message };
  }
};


const assignClassTimeToSchedule = async (classTimeId, scheduleId) => {
  try {
    const classTime = await ClassTime.findById(classTimeId);
    if (!classTime) {
      return {
        status: "ERR",
        message: "Cannot find class time",
      };
    }

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return { status: "ERR", message: "Cannot find schedule" };
    }

    if (schedule.classes.length > 0) {
      schedule.classes[schedule.classes.length - 1].classTime = classTime._id;
      await schedule.save();

      return {
        status: "OK",
        message: "Class time assigned successfully",
        data: schedule,
      };
    } else {
      return {
        status: "ERR",
        message: "No class found to assign class time",
      };
    }
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

// const assignClassRoomToSchedule = async (
//   courseId,
//   classRoomId,
//   classTimeId,
//   scheduleId,
//   teacherId
// ) => {
//   try {
//     const classRoom = await ClassRoom.findById(classRoomId);
//     if (!classRoom) {
//       return { status: "ERR", message: "Không tìm thấy phòng học" };
//     }

//     const schedule = await Schedule.findById(scheduleId);
//     if (!schedule) {
//       return { status: "ERR", message: "Không tìm thấy lịch" };
//     }

//     const teacher = await Teacher.findById(teacherId);
//     if (!teacher) {
//       return { status: "ERR", message: "Không tìm thấy giáo viên" };
//     }

//     // Kiểm tra xung đột thời gian cho ca học
//     const hasConflict = schedule.classes.some(
//       (cls) => cls.classTime && cls.classTime.equals(classTimeId)
//     );
//     if (hasConflict) {
//       return {
//         status: "ERR",
//         message: "Xung đột thời gian lớp học: Ca học đã được phân cho lớp này.",
//       };
//     }

//     // Kiểm tra xung đột giáo viên
//     const hasTeacherConflict = schedule.classes.some(
//       (cls) =>
//         cls.giang_vien_phu_trach &&
//         cls.giang_vien_phu_trach.equals(teacherId) &&
//         cls.classTime.equals(classTimeId)
//     );
//     if (hasTeacherConflict) {
//       return {
//         status: "ERR",
//         message:
//           "Xung đột giáo viên: Giáo viên này đã có lớp trong ca học này.",
//       };
//     }

//     schedule.classes.push({
//       ma_lop_hoc_phan: courseId,
//       classTime: classTimeId,
//       rooms: classRoomId,
//       giang_vien_phu_trach: teacherId,
//     });

//     await schedule.save();

//     // Thêm schedule vào mảng schedules của giáo viên nếu chưa có
//     if (!teacher.schedules.includes(scheduleId)) {
//       teacher.schedules.push(scheduleId);
//       await teacher.save();
//     }

//     return {
//       status: "OK",
//       message: "Class room và class time và teacher đã được gán thành công",
//       data: schedule,
//     };
//   } catch (error) {
//     return { status: "ERR", message: error.message };
//   }
// };

const assignClassRoomToSchedule = async (
  courseId,
  classRoomId,
  classTimeId,
  scheduleId
) => {
  try {
    const classRoom = await ClassRoom.findById(classRoomId);
    if (!classRoom) {
      return { status: "ERR", message: "Không tìm thấy phòng học" };
    }

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return { status: "ERR", message: "Không tìm thấy lịch" };
    }

    // Bỏ qua việc kiểm tra xung đột thời gian

    // Gán phòng học và ca học vào lịch
    schedule.classes.push({
      ma_lop_hoc_phan: courseId,
      classTime: classTimeId,
      rooms: classRoomId,
    });

    await schedule.save();

    return {
      status: "OK",
      message: "Class room và class time đã được gán thành công",
      data: schedule,
    };
  } catch (error) {
    return { status: "ERR", message: error.message };
  }
};



const assignTeacherToSchedule = async (teacherId, scheduleId) => {
  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return { status: "ERR", message: "Cannot find teacher" };
    }

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return { status: "ERR", message: "Cannot find schedule" };
    }

    if (schedule.classes.length > 0) {
      schedule.classes[schedule.classes.length - 1].giang_vien_phu_trach =
        teacher._id;
      await schedule.save();

      return {
        status: "OK",
        message: "Teacher assigned successfully",
        data: schedule,
      };
    } else {
      return {
        status: "ERR",
        message: "No class found to assign teacher",
      };
    }
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

module.exports = {
  assignCourseToSchedule,
  assignClassTimeToSchedule,
  assignTeacherToSchedule,
  assignClassRoomToSchedule,
  assignTeacherToCourse
};
