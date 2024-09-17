import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req: Request, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
