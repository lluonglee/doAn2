const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController")
const middlewareController = require("../middleware/authMiddleWare")

router.post("/sign-up",teacherController.createTeacher)
router.post("/login", teacherController.loginTeacher)
router.post("/logout",middlewareController.verifyToken,teacherController.logoutTeacher)
router.get("/get-all", teacherController.getAllTeacher)
router.get("/get-detail/:id",middlewareController.verifyTokenAdmin, teacherController.getDetailTeacher)
router.put("/update-teacher/:id", teacherController.updateTeacher)
router.delete("/delete-teacher/:id", teacherController.deleteTeacher)

module.exports = router;