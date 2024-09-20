// backend\src\utils\multerConfig.ts
import multer from "multer";
import path from "path";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename
  },
});

// File filter function
const fileFilter = (req: any, file: any, cb: any) => {
  // Allowed file types
  const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];

  // Check if the file type is in the allowed list
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only audio files are allowed."), false); // Reject the file
  }
};

// Multer upload instance
export const upload = multer({
  storage,
  fileFilter, // Apply the file filter
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10 MB
  },
});
