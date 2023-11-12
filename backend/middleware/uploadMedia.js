const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define allowed file types with their corresponding descriptions
const allowedFileTypes = {
    'text/csv': 'document',
};

// Define the path where uploaded files will be stored
const uploadPath = 'draw-chart/';

// Create the folder for file uploads if it doesn't exist
fs.mkdir(uploadPath, { recursive: true }, function (err) {
  if (err) {
    console.error('Error creating upload folder:', err);
  }
});

// Configure the storage settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Set the destination for uploaded files
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    const ext = path.extname(file.originalname);
    cb(null, file.originalname);
  },
});

// Set up multer with storage and file filter settings
const upload = multer({
  storage: storage, // Set the storage configuration
  fileFilter: function (req, file, cb) {
    // Define file type filtering based on allowed file types
    req.msgType = allowedFileTypes[file.mimetype];
    if (req.msgType) {
      cb(null, true); // Allow file upload
    } else {
      // In case of unsupported file type, set relevant flags and deny upload
      req.filetypeNotSupported = true;
      req.mimetype = file.mimetype;
      cb(null, false);
    }
  },
});

// Export the configured multer upload middleware for a single file
exports.uploadMedia = upload.single('file');
