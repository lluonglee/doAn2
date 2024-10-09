const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema({
    token: {type: String, required: true},
    expireAt:{type: Date, required: true}
});

module.exports = mongoose.model("BlackList", blackListSchema)