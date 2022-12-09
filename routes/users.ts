import express from 'express'
import AdminAuthorization from '../auth/admin_authorization'
import Authorization from '../auth/authorization'
import * as OrderController from '../controllers/orders.controller'
import * as UserController from '../controllers/users.controller'
const router = express.Router();

// Rutas públicas
router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);
// Rutas con login
router.get('/orders', Authorization, OrderController.getOrdersByUser);
router.get('/detail/', Authorization, UserController.getActualUser);
router.patch('/detail', Authorization, UserController.updateActualUser);
// Rutas para admin
router.get('/', AdminAuthorization, UserController.getUsers);
router.put('/', AdminAuthorization, UserController.updateUser);
router.delete('/', AdminAuthorization, UserController.removeUsers);

export default router;
