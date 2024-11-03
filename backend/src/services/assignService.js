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
// const assignClassRoomToSchedule = async (classRoomId, classTimeId, scheduleId) => {
//   try {
//     const classRoom = await ClassRoom.findById(classRoomId);
//     if (!classRoom) {
//       return { status: "ERR", message: "Cannot find class room" };
//     }

//     const schedule = await Schedule.findById(scheduleId);
//     if (!schedule) {
//       return { status: "ERR", message: "Cannot find schedule" };
//     }

//     const hasConflict = schedule.classes.some(cls => cls.classTime && cls.classTime.equals(classTimeId));
//     if (hasConflict) {
//       return {
//         status: "ERR",
//         message: "Xung đột thời gian lớp học: Ca học đã được phân cho lớp này.",
//       };
//     }

//     if (schedule.classes.length > 0) {
//       schedule.classes[schedule.classes.length - 1].room = classRoom._id;
//       await schedule.save();

//       return {
//         status: "OK",
//         message: "Class room assigned successfully",
//         data: schedule,
//       };
//     } else {
//       return {
//         status: "ERR",
//         message: "No class found to assign class room",
//       };
//     }
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
    // Kiểm tra phòng học có tồn tại không
    const classRoom = await ClassRoom.findById(classRoomId);
    if (!classRoom) {
      return { status: "ERR", message: "Không tìm thấy phòng học" };
    }

    // Kiểm tra lịch có tồn tại không
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return { status: "ERR", message: "Không tìm thấy lịch" };
    }

    // Kiểm tra xung đột thời gian cho khung giờ
    const hasConflict = schedule.classes.some(
      (cls) => cls.classTime && cls.classTime.equals(classTimeId)
    );
    if (hasConflict) {
      return {
        status: "ERR",
        message: "Xung đột thời gian lớp học: Ca học đã được phân cho lớp này.",
      };
    }

    // Thêm lớp mới vào lịch với các thông tin được truyền vào
    schedule.classes.push({
      ma_lop_hoc_phan: courseId,
      classTime: classTimeId,
      room: classRoomId,
    });

    // Lưu lại lịch đã cập nhật
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
};
