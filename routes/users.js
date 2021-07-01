var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');
const OrderController = require('../controllers/orders.controller');
var Authorization = require('../auth/authorization');

/* GET users listing. */
router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);
// Rutas protegidas
router.get('/', Authorization, UserController.getUsers);
router.get('/orders', Authorization, OrderController.getOrdersByUser);
router.get('/detail/:id', Authorization, UserController.getUserById);
router.put('/', Authorization, UserController.updateUser);
router.delete('/', Authorization, UserController.removeUsers);

module.exports = router;
