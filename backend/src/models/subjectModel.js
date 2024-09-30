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
  cac_lop_hoc_phan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
}) 

module.exports = mongoose.model('Subject', subjectSchema);