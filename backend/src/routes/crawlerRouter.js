const express = require("express")
const router = express.Router();

const { getTimetable } = require('../controllers/crawlerController'); // Correct path to your controller
// Define POST route to trigger crawling
router.post("/crawler", getTimetable);

module.exports = router
