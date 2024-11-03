const classTimeService = require("../services/classTimeService");

const classTimeController = {
  createClassTime: async (req, res) => {
    try {
      const { tenCa, buoi, thoiGian } = req.body;
      if (!tenCa || !buoi || !thoiGian ) {
        return res.status(400).json({
          status: "ERR",
          message: "The input is required",
        });
      }

      const response = await classTimeService.createClassTime(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
  getAllClassTimes: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const { data, totalPages, currentPage } =
        await classTimeService.getAllClassTimes(page, limit);

      res.status(200).json({
        status: "OK",
        data,
        currentPage,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error.message,
      });
    }
  },
  getClassTimeById: async (req, res) => {
    try {
      const classTimeDetail = req.params.id;
      if (!classTimeDetail) {
        return res.status(400).json({
          status: "ERR",
          message: "class time ID is required",
        });
      }

      const response = await classTimeService.getClassTimeById(classTimeDetail);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error.message,
      });
    }
  },

  updateClassTime: async (req, res) => {
    try {
      const classTimeId = req.params.id;
      const data = req.body;

      if (!classTimeId) {
        return res.status(400).json({
          status: "ERR",
          message: "class time ID is required",
        });
      }

      const response = await classTimeService.updateClassTime(
        classTimeId,
        data
      );

      if (response.status === "ERR") {
        return res.status(404).json(response);
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: "An error ocurred while updating the user",
        err: error.message,
      });
    }
  },

  deleteClassTime: async (req, res) => {
    try {
      const classTimeID = req.params.id;
      if (!classTimeID) {
        return res.status(400).json({
          status: "ERR",
          message: "not found class time id",
        });
      }

      const response = await classTimeService.deleteClassTime(classTimeID);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        status: "ERR",
        message: err.message,
      });
    }
  },
};

module.exports = classTimeController;
