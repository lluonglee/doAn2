const CourseService = require("../services/courseService");

const courseController = {
  createCourse: async (req, res) => {
    try {
      const {
        ma_lop_hoc_phan,
        si_so,
        so_tiet_truc_tiep,
        so_tiet_tong,
        loai_mon_hoc,
        tkb,
      } = req.body;
      if (
        !ma_lop_hoc_phan ||
        !si_so ||
        !loai_mon_hoc ||
        !so_tiet_truc_tiep ||
        !so_tiet_tong ||
        !tkb ||
        tkb.length === 0
      ) {
        return res.status(400).json({
          status: "ERR",
          message: "the input is required",
        });
      }
      const response = await CourseService.createCourse(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
  getAllCourse: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.name || ""; // Get the search query from the request
      const { data, totalPages, currentPage } =
        await CourseService.getAllCourse(page, limit, search);

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
  getDetailCourse: async (req, res) => {
    try {
      const courseIdDetail = req.params.id;

      if (!courseIdDetail) {
        return res.status(400).json({
          status: "ERR",
          message: "Course ID is required",
        });
      }

      const response = await CourseService.detailCourse(courseIdDetail);

      return res.status(200).json(response);
    } catch (err) {
      return {
        status: "ERR",
        message: err.message,
      };
    }
  },
  updateCourse: async (req, res) => {
    try {
      const courseId = req.params.id;
      const data = req.body;

      if (!courseId) {
        return res.status(400).json({
          status: "ERR",
          message: "Course ID is required",
        });
      }

      const response = await CourseService.updateCourse(courseId, data);

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
  //delete
  deleteCourse: async (req, res) => {
    try {
      const courseID = req.params.id;
      if (!courseID) {
        return res.status(400).json({
          status: "ERR",
          message: "not found Course",
        });
      }

      const response = await CourseService.deleteCourse(courseID);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        status: "ERR",
        message: err.message,
      });
    }
  },
  //assignTeacher
  // assignTeacher: async (req, res) => {
  //   const { teacherId, courseId } = req.body;
  //   try {
  //     const result = await CourseService.assignTeacher(teacherId, courseId);
  //     res.status(200).json(result);
  //   } catch (error) {
  //     return res.status(404).json({
  //       error: error.message,
  //     });
  //   }
  // },

  assignTeacher: async (req, res) => {
    const { scheduleId, classId, teacherId } = req.body;

    try {
      // Gọi service phân công giảng viên
      const result = await CourseService.assignTeacher(
        scheduleId,
        classId,
        teacherId
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error assigning teacher:", error.message);
      res.status(500).json({ status: "ERROR", message: error.message });
    }
  },

  assignDepartment: async (req, res) => {
    const { departmentId, courseId } = req.body;
    try {
      const result = await CourseService.assignDepartment(
        departmentId,
        courseId
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = courseController;
