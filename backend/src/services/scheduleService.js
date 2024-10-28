const Schedule = require("../models/schedule"); // Đường dẫn tới mô hình Schedule

const createSchedule = async (newSchedule) => {
  const { dayOfWeek } = newSchedule;
  try {
    const existingSchedule = await Schedule.findOne({ dayOfWeek });
    if (existingSchedule) {
      return {
        status: "ERR",
        message: "This Schedule has already been used",
      };
    }

    const createSchedule = await Schedule.create({
      dayOfWeek,
      
    });

    return {
      status: "OK",
      message: "Department created successfully",
      data: createSchedule,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllSchedule = async () => {
  try {
    const getAll = await Schedule.find();
    return {
      status: "OK",
      message: "get all Schedule Successful",
      data: getAll,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};
module.exports = {
  createSchedule,
  getAllSchedule,
};
