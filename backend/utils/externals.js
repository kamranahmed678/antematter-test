const axios = require('axios');

// Function to fetch the average price of a trading pair from Binance API
exports.getPrice = async (pair) => {
    try {
        // Make a GET request to Binance API to fetch the average price for the given trading pair
        const response = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${pair}`);
        return response; // Return the response data
    } catch (error) {
        console.log("error"); // Log an error message
        return error.response; // Return the error response in case of an error
    }
}
