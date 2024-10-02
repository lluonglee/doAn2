const Course = require("../models/courseModel");

const createCourse = async (newCourse) => {
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
  } = newCourse;
  try {
    const existingCourse = await Course.findOne({ ma_mon });
    if (existingCourse) {
      return {
        status: "ERR",
        message: "This ma mon has already been used",
      };
    }

    const createCourse = await Course.create({
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
    });

    return {
      status: "OK",
      message: "Course created successfully",
      data: createCourse,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllCourse = async () =>{
  try{
    const getAll = await Course.find();
    return{
      status:"OK",
      message:"get all course Successful",
      data: getAll
    }

  }catch(err){
    return{
      status:"ERR",
      message: err.message
    }

  }
 }
 const detailCourse = async (id) => {
  try {
    const course = await Course.findById(id);

    if (!course) {
      return {
        status: "ERR",
        message: "the Course not found",
      };
    }

    return{
      status:"OK",
      message:"Successfully",
      data: course
    }
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const updateCourse = async (id, data) => {
  try {
    const existingCourse = await Course.findById(id);

    if (!existingCourse) {
      return {
        status: "ERR",
        message: "Course not found",
      };
    }

    const updateCourse = await Course.findByIdAndUpdate(id, data, { new: true });
    return {
      status: "Ok",
      message: "Course updated successfully",
      data: updateCourse,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
module.exports = {
  createCourse,
  getAllCourse,
  detailCourse,
  updateCourse
};
