// Import required modules and dependencies
const express = require('express');
const cors = require('cors');

// Import custom configuration and route modules
const config = require('./config');
const generalRoute = require('./routes/general');
const cryptoRoute = require('./routes/crypto');
const fileRoute = require('./routes/file');

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware for handling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define a basic route to indicate server running status
app.get('/', (req, res) => res.status(200).json({ success: true }));

// Set up different routes using imported route modules
app.use('/general', generalRoute);
app.use('/crypto', cryptoRoute);
app.use('/file', fileRoute);

// Error handling middleware for the application
app.use((error, req, res, next) => {
    console.log(error);
    res.json({
        success: false,
        error: error.message,
    });
});

// Attempt to start the server and handle any errors
try {
    const server = app.listen(config.port, () => console.log('Server Started', config.port));
} catch (error) {
    console.error('Error starting the server:', error);
}
