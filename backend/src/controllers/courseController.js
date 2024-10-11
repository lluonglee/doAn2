const CourseService = require("../services/courseService");

const courseController = {
  createCourse: async (req, res) => {
    try {
      const {
        ma_lop_hoc_phan,
        si_so,
        khoa_chuyen_mon,
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
        !khoa_chuyen_mon ||
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
      const getAll = await CourseService.getAllCourse();
      return res.status(200).json(getAll);
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
  assignTeacher: async (req, res) => {
    const { teacherId, courseId } = req.body;
    try {
      const result = await CourseService.assignTeacher(teacherId, courseId);
      res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = courseController;
