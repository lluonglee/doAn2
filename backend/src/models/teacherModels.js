const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    ten: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //bộ phận chuyên môn
    khoa_chuyen_mon: { type: String, require: true },
    isAdmin: { type: Boolean, default: false, required: true },
    ghi_chu: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
