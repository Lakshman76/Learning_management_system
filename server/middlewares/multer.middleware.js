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
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".webp" &&
      ext !== ".jpg" &&
      ext !== ".mp4" &&
      ext !== ".gif"
    ) {
      cb(new Error(`unsuported file type! ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
