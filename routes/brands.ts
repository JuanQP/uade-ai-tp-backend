import express from 'express';
import * as BrandController from '../controllers/brands.controller';
const router = express.Router()

/* GET home page. */
router.get('/', BrandController.getBrands)

export default router;
