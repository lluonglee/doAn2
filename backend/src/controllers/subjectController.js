const SubjectService = require("../services/subjectService");

const subjectController = {
  createSubject: async (req, res) => {
    try {
      const {
        ma_mon,
        ten_mon,
        so_tin_chi,
        tin_chi_ly_thuyet,
        tin_chi_thuc_hanh,
      } = req.body;
      if (
        !ma_mon ||
        !ten_mon ||
        !so_tin_chi ||
        !tin_chi_ly_thuyet ||
        !tin_chi_thuc_hanh
      ) {
        return res.status(400).json({
          status: "ERR",
          message: "the input is required",
        });
      }
      const response = await SubjectService.CreateSubject(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
  getAllSubject: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default page 1
      const limit = parseInt(req.query.limit) || 5; // Default limit 10
      const search = req.query.search || ""; // Get the search query from the request
      const getAll = await SubjectService.getAllSubject({
        page,
        limit,
        search,
      });
      return res.status(200).json(getAll);
    } catch (err) {
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
  getDetailSubject: async (req, res) => {
    try {
      const subjectIdDetail = req.params.id;

      if (!subjectIdDetail) {
        return res.status(400).json({
          status: "ERR",
          message: "subject ID is required",
        });
      }

      const response = await SubjectService.detailSubject(subjectIdDetail);

      return res.status(200).json(response);
    } catch (err) {
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
  updateSubject: async (req, res) => {
    try {
      const subjectId = req.params.id;
      const data = req.body;

      if (!subjectId) {
        return res.status(400).json({
          status: "ERR",
          message: "Course ID is required",
        });
      }

      const response = await SubjectService.updateSubject(subjectId, data);

      if (response.status === "ERR") {
        return res.status(404).json(response);
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: "An error ocurred while updating the subject",
        err: error.message,
      });
    }
  },
  //delete
  deleteSubject: async (req, res) => {
    try {
      const subjectID = req.params.id;
      if (!subjectID) {
        return res.status(400).json({
          status: "ERR",
          message: "not found subject",
        });
      }

      const response = await SubjectService.deleteSubject(subjectID);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        status: "ERR",
        message: err.message,
      });
    }
  },

  //assign course
  assignCourse: async (req, res) => {
    const { subjectId, courseId } = req.body;
    try {
      const result = await SubjectService.assignCourse(subjectId, courseId);
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = subjectController;
