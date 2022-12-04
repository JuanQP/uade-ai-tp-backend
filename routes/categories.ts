import express from 'express';
import * as CategoryController from '../controllers/categories.controller';
const router = express.Router()

/* GET home page. */
router.get('/', CategoryController.getCategories)

export default router;
