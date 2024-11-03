const express = require("express")
const router = express.Router();
const scheduleController = require("../controllers/scheduleController")

router.post("/create-schedule",scheduleController.createSchedule)
router.get("/get-all", scheduleController.getAllSchedule)
router.get("/detail-schedule/:id", scheduleController.getDetailSchedule)
router.put("/update-schedule/:id", scheduleController.updateSchedule)
router.delete("/delete-schedule/:id", scheduleController.deleteSchedule)

module.exports = router