var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/products.controller');
var Authorization = require('../auth/authorization');
var AdminAuthorization = require('../auth/admin_authorization');

// Rutas públicas
router.get('/', ProductController.getProducts);
router.get('/detail/:id', ProductController.getProductById);
router.get('/latest', ProductController.getLatestProducts);
router.get('/latest-sonido', ProductController.getLatestSonido);
router.get('/filters', ProductController.getFilters);
// Rutas para admin
router.put('/', AdminAuthorization, ProductController.updateProduct);
router.delete('/', AdminAuthorization, ProductController.deleteProductsById);
router.post('/', AdminAuthorization, ProductController.createProduct);

module.exports = router;
