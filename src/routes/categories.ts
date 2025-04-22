import express from 'express';
import { 
  getAllCategories, 
  getSingleCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory } from '../controller/categoryController';
const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getSingleCategory)
router.post('/', createCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router;