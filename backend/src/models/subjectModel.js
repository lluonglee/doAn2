const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  ma_mon: {
    type: String,
    required: true,
  },
  ten_mon: {
    type: String,
    required: true,
  },
  so_tin_chi: {
    type: Number,
    required: true,
  },
  tin_chi_ly_thuyet: {
    type: Number,
    required: true,
  },
  tin_chi_thuc_hanh: {
    type: Number,
    required: true,
  },
  cac_lop_hoc_phan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
