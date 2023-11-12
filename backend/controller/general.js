// Function to provide information about available commands
exports.getHelp = async (req, res, next) => {
    try {
        // Respond with a JSON object listing available commands and their descriptions
        res.status(200).json({
            success: true,
            commands: {
                "help": "Show available commands",
                "about": "Display information about this CLI",
                "fetch-price [coin]": "Fetch the current price of a specified cryptocurrency",
                "upload": "Opens the file explorer to allow uploading csv files only.",
                "draw [file] [columns]": "Draws the chart of the specified columns of the file present in the draw-chart directory."
            }
        });
    } catch (err) {
        next(err); // Pass any encountered errors to the error-handling middleware
    }
}

// Function to provide information about the CLI
exports.getAbout = async (req, res, next) => {
    try {
        // Respond with a JSON object containing details about the CLI version and description
        res.status(200).json({
            success: true,
            about: {
                "version": "1.0",
                "description": "This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities."
            }
        });
    } catch (err) {
        next(err); // Pass any encountered errors to the error-handling middleware
    }
}
