import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// File size limit in bytes (5MB in this example)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Multer storage configuration (memory storage for S3 upload)
const storage = multer.memoryStorage();

// File filter for validating allowed file types (images only)
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  // Allowed mime types
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE, // Set file size limit (5MB)
  },
  fileFilter,
});

export default upload;
