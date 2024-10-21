const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    ten: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //bộ phận chuyên môn
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    isAdmin: { type: Boolean, default: false, required: true },
    ghi_chu: { type: String },
    cac_lop_dang_day: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
