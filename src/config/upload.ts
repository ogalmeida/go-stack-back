import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const tempPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempPath,
  storage: multer.diskStorage({
    destination: tempPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
