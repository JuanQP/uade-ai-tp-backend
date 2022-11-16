import express from 'express'
import AdminAuthorization from '../auth/admin_authorization'
import * as ProductController from '../controllers/products.controller'
const router = express.Router()

// Rutas públicas
router.get('/', ProductController.getProducts)
router.get('/detail/:id', ProductController.getProductById)
router.get('/latest', ProductController.getLatestProducts)
router.get('/latest-sonido', ProductController.getLatestSonido)
router.get('/filters', ProductController.getFilters)
// Rutas para admin
router.put('/', AdminAuthorization, ProductController.updateProduct)
router.delete('/', AdminAuthorization, ProductController.deleteProductsById)
router.post('/', AdminAuthorization, ProductController.createProduct)

export default router
