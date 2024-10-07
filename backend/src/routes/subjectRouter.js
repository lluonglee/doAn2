const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.post("/create-subject",subjectController.createSubject)
router.get("/getAll-subject",subjectController.getAllSubject)

module.exports = router