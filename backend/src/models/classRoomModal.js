const mongoose = require("mongoose");
const classRoomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ClassRoom", classRoomSchema);
