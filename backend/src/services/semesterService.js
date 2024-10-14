const Semester = require("../models/semesterModel");

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

const getAllSemesters = async () => {
  try {
    const getAll = await Semester.find();
    return {
      status: "OK",
      message: "Get all Semesters Successful",
      data: getAll,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};

const detailSemester = async (id) => {
  try {
    const semester = await Semester.findById(id);

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

module.exports = {
  createSemester,
  getAllSemesters,
  detailSemester,
  updateSemester,
  deleteSemester,
};
