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

  getDetailSchedule: async (req, res) => {
    try {
      const scheduleIdDetail = req.params.id;

      if (!scheduleIdDetail) {
        return res.status(400).json({
          status: "ERR",
          message: "schedule ID is required",
        });
      }

      const response = await ScheduleService.detailSchedule(
        scheduleIdDetail
      );

      return res.status(200).json(response);
    } catch (err) {
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const scheduleId = req.params.id;
      const data = req.body;

      if (!scheduleId) {
        return res.status(400).json({
          status: "ERR",
          message: "schedule ID is required",
        });
      }

      const response = await ScheduleService.updateSchedule(
        scheduleId,
        data
      );

      if (response.status === "ERR") {
        return res.status(404).json(response);
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: "An error ocurred while updating the schedule",
        err: error.message,
      });
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const scheduleID = req.params.id;
      if (!scheduleID) {
        return res.status(400).json({
          status: "ERR",
          message: "not found schedule",
        });
      }

      const response = await ScheduleService.deleteSchedule(scheduleID);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        status: "ERR",
        message: err.message,
      });
    }
  },
};

module.exports = scheduleController;
