import express from 'express';
const router = express.Router()

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.status(200).json({ message: "Hello! 👋" })
})

export default router;
