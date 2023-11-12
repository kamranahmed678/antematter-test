// Importing external utilities and validation functions
const { getPrice } = require('./../utils/externals');
const { validatePair } = require('../utils/validations.js');

// Function to fetch the price of a cryptocurrency pair
exports.fetchPrice = async (req, res, next) => {
    try {
        // Extract the 'pair' from the request query parameters
        const { pair } = req.query;

        // Validate the format of the 'pair'
        const isValid = validatePair(pair);

        if (!isValid) {
            // If the pair format is invalid, return an error response
            return res.status(400).json({
                success: false,
                message: "Invalid pair format"
            });
        }

        // Fetch the price of the specified pair using an external utility function
        const price = await getPrice(pair);

        if (price.status == 200) {
            // If the request to fetch the price is successful, return the price
            res.status(200).json({
                success: true,
                price: price?.data?.price
            });
        } else {
            // If there's an error in fetching the price, handle different scenarios and provide relevant error messages
            res.status(400).json({
                success: false,
                message: price.status == 400 ? "Invalid Pair" : "Something went wrong"
            });
        }
    } catch (err) {
        next(err); // Pass any encountered errors to the error-handling middleware
    }
}
