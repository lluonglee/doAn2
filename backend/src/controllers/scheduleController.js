const ScheduleService = require("../services/scheduleService");
const scheduleController = {
  createSchedule: async (req, res) => {
    try {
      const { dayOfWeek } = req.body;
      if (!dayOfWeek) {
        return res.status(400).json({
          status: "ERR",
          message: "the input is required",
        });
      }
      const response = await ScheduleService.createSchedule(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
  getAllSchedule: async (req, res) => {
    try {
      const getAll = await ScheduleService.getAllSchedule();
      return res.status(200).json(getAll);
    } catch (err) {
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
  
};

module.exports = scheduleController;
