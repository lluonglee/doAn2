const express = require("express")
const router = express.Router();
const classRoomController = require("../controllers/classRoomController")
router.post("/create-classRoom", classRoomController.createClassRoom)
router.get("/get-all", classRoomController.getAllClassRoom)
router.get("/detail-room/:id", classRoomController.getDetailClassRoom)
router.put("/update-room/:id", classRoomController.updateClassRoom)
router.delete("/delete-room/:id", classRoomController.deleteClassRoom)

module.exports = router