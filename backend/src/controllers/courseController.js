
const CourseService = require("../services/courseService");

const courseController = {
  createCourse: async (req, res) => {
    try {
      const {
        ma_mon,
        ten_mon,
        ma_lop_hoc_phan,
        si_so,
        khoa_chuyen_mon,
        so_tiet_truc_tiep,
        so_tiet_tong,
        loai_mon_hoc,
        tin_chi_ly_thuyet,
        tin_chi_thuc_hanh,
        giang_vien_phu_trach
      } = req.body;
      if (
        !ma_mon ||
        !ten_mon ||
        !ma_lop_hoc_phan ||
        !si_so ||
        !loai_mon_hoc ||
        !so_tiet_truc_tiep ||
        !so_tiet_tong ||
        !tin_chi_ly_thuyet ||
        !so_tiet_truc_tiep ||
        !khoa_chuyen_mon ||
        !tin_chi_thuc_hanh ||
        !giang_vien_phu_trach

     
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

      return{
        status: "ERR",
        message: err.message
      }
    }
  },
};

module.exports = courseController