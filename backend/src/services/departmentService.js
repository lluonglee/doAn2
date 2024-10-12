const Department = require("../models/departmentModel");

const createDepartment = async (newDepartment) => {
  const { ma_khoa, ten_khoa, ghi_chu } = newDepartment;
  try {
    const existingDepart = await Department.findOne({ ma_khoa });
    if (existingDepart) {
      return {
        status: "ERR",
        message: "This ma khoa has already been used",
      };
    }

    const createDepartment = await Department.create({
      ma_khoa,
      ten_khoa,
      ghi_chu,
    });

    return {
      status: "OK",
      message: "Department created successfully",
      data: createDepartment,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllDepartment = async () => {
  try {
    const getAll = await Department.find();
    return {
      status: "OK",
      message: "get all Department Successful",
      data: getAll,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};
const detailDepartment = async (id) => {
  try {
    const depart = await Department.findById(id);

    if (!depart) {
      return {
        status: "ERR",
        message: "the department not found",
      };
    }

    return {
      status: "OK",
      message: "Successfully",
      data: depart,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const updateDepartment = async (id, data) => {
  try {
    const existingDepartment = await Department.findById(id);

    if (!existingDepartment) {
      return {
        status: "ERR",
        message: "Department not found",
      };
    }

    const updated = await Department.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "Ok",
      message: "Department updated successfully",
      data: updated,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteDepartment = async (id) => {
  try {
    const departmentID = await Department.findById(id);
    if (!departmentID) {
      return {
        status: "ERR",
        message: "not found department ID",
      };
    }

    await Department.findByIdAndDelete(departmentID);
    return {
      status: "Ok",
      message: "Delete department successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
module.exports = {
  createDepartment,
  getAllDepartment,
  detailDepartment,
  updateDepartment,
  deleteDepartment,
};
