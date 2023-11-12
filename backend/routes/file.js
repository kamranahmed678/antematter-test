const express = require('express');
const router = express.Router();

// Import middleware and controller functions
const { uploadMedia } = require('./../middleware/uploadMedia');
const { uploadFile, deleteFile, drawChart } = require('./../controller/file');

// Define routes and associate them with respective controller functions
router.post('/upload', uploadMedia, uploadFile);
// POST request to upload a file, utilizing 'uploadMedia' middleware before handling by 'uploadFile' controller function

router.delete('/delete', deleteFile);
// DELETE request to delete a file, handled by the 'deleteFile' controller function

router.post('/draw', drawChart);
// POST request to draw a chart, handled by the 'drawChart' controller function

module.exports = router; // Export the configured router for use in the main application
