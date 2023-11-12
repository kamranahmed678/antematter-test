const express = require('express');
const router = express.Router();

// Importing functions from the 'general' controller
const { getHelp, getAbout } = require('../controller/general');

// Define routes for '/help' and '/about' endpoints
router.get('/help', getHelp); // GET request to fetch help information
router.get('/about', getAbout); // GET request to fetch about information

module.exports = router; // Export the configured router to be used in the main app
