import multer from 'multer';
import path from 'path';

// Define acceptable file types (JPEG, JPG, PNG)
const fileTypes = /jpeg|jpg|png/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/phones/'); // Specify the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Validate extension
    const mimetype = fileTypes.test(file.mimetype); // Validate MIME type

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG images are allowed'));
    }
  },
});

export default upload;
