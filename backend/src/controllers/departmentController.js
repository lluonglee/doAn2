const DepartmentService = require("../services/departmentService");

const departmentController = {
  createDepartment: async (req, res) => {
    try {
      const { ma_khoa, ten_khoa } = req.body;
      if (!ma_khoa || !ten_khoa) {
        return res.status(400).json({
          status: "ERR",
          message: "the input is required",
        });
      }
      const response = await DepartmentService.createDepartment(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
  getAllDepartment: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || ""; // Get the search query from the request
      const { data, totalPages, currentPage } =
        await DepartmentService.getAllDepartment(page, limit, search);

      res.status(200).json({
        status: "OK",
        data,
        currentPage,
        totalPages,
      });
    } catch (err) {
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
  getDetailDepartment: async (req, res) => {
    try {
      const departmentIdDetail = req.params.id;

      if (!departmentIdDetail) {
        return res.status(400).json({
          status: "ERR",
          message: "department ID is required",
        });
      }

      const response = await DepartmentService.detailDepartment(
        departmentIdDetail
      );

      return res.status(200).json(response);
    } catch (err) {
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
  updateDepartment: async (req, res) => {
    try {
      const departmentId = req.params.id;
      const data = req.body;

      if (!departmentId) {
        return res.status(400).json({
          status: "ERR",
          message: "Course ID is required",
        });
      }

      const response = await DepartmentService.updateDepartment(
        departmentId,
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
  deleteDepartment: async (req, res) => {
    try {
      const departmentID = req.params.id;
      if (!departmentID) {
        return res.status(400).json({
          status: "ERR",
          message: "not found department",
        });
      }

      const response = await DepartmentService.deleteDepartment(departmentID);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        status: "ERR",
        message: err.message,
      });
    }
  },
  assignDepartmentToTeacher: async (req, res) => {
    const { departmentId, teacherId } = req.body;
    try {
      const result = await DepartmentService.assignDepartmentToTeacher(
        departmentId,
        teacherId
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};
module.exports = departmentController;
