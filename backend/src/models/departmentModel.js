const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
  ma_khoa: {
    type: String,
    required: true,
  },
  ten_khoa: {
    type: String,
    required: true,
  },
  ghi_chu: {
    type: String,
  },
  giang_vien_trong_khoa: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  cac_mon_hoc: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

module.exports = mongoose.model("Department", departmentSchema);
