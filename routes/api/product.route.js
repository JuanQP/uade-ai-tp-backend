var express = require('express')
var router = express.Router()
var ProductController = require('../../controllers/products.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/product.routes');
  });
router.get('/',Authorization, ProductController.getProducts)

// Export the Router
module.exports = router;
