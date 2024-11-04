const ClassTime = require("../models/classTimeModel");

const createClassTime = async (newClassTime) => {
  try {
    const { tenCa, buoi, thoiGian, ghi_chu } = newClassTime;
    const createClassTime = await ClassTime.create({
      tenCa,
      buoi,
      thoiGian,
      ghi_chu,
    });

    return {
      status: "OK",
      message: "Class time created successful",
      data: createClassTime,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const getAllClassTimes = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    ClassTime.find().skip(skip).limit(limit), // Fetch semesters with pagination
    ClassTime.countDocuments(), // Count total semesters
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    totalPages,
    currentPage: page,
  };
};

const getClassTimeById = async (id) => {
  try {
    const classTime = await ClassTime.findById(id);
    if (!classTime) {
      return {
        status: "ERR",
        message: "Class time not found",
      };
    }
    return {
      status: "OK",
      message: "Get class time details successful",
      data: classTime,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const updateClassTime = async (id, data) => {
  try {
    const existingClassTime = await ClassTime.findById(id);

    if (!existingClassTime) {
      return {
        status: "ERR",
        message: "class time not found",
      };
    }

    const updated = await ClassTime.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "Ok",
      message: "class time updated successfully",
      data: updated,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteClassTime = async (id) => {
  try {
    const classTimeID = await ClassTime.findById(id);
    if (!classTimeID) {
      return {
        status: "ERR",
        message: "not found class time ID",
      };
    }

    await ClassTime.findByIdAndDelete(classTimeID);
    return {
      status: "Ok",
      message: "Delete class time successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
module.exports = {
  createClassTime,
  getAllClassTimes,
  getClassTimeById,
  updateClassTime,
  deleteClassTime,
};