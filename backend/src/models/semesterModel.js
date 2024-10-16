const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  hoc_ky: {
    type: String,
    required: true, 
  },
  nam_hoc: {
    type: String,
    required: true, 
  },
  cac_lop_hoc_phan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("Semester", semesterSchema);
