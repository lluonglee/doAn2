const semesterService = require("../services/semesterService");

const semesterController = {
  createSemester: async (req, res) => {
    try {
      const { hoc_ky, nam_hoc } = req.body;
      if (!hoc_ky || !nam_hoc) {
        return res.status(400).json({
          status: "ERR",
          message: "The input is required",
        });
      }
      const response = await semesterService.createSemester(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  getAllSemesters: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || ""; // Get the search query from the request
      const { data, totalPages, currentPage } =
        await semesterService.getAllSemesters(page, limit, search);

      res.status(200).json({
        status: "OK",
        data,
        currentPage,
        totalPages,
      });
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: err.message,
      });
    }
  },

  getDetailSemester: async (req, res) => {
    try {
      const semesterIdDetail = req.params.id;

      if (!semesterIdDetail) {
        return res.status(400).json({
          status: "ERR",
          message: "Semester ID is required",
        });
      }

      const response = await semesterService.detailSemester(semesterIdDetail);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: "ERR",
        message: err.message,
      });
    }
  },

  updateSemester: async (req, res) => {
    try {
      const semesterId = req.params.id;
      const data = req.body;

      if (!semesterId) {
        return res.status(400).json({
          status: "ERR",
          message: "Semester ID is required",
        });
      }

      const response = await semesterService.updateSemester(semesterId, data);

      if (response.status === "ERR") {
        return res.status(404).json(response);
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: "An error occurred while updating the semester",
        err: error.message,
      });
    }
  },

  deleteSemester: async (req, res) => {
    try {
      const semesterID = req.params.id;
      if (!semesterID) {
        return res.status(400).json({
          status: "ERR",
          message: "Semester ID not found",
        });
      }

      const response = await semesterService.deleteSemester(semesterID);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        status: "ERR",
        message: err.message,
      });
    }
  },

  //assign Semester

  assignSemester: async (req, res) => {
    const { semesterId, courseId } = req.body;
    console.log("SemesterID:", semesterId);
    console.log("CourseID:", courseId);
    try {
      const result = await semesterService.assignSemester(semesterId, courseId);
      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = semesterController;
