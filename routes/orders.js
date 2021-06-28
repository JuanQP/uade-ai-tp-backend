var express = require('express');
var router = express.Router();
const OrderController = require('../controllers/orders.controller');
var Authorization = require('../auth/authorization');

/* GET users listing. */
router.post('/', OrderController.createOrder);
// Rutas protegidas
router.get('/', Authorization, OrderController.getOrders);
router.get('/detail/:id', Authorization, OrderController.getOrderById);

module.exports = router;
