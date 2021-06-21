var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/products.controller');

/* GET users listing. */
router.get('/', ProductController.getProducts);
router.get('/detail/:id', ProductController.getProductById);
router.get('/latest', ProductController.getLatestProducts);
router.get('/latest-sonido', ProductController.getLatestSonido);

module.exports = router;
