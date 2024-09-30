const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController")

router.post("/sign-up",teacherController.createTeacher)


module.exports = router;