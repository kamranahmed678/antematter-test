// Function to validate a trading pair
exports.validatePair = (pair) => {
    // Regular expression pattern to match the pair
    const pairPattern = /^[A-Z0-9-_.]{1,20}$/;
    
    // Test if the provided 'pair' matches the defined pattern
    return pairPattern.test(pair); // Returns a boolean indicating whether the pair is valid or not
}
