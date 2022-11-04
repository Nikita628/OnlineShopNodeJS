import multer from "multer";
import crypto from "crypto";
import path from "path";

export function fileStorage(dirName: string, fieldName: string) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join('files', dirName));
    },
    filename: (req, file, cb) => {
      cb(null, `${crypto.randomUUID()}-${file.originalname}`);
    },
  });

  return multer({ storage: storage }).single(fieldName);
}
