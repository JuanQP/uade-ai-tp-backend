var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');
var Authorization = require('../auth/authorization');

/* GET users listing. */
router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);
// Rutas protegidas
router.get('/', Authorization, UserController.getUsers);
router.get('/detail/:id', Authorization, UserController.getUserById);
router.put('/', Authorization, UserController.updateUser);
router.delete('/', Authorization, UserController.removeUsers);

module.exports = router;
