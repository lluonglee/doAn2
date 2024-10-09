const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
  ten_khoa: {
    type: String,
    required: true,
  },
  giang_vien_trong_khoa: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  ],
  cac_mon_hoc: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
});

module.exports = mongoose.model('Department', departmentSchema);
