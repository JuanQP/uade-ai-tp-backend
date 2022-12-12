import express from 'express';
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import Authorization from '../auth/authorization';
import * as UploadController from '../controllers/upload.controller';
const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    console.log(req.url)
    if(req.url === "/product-image-upload") {
      cb(null, 'public/products')
      return
    }
    cb(null, 'public/avatars')
  },
  filename: (_req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

/* GET utils listing. */
router.get('/', function(_req, res, _next) {
  res.send('Utils listing')
})
router.post('/upload', Authorization, UploadController.uploadFiles)
router.post('/avatar-upload', Authorization, UploadController.uploadAvatar)
router.post('/product-image-upload', Authorization, upload.single('image'), UploadController.uploadProductImage)
router.post('/avatar-image-upload', Authorization, upload.single('image'), UploadController.uploadAvatarImage)

export default router
