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

const detailSchedule = async (id) => {
  try {
    const schedule = await Schedule.findById(id)
      .populate({
        path: 'classes.ma_lop_hoc_phan',
        model: 'Course'
      })
      .populate({
        path: 'classes.classTime',
        model: 'CaHoc'
      })
      .populate({
        path: 'classes.giang_vien_phu_trach',
        model: 'Teacher'
      });

    if (!schedule) {
      return {
        status: "ERR",
        message: "The schedule was not found",
      };
    }

    return {
      status: "OK",
      message: "Successfully fetched schedule details",
      data: schedule,
    };
  } catch (error) {
    console.error("Error fetching schedule:", error); // Log the error for debugging
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const updateSchedule = async (id, data) => {
  try {
    const existingSchedule = await Schedule.findById(id);

    if (!existingSchedule) {
      return {
        status: "ERR",
        message: "schedule not found",
      };
    }

    const updated = await Schedule.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "Ok",
      message: "Schedule updated successfully",
      data: updated,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteSchedule = async (id) => {
  try {
    const scheduleID = await Schedule.findById(id);
    if (!scheduleID) {
      return {
        status: "ERR",
        message: "not found department ID",
      };
    }

    await Schedule.findByIdAndDelete(scheduleID);
    return {
      status: "Ok",
      message: "Delete schedule successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

module.exports = {
  createSchedule,
  getAllSchedule,
  detailSchedule,
  updateSchedule,
  deleteSchedule
};
