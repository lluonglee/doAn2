const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courseController")

router.post("/create-course", courseController.createCourse)

module.exports = router
