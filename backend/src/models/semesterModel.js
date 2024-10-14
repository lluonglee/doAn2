const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  hoc_ky: {
    type: String,
    required: true,  // Ví dụ: "Học kỳ 1", "Học kỳ 2"
  },
  nam_hoc: {
    type: String,
    required: true,  // Ví dụ: "2023-2024"
  },
  cac_lop_hoc_phan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Tham chiếu đến Course
    },
  ],
});

module.exports = mongoose.model("Semester", semesterSchema);
