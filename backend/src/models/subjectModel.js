const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  ma_mon: {
    type: String,
  },
  ten_mon: {
    type: String,
    
  },
  so_tin_chi: {
    type: Number,
   
  },
  tin_chi_ly_thuyet: {
    type: Number,
   
  },
  tin_chi_thuc_hanh: {
    type: Number,
   
  },
  cac_lop_hoc_phan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
