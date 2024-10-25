const express = require("express")
const router = express.Router();
const classTimeController = require("../controllers/classTimeController")
router.post("/create-classTime", classTimeController.createClassTime)
router.get("/get-all", classTimeController.getAllClassTimes)
router.get("/detail-time/:id", classTimeController.getClassTimeById)
router.put("/update-time/:id", classTimeController.updateClassTime)
router.delete("/delete-time/:id", classTimeController.deleteClassTime)

module.exports = router