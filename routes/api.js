/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var products = require('./api/product.route')

router.use('/users', users);
router.use('/products', products);

module.exports = router;
