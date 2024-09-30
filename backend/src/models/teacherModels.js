const mongoose = require("mongoose")

const teacherSchema  = new mongoose.Schema({
    ten:{type:String},
    email:{type: String, required: true, unique:true},
    password:{type:String, required: true},
    //bộ phận chuyên môn
    khoa_chuyen_mon: {type:String},
    isAdmin:{type: Boolean, default: false, required: true},
    cac_lop_dang_day:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]

})

module.exports = mongoose.model('Teacher',teacherSchema)