import path from "path";
import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".mp4",
      ".gif",
    ];
    if (!allowedExtensions.includes(ext)) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
