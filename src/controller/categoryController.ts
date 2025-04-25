import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ICategory } from "../models/ICategory";
import { IProduct } from "../models/IProduct";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<ICategory[]>('SELECT * FROM categories')

        res.json(rows)
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const getSingleCategory = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const sql = `
        SELECT * FROM categories 
        WHERE id = ?
      `
      const [rows] = await db.query<ICategory[]>(sql, [id])
      const category = rows[0];
      if (!category) {
        res.status(404).json({message: 'category not found'})
        return;
      }
      res.json(category)
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const getAllProductsFromCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id

    try {
        const sql = `
        SELECT products.id, products.title, categories.name FROM categories
        JOIN products_categories ON products_categories.category_id = categories.id
        JOIN products ON products_categories.product_id = products.id
        WHERE categories.id = ?
        `

        const [rows] = await db.query<IProduct[]>(sql, [categoryId])

        if (rows.length === 0) {
            res.status(404).json({ message: 'Category not found or has no products' })
            return
        }

        res.json(rows) // Returnera hela listan av produkter
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({ error: message })
    }
}

export const createCategory = async (req: Request, res: Response) => {
    const name = req.body.name;

    if (name === undefined) {
        res.status(400).json({error: 'Name is required'})
        return;
    }

    try {
        const sql = `
            INSERT INTO categories (name)
            VALUES (?)
        `
        const [result] = await db.query<ResultSetHeader>(sql,  [name])
        res.status(201).json({message: 'Category created', id: result.insertId})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const name = req.body.name
  
    if (!name) {
      res.status(400).json({ error: 'Category name is required' });
      return;
    }
  
    try {
      const [category] = await db.query<ICategory[]>('SELECT * FROM categories WHERE id = ?', [categoryId]);
  
      if (category.length === 0) {
        res.status(404).json({ error: 'Category not found' });
      }
  
      const result = await db.query(
        `UPDATE categories
         SET name = ?
         WHERE id = ?`,
        [name, categoryId]
      );
  
      res.status(200).json({ message: 'Category name updated successfully', id: categoryId, result });
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const sql = `
        DELETE FROM categories
        WHERE id = ?
        `

        const [result] = await db.query<ResultSetHeader>(sql, [id])
        if (result.affectedRows === 0) {
            res.status(404).json({message: 'Category not found'})
            return;
        }

        res.json({message: 'Category deleted'})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})   
    }
}