const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
  ma_lop_hoc_phan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  ma_mon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  ten_mon: {
    type: String,
    required: true,
  },
  giang_vien_phu_trach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
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
});

module.exports = mongoose.model('Schedule', scheduleSchema);
