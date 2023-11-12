const fs = require('fs');
const CsvReadableStream = require('csv-reader');

// Function to handle the uploaded file
exports.uploadFile = async (req, res, next) => {
    try {
        const { file, filetypeNotSupported } = req;

        if (!file) {
            // If no file is present, return an appropriate error or warning
            res.status(400).json({
                success: false,
                message: filetypeNotSupported == true ? "Invalid file format" : "No file was uploaded"
            });
        } else {
            // If the file is uploaded, respond with a success message
            res.status(201).json({
                success: true,
                message: `${file.originalname} has been uploaded successfully.`
            });
        }
    } catch (err) {
        next(err); // Pass any encountered errors to the error-handling middleware
    }
};

// Function to delete a specified file
exports.deleteFile = async (req, res, next) => {
    try {
        const { fileName } = req.query;
        const path = `draw-chart/${fileName}`;

        if (!fileName) {
            // If no file name is specified, return an error
            return res.status(400).json({ success: false, message: "No file name was specified" });
        }

        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                // If the file is not found, return an error
                return res.status(404).json({ success: false, message: "File not found" });
            }

            fs.unlink(path, (err) => {
                if (err) {
                    // If there's an error in deleting the file, return an error message
                    return res.status(500).json({ success: false, message: "Error deleting the file" });
                }
                // If the file is deleted successfully, return a success message
                return res.status(200).json({ success: true, message: "File deleted successfully" });
            });
        });
    } catch (err) {
        next(err); // Pass any encountered errors to the error-handling middleware
    }
};

// Function to draw a chart based on data from a CSV file
exports.drawChart = async (req, res, next) => {
    try {
        const { fileName, column1, column2 } = req.body;
        const path = `draw-chart/${fileName}`;

        if (!fileName) {
            // If no file name is specified, return an error
            return res.status(400).json({ success: false, message: "No file name was specified" });
        }
        if (!column1 || !column2) {
            // If the columns are not properly specified, return an error
            return res.status(400).json({ success: false, message: "Columns weren't properly specified" });
        }

        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                // If the specified file is not found, return an error
                return res.status(404).json({ success: false, message: `File "${fileName}" not found` });
            }

            let headers = null;
            const data = [];

            let inputStream = fs.createReadStream(path, 'utf8');

            inputStream
                .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
                .on('data', function (row) {
                    if (!headers) {
                        headers = row;
                    } else {
                        data.push({
                            name: row[headers.indexOf(column1)],
                            value: row[headers.indexOf(column2)]
                        });
                    }
                })
                .on('end', function () {
                    if (!headers.includes(column1)) {
                        // If column1 does not exist in the file, return an error
                        return res.status(400).json({ success: false, message: `Column ${column1} doesn't exist in the file "${fileName}".` });
                    } else if (!headers.includes(column2)) {
                        // If column2 does not exist in the file, return an error
                        return res.status(400).json({ success: false, message: `Column ${column2} doesn't exist in the file "${fileName}".` });
                    } else if ((typeof (data[0].name) !== "number") && (typeof (data[0].value) !== "number")) {
                        // If the specified columns are not numeric, return an error
                        return res.status(400).json({ success: false, message: `One of the specified columns has to be numeric.` });
                    } else {
                        // If all conditions pass, return success and the extracted data
                        return res.status(200).json({ success: true, data: data });
                    }
                });
        });
    } catch (err) {
        console.log(err);
        next(err); // Pass any encountered errors to the error-handling middleware
    }
};
