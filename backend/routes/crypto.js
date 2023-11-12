const express = require('express');
const router = express.Router();

// Import the 'fetchPrice' function from the 'crypto' controller
const { fetchPrice } = require('../controller/crypto');

// Define a route to fetch the price
router.get('/fetch-price', fetchPrice);
// This route handles a GET request to fetch the price using the 'fetchPrice' controller function

module.exports = router;
// Export the configured router to be used in the main application
