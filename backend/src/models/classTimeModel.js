const mongoose = require('mongoose');

const classTimeSchema = new mongoose.Schema({
  tenCa: {
    type: String,
    required: true,
  },
  buoi: {
    type: String,
    enum: ['Sáng', 'Chiều', 'Tối'], 
  },
  thoiGian: {
    type: String,
    required: true,
  },
  ghi_chu: {
    type: String,
  },
});

module.exports = mongoose.model('CaHoc', classTimeSchema);
