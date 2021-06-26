var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', UserController.getUsers);
router.get('/detail/:id', UserController.getUserById);
router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);
router.put('/', UserController.updateUser);
router.delete('/', UserController.removeUsers);

module.exports = router;
