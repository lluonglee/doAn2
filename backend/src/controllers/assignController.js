const ScheduleService = require("../services/assignService");
const assignController = {
  assignCourseToSchedule: async (req, res) => {
    const { courseId, scheduleId } = req.body;
    try {
      const result = await ScheduleService.assignCourseToSchedule(
        courseId,
        scheduleId
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  assignClassTimeToSchedule: async (req, res) => {
    const { classTimeId, scheduleId } = req.body;
    try {
      const result = await ScheduleService.assignClassTimeToSchedule(
        classTimeId,
        scheduleId
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  assignClassRoomToSchedule: async (req, res) => {
    const { courseId, classRoomId, classTimeId, scheduleId } = req.body;
    try {
      const result = await ScheduleService.assignClassRoomToSchedule(
        courseId,
        classRoomId,
        classTimeId,
        scheduleId
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  assignTeacherToSchedule: async (req, res) => {
    const { teacherId, scheduleId } = req.body;
    try {
      const result = await ScheduleService.assignTeacherToSchedule(
        teacherId,
        scheduleId
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};
module.exports = assignController;
