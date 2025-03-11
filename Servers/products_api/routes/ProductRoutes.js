import express from 'express'
import * as productController from '../controllers/ProductController.js'

const router = express.Router()

router.get('/products', productController.getAllproducts)

router.get('/products/:id', productController.getproductById)

router.post('/products', productController.createproduct)

router.put('/products/:id', productController.updateproduct)

router.delete('/products/:id', productController.deleteproduct)

export default router