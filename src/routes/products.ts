import express from 'express';
import { 
  getAllProducts, 
  getSingleProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct } from '../controller/productController';
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.post('/', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router;