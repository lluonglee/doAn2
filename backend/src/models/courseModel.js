const mongoose = require("mongoose");

//Schema lớp học phần
const courseSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject", // Tham chiếu đến Subject
    required: true,
  },
  ma_lop_hoc_phan: {
    type: String,
    required: true,
  },
  si_so: {
    type: Number,
    required: true,
  },
  khoa_chuyen_mon: {
    type: String,
    required: true,
  },
  so_tiet_truc_tiep: {
    type: Number,
    required: true,
  },
  so_tiet_tong: {
    type: Number,
    required: true,
  },
  loai_mon_hoc: {
    type: String,
    enum: ["Lý thuyết", "Thực hành"],
    required: true,
  },
  tkb: [
    {
      thu: {
        type: String,
        required: true,
      },
      tiet: {
        type: String,
        required: true,
      },
      gio: {
        type: String,
        required: true,
      },
    },
  ],
  giang_vien_phu_trach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

module.exports = mongoose.model('Course', courseSchema);