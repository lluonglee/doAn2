const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.post("/create-subject",subjectController.createSubject)
router.get("/getAll-subject",subjectController.getAllSubject)
router.get("/get-detail/:id",subjectController.getDetailSubject)
router.put("/update-subject/:id",subjectController.updateSubject)
router.delete("/delete-subject/:id",subjectController.deleteSubject)


module.exports = router