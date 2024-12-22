const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courseController")
const subjectController = require("../controllers/subjectController");
const semesterController = require("../controllers/semesterController")
const departmentController = require("../controllers/departmentController")
const assignController = require("../controllers/assignController")


router.post("/assign-teacher", courseController.assignTeacher)
router.post("/assign-course", subjectController.assignCourse)
router.post("/assign-department",courseController.assignDepartment)
router.post("/assign-semester",semesterController.assignSemester)
router.post("/assign-departmentToTeacher", departmentController.assignDepartmentToTeacher)
router.post("/assign-courseToSchedule", assignController.assignCourseToSchedule)
router.post("/assign-classTimeToSchedule", assignController.assignClassTimeToSchedule)
router.post("/assign-teacherToSchedule", assignController.assignTeacherToSchedule)
router.post("/assign-classRoomToSchedule", assignController.assignClassRoomToSchedule);
router.post("/assign-teacherToCourse", assignController.assignTeacherToCourse);


module.exports = router