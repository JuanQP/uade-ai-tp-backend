var express = require('express')
var router = express.Router()
var OrderController = require('../../controllers/orders.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/order.routes');
  });
router.get('/',Authorization, OrderController.getOrders)

// Export the Router
module.exports = router;
