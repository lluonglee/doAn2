const express = require("express")
const router = express.Router();
const departmentController = require("../controllers/departmentController")

router.post("/create-department", departmentController.createDepartment)
router.get("/get-all", departmentController.getAllDepartment)
router.get("/detail-department/:id", departmentController.getDetailDepartment)
router.put("/update-department/:id", departmentController.updateDepartment)
router.delete("/delete-department/:id", departmentController.deleteDepartment)

module.exports = router