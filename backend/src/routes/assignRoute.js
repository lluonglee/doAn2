const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courseController")
const subjectController = require("../controllers/subjectController");

router.post("/assign-teacher", courseController.assignTeacher)
router.post("/assign-course", subjectController.assignCourse)

module.exports = router