import express from 'express';
import { 
  getAllCategories, 
  getSingleCategory,
  getAllProductsFromCategory,
  createCategory, 
  updateCategory, 
  deleteCategory } from '../controller/categoryController';
const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getSingleCategory)
router.get('/:id/products', getAllProductsFromCategory)
router.post('/', createCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router;