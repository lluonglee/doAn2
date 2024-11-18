const Semester = require("../models/semesterModel");
const Course = require("../models/courseModel");

const createSemester = async (newSemester) => {
  const { hoc_ky, nam_hoc } = newSemester;
  try {
    const existingSemester = await Semester.findOne({ hoc_ky, nam_hoc });
    if (existingSemester) {
      return {
        status: "ERR",
        message: "This semester has already been used",
      };
    }

    const createSemester = await Semester.create({
      hoc_ky,
      nam_hoc,
    });

    return {
      status: "OK",
      message: "Semester created successfully",
      data: createSemester,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const getAllSemesters = async (page, limit, search) => {
  const skip = (page - 1) * limit;
  const searchFilter = search ? { nam_hoc: new RegExp(search, "i") } : {}; // Case-insensitive search for 'ten'
  const [data, totalCount] = await Promise.all([
    Semester.find(searchFilter).skip(skip).limit(limit), // Fetch semesters with pagination
    Semester.countDocuments(searchFilter), // Count total semesters
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    totalPages,
    currentPage: page,
  };
};

const detailSemester = async (id) => {
  try {
    const semester = await Semester.findById(id).populate({
      path: "cac_lop_hoc_phan",
      model: "Course",
      populate: [
        { path: "subject", model: "Subject" },
        { path: "department", model: "Department" },
        // Thêm các populate khác nếu cần
      ],
    });
    if (!semester) {
      return {
        status: "ERR",
        message: "Semester not found",
      };
    }

    return {
      status: "OK",
      message: "Successfully",
      data: semester,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

// const detailSemester = async (id, page = 1, limit = 10) => {
//   try {
//     // Tính toán số lượng bản ghi bỏ qua (skip) và lọc theo page, limit
//     const skip = (page - 1) * limit;
    
//     // Tìm học kỳ và thực hiện populate các khóa học liên quan
//     const semester = await Semester.findById(id)
//       .populate({
//         path: "cac_lop_hoc_phan",
//         model: "Course",
//         options: { skip, limit }, // Áp dụng phân trang cho các khóa học
//         populate: [
//           { path: "subject", model: "Subject" },
//           { path: "department", model: "Department" },
//           // Thêm các populate khác nếu cần
//         ]
//       });

//     // Nếu không tìm thấy học kỳ
//     if (!semester) {
//       return {
//         status: "ERR",
//         message: "Semester not found",
//       };
//     }

//     // Tính tổng số khóa học trong học kỳ để tính tổng số trang
//     const totalCourses = await Semester.aggregate([
//       { $match: { _id: id } },
//       { $unwind: "$cac_lop_hoc_phan" },  // Tách từng khóa học
//       { $count: "totalCourses" }  // Đếm tổng số khóa học
//     ]);

//     const totalCount = totalCourses.length > 0 ? totalCourses[0].totalCourses : 0;
//     const totalPages = Math.ceil(totalCount / limit);

//     // Trả về thông tin học kỳ và các khóa học đã phân trang
//     return {
//       status: "OK",
//       message: "Successfully",
//       data: {
//         semester,
//         totalPages,
//         currentPage: page,
//       },
//     };
//   } catch (error) {
//     return {
//       status: "ERR",
//       message: error.message,
//     };
//   }
// };


const updateSemester = async (id, data) => {
  try {
    const existingSemester = await Semester.findById(id);

    if (!existingSemester) {
      return {
        status: "ERR",
        message: "Semester not found",
      };
    }

    const updated = await Semester.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "OK",
      message: "Semester updated successfully",
      data: updated,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const deleteSemester = async (id) => {
  try {
    const semesterID = await Semester.findById(id);
    if (!semesterID) {
      return {
        status: "ERR",
        message: "Semester not found",
      };
    }

    await Semester.findByIdAndDelete(semesterID);
    return {
      status: "OK",
      message: "Delete semester successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

//const assignSemester
const assignSemester = async (semesterId, courseId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return {
        status: "ERR",
        message: "can not find course",
      };
    }

    const semester = await Semester.findById(semesterId);
    if (!semester) {
      return {
        status: "ERR",
        message: "can not find Semester",
      };
    }
    course.hoc_ky = semester._id;
    await course.save();
    semester.cac_lop_hoc_phan.push(course._id);
    await semester.save();

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
  createSemester,
  getAllSemesters,
  detailSemester,
  updateSemester,
  deleteSemester,
  assignSemester,
};
