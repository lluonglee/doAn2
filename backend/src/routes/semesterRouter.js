const express = require("express")
const router = express.Router();
const semesterController = require("../controllers/semesterController")

router.post("/create-semester", semesterController.createSemester)
router.get("/get-all", semesterController.getAllSemesters)
router.get("/detail-semester/:id", semesterController.getDetailSemester)
router.put("/update-semester/:id", semesterController.updateSemester)
router.delete("/delete-semester/:id", semesterController.deleteSemester)

module.exports = router