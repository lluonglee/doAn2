const express = require("express")
const router = express.Router();
const scheduleController = require("../controllers/scheduleController")

router.post("/create-schedule",scheduleController.createSchedule)
router.get("/get-all", scheduleController.getAllSchedule)
// router.get("/detail-department/:id", departmentController.getDetailDepartment)
// router.put("/update-department/:id", departmentController.updateDepartment)
// router.delete("/delete-department/:id", departmentController.deleteDepartment)

module.exports = router