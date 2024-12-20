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

// Function to get a lecturer by email
const getTeacherByEmail = async (email) => {
  try {
    //console.log(email);
    const lecturer = await Teacher.findOne({ email })
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
      });
    console.log(lecturer);
    return lecturer;
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
};
