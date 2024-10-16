const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courseController")
const subjectController = require("../controllers/subjectController");
const semesterController = require("../controllers/semesterController")

router.post("/assign-teacher", courseController.assignTeacher)
router.post("/assign-course", subjectController.assignCourse)
router.post("/assign-department",courseController.assignDepartment)
router.post("/assign-semester",semesterController.assignSemester)

module.exports = router