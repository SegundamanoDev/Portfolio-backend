const express = require("express");
const router = express.Router();
// Import the single handler function from the controller
const { submitContactForm } = require("../controllers/contactController");

// @route POST /api/v1/contact
// @desc Submit a new contact message (saves to DB and sends email notification)
router.route("/").post(submitContactForm);

module.exports = router;
