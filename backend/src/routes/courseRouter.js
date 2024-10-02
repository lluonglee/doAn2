const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courseController")

router.post("/create-course", courseController.createCourse)
router.get("/get-all", courseController.getAllCourse)

module.exports = router
