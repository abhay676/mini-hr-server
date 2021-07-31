import multer from 'multer';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './resume';
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },

  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    // cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    let pathExtension = path.extname(file.originalname);
    pathExtension = pathExtension.toLowerCase();
    cb(
      null,
      `${req.user.fullname}-${req.user.designation}-${Date.now()}${pathExtension}`
    );
  },
});
const upload = multer({ storage });
export default upload;
