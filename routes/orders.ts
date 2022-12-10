import express from 'express';
import AdminAuthorization from '../auth/admin_authorization';
import Authorization from '../auth/authorization';
import * as OrderController from '../controllers/orders.controller';
const router = express.Router()

// Rutas públicas
router.post('/', OrderController.createOrder);
// Rutas protegidas
router.get('/', AdminAuthorization, OrderController.getOrders);
router.get('/detail/:id', Authorization, OrderController.getOrderById);
router.post('/update-status', AdminAuthorization, OrderController.updateOrderStatus);

export default router;
