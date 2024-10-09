const Subject = require("../models/subjectModel");

const CreateSubject = async (newSubject) => {
  const { ma_mon, ten_mon, so_tin_chi,tin_chi_ly_thuyet,tin_chi_thuc_hanh } = newSubject;

  try {
    const existingSubject = await Subject.findOne({ ma_mon });
    if (existingSubject) {
      return {
        status: "ERR",
        message: "this ma mon has already been used",
      };
    }

    const createSubject = await Subject.create({
      ma_mon,
      ten_mon,
      so_tin_chi,
      tin_chi_ly_thuyet,
      tin_chi_thuc_hanh
    });

    return {
      status: "OK",
      message: "Subject created Successful",
      data: createSubject,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllSubject = async () => {
  try {
    const getAll = await Subject.find();
    return {
      status: "OK",
      message: "get all subject Successful",
      data: getAll,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};
const detailSubject = async (id) => {
  try {
    const subject = await Subject.findById(id);

    if (!subject) {
      return {
        status: "ERR",
        message: "the subject not found",
      };
    }

    return {
      status: "OK",
      message: "Successfully",
      data: subject,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const updateSubject = async (id, data) => {
  try {
    const existingSubject = await Subject.findById(id);

    if (!existingSubject) {
      return {
        status: "ERR",
        message: "subject not found",
      };
    }

    const updateSubject = await Subject.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "Ok",
      message: "Course updated successfully",
      data: updateSubject,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteSubject = async (id) => {
  try {
    const subjectID = await Subject.findById(id);
    if (!subjectID) {
      return {
        status: "ERR",
        message: "not found subject ID",
      };
    }

    await Subject.findByIdAndDelete(subjectID);
    return {
      status: "Ok",
      message: "Delete Subject successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
module.exports = {
  CreateSubject,
  getAllSubject,
  detailSubject,
  updateSubject,
  deleteSubject,
};
