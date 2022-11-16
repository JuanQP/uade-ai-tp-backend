import express from 'express'
import Authorization from '../auth/authorization'
import * as UploadController from '../controllers/upload.controller'
const router = express.Router()

/* GET utils listing. */
router.get('/', function(_req, res, _next) {
  res.send('Utils listing')
})
router.post('/upload', Authorization, UploadController.uploadFiles)
router.post('/avatar-upload', Authorization, UploadController.uploadAvatar)

export default router
