const express = require("express")
const router = express.Router();
const { exportExcelBySemesterId } = require("../controllers/exportExcelController");

router.get("/export-excel/:semesterId", exportExcelBySemesterId);

module.exports = router