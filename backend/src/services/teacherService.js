const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherModels");
const { populate } = require("../models/semesterModel");
//create teacher
const createTeacher = async (newTeacher) => {
  const {
    ten,
    email,
    password = "1234",
    khoa_chuyen_mon,
    ghi_chu,
    cac_lop_dang_day,
  } = newTeacher;
  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return {
        status: "ERR",
        message: "This email has already been used",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const createTeacher = await Teacher.create({
      ten,
      email,
      password: hashedPassword,
      khoa_chuyen_mon,
      ghi_chu,
      cac_lop_dang_day,
    });

    return {
      status: "OK",
      message: "Teacher created successfully",
      data: createTeacher,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const getTeacherByEmail = async (email) => {
  try {
    // Tìm giảng viên theo email
    const lecturer = await Teacher.findOne({ email })
      .populate("department")
      .populate({
        path: "schedules",
        populate: [
          {
            path: "classes.ma_lop_hoc_phan",
            model: "Course",
            populate: {
              path: "subject",
              model: "Subject",
            },
          },
          {
            path: "classes.classTime",
            model: "CaHoc",
          },
          {
            path: "classes.rooms",
            model: "ClassRoom",
          },
        ],
      });

    if (!lecturer) {
      throw new Error("Lecturer not found");
    }

    // Lọc schedules để giữ lại những lịch mà giảng viên hiện tại là người phụ trách
    const assignedSchedules = lecturer.schedules.filter((schedule) => {
      // Lọc các lớp mà giảng viên được phân công
      const assignedClasses = schedule.classes.filter(
        (classItem) =>
          classItem.giang_vien_phu_trach && // Phải có giảng viên phụ trách
          classItem.giang_vien_phu_trach.toString() === lecturer._id.toString() // Giảng viên đúng là lecturer hiện tại
      );

      // Gán lại danh sách các lớp đã lọc vào schedule
      schedule.classes = assignedClasses;

      // Chỉ giữ lại những schedules có ít nhất 1 lớp được phân công cho giảng viên
      return assignedClasses.length > 0;
    });

    // Loại bỏ các schedule trùng lặp dựa trên `_id`
    const uniqueSchedules = [];
    const scheduleIds = new Set();

    for (const schedule of assignedSchedules) {
      if (!scheduleIds.has(schedule._id.toString())) {
        uniqueSchedules.push(schedule);
        scheduleIds.add(schedule._id.toString());
      }
    }

    // Thay thế schedules của giảng viên bằng danh sách đã lọc và không trùng lặp
    lecturer.schedules = uniqueSchedules;

    return lecturer;
  } catch (error) {
    throw new Error(error.message);
  }
};


//
// const getTeacherByMa_khoa = async (ma_khoa) => {
//   try {
//     // Tìm giảng viên theo ma_khoa
//     console.log(ma_khoa);
//     const lecturers = await Teacher.find({})
//       .populate({ path: "department", match: { ma_khoa: ma_khoa } }) // Điều kiện lọc
//       .populate({
//         path: "schedules",
//         populate: [
//           //{ path: "classes.giang_vien_phu_trach", model: "Teacher" },
//           {
//             path: "classes.ma_lop_hoc_phan",
//             model: "Course",
//             populate: {
//               path: "subject",
//               model: "Subject",
//             },
//           },
//           {
//             path: "classes.classTime",
//             model: "CaHoc",
//           },
//           {
//             path: "classes.rooms",
//             model: "ClassRoom",
//           },
//         ],
//       })
//       .exec();

//     // Lọc ra các giảng viên có department không phải null
//     const filteredLecturers = lecturers.filter(
//       (lecturer) => lecturer.department !== null
//     );

//     // Lặp qua từng giảng viên và lọc schedules
//     filteredLecturers.forEach((lecturer) => {
//       const filteredSchedules = lecturer.schedules.filter((schedule) =>
//         schedule.classes.some(
//           (classItem) =>
//             classItem.giang_vien_phu_trach?.toString() ===
//             lecturer._id.toString()
//         )
//       );

//       // Thay thế schedules của giảng viên bằng danh sách đã lọc
//       lecturer.schedules = filteredSchedules;
//     });

//     return filteredLecturers;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

//

const getTeacherByMa_khoa = async (ma_khoa) => {
  try {
    // Tìm giảng viên theo ma_khoa
    console.log(ma_khoa);
    const lecturers = await Teacher.find({})
      .populate({ path: "department", match: { ma_khoa: ma_khoa } }) // Điều kiện lọc
      .populate({
        path: "schedules",
        populate: [
          {
            path: "classes.ma_lop_hoc_phan",
            model: "Course",
            populate: {
              path: "subject",
              model: "Subject",
            },
          },
          {
            path: "classes.classTime",
            model: "CaHoc",
          },
          {
            path: "classes.rooms",
            model: "ClassRoom",
          },
        ],
      })
      .exec();

    // Lọc ra các giảng viên có department không phải null
    const filteredLecturers = lecturers.filter(
      (lecturer) => lecturer.department !== null
    );

    // Lặp qua từng giảng viên và lọc schedules
    const populatedLecturers = await Promise.all(
      filteredLecturers.map(async (lecturer) => {
        const populatedSchedules = await Promise.all(
          lecturer.schedules.map(async (schedule) => {
            const populatedClasses = await Promise.all(
              schedule.classes.map(async (classItem) => {
                if (classItem.giang_vien_phu_trach) {
                  const teacherDetails = await Teacher.findById(
                    classItem.giang_vien_phu_trach
                  ).select("ten");
                  classItem.giang_vien_phu_trach = teacherDetails;
                }
                return classItem;
              })
            );
            schedule.classes = populatedClasses;
            return schedule;
          })
        );
        lecturer.schedules = populatedSchedules;
        return lecturer;
      })
    );

    return populatedLecturers;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Updated getAllTeacher Service Function
const getAllTeacher = async (page, limit, search) => {
  try {
    const skip = (page - 1) * limit;
    const searchFilter = search ? { ten: new RegExp(search, "i") } : {}; // Case-insensitive search for 'ten'
    // const getAll = await Teacher.find().populate("department");
    // console.log(searchFilter);
    const [data, totalCount] = await Promise.all([
      Teacher.find(searchFilter)
        .populate("department")
        .populate({
          path: "schedules", // Populate schedules array
          populate: [
            {
              path: "classes.ma_lop_hoc_phan", // Populate course in class
              model: "Course", // Model for Course
              populate: {
                path: "subject", // Populate subject in course
                model: "Subject", // Model for Subject
              },
            },
            {
              path: "classes.classTime",
              model: "CaHoc",
            },
            {
              path: "classes.rooms",
              model: "ClassRoom",
            },
          ],
        })
        .skip(skip)
        .limit(limit), // Fetch semesters with pagination
      Teacher.countDocuments(searchFilter), // Count total semesters
    ]);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

//detail teacher
const getDetailTeacher = async (id) => {
  try {
    const teacher = await Teacher.findById(id).populate({
      path: "schedules", // populate schedule array
      populate: [
        {
          path: "classes.ma_lop_hoc_phan", // populate course in class
          model: "Course", // model for Course
          populate: {
            path: "subject", // populate subject in course
            model: "Subject", // model for Subject
          },
        },
      ],
    });
    if (!teacher) {
      return {
        status: "ERR",
        message: "Teacher not found",
      };
    }
    return {
      status: "OK",
      message: "find successful",
      data: teacher,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
//update teacher
const updateTeacher = async (id, data) => {
  try {
    const existingTeacher = await Teacher.findById(id);
    if (!existingTeacher) {
      return {
        status: "ERR",
        message: "Teacher not found",
      };
    }

    const updateTeacher = await Teacher.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "OK",
      message: "teacher updated successful",
      data: updateTeacher,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
//delete teacher
const deleteTeacher = async (id) => {
  try {
    const existingTeacher = await Teacher.findById(id);

    if (!existingTeacher) {
      return {
        status: "ERR",
        message: "id teacher not found",
      };
    }

    await Teacher.findByIdAndDelete(existingTeacher);
    return {
      status: "OK",
      message: "Delete teacher successful",
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};

module.exports = {
  createTeacher,
  getAllTeacher,
  getDetailTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherByEmail,
  getTeacherByMa_khoa,
};
