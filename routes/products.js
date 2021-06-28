var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/products.controller');
var Authorization = require('../auth/authorization');

/* GET users listing. */
router.get('/', ProductController.getProducts);
router.get('/detail/:id', ProductController.getProductById);
router.get('/latest', ProductController.getLatestProducts);
router.get('/latest-sonido', ProductController.getLatestSonido);
router.get('/filters', ProductController.getFilters);
// Rutas protegidas
router.put('/', Authorization, ProductController.updateProduct);
router.delete('/', Authorization, ProductController.deleteProductsById);
router.post('/', Authorization, ProductController.createProduct);

module.exports = router;
