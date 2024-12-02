const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
  classes: [
    {
      ma_lop_hoc_phan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      classTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CaHoc",
      },
      rooms: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassRoom",
      },
      giang_vien_phu_trach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    },
  ],
  dayOfWeek: {
    type: String,
    required: true,
    enum: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật","Ngoài giờ học"],
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
