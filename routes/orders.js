var express = require('express');
var router = express.Router();
const OrderController = require('../controllers/orders.controller');

/* GET users listing. */
router.get('/', OrderController.getOrders);
router.get('/detail/:id', OrderController.getOrderById);
router.post('/', OrderController.createOrder);

module.exports = router;
