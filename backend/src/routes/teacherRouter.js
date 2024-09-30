const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController")

router.post("/sign-up",teacherController.createTeacher)
router.get("/get-all", teacherController.getAllTeacher)


module.exports = router;