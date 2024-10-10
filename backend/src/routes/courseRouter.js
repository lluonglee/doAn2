const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courseController")

router.post("/create-course", courseController.createCourse)
router.get("/get-all", courseController.getAllCourse)
router.get("/detail-course/:id", courseController.getDetailCourse)
router.put("/update-course/:id", courseController.updateCourse)
router.delete("/delete-course/:id", courseController.deleteCourse)

router.post("/assign-teacher", courseController.assignTeacher)
module.exports = router
