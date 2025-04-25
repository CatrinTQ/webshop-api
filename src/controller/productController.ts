import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IProduct } from "../models/IProduct";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<IProduct[]>('SELECT * FROM products');

        const searchParam = req.query.search?.toString().toLowerCase();
        const sortParam = req.query.sort?.toString();
        const sortOrder = sortParam === 'desc' ? 'desc' : 'asc';

        let filteredRows = rows;

        if (searchParam) {
            filteredRows = filteredRows.filter((product) =>
                product.title.toLowerCase().includes(searchParam)
            );
        }

        filteredRows.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) return sortOrder === 'asc' ? -1 : 1;
            if (titleA > titleB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        res.json(filteredRows);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}

export const getSingleProduct = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const sql = `
        SELECT * FROM products 
        WHERE id = ?
        `
        const [rows] = await db.query<IProduct[]>(sql, [id])
        const product = rows[0];
        if (!product) {
        res.status(404).json({message: 'Product not found'})
        return;
        }
        res.json(product)
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const { title, description, stock, price, image } = req.body;

    const requiredFields = { title, description, stock, price, image};

    const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => value === undefined || value === "")
    .map(([key]) => key);

    if (missingFields.length > 0) {
        res.status(400).json({
            error: `Följande fält saknas: ${missingFields.join(', ')}`
        });
    }

    if (!title || !description || !stock || !price) {
        res.status(400).json({error: 'Title is required'})
        return;
    }

    try {
        const sql = `
            INSERT INTO products (title, description, stock, price, image)
            VALUES (?, ?, ?, ?, ?)
        `
        const [result] = await db.query<ResultSetHeader>(sql, [title, description, stock, price, image || null])
        res.status(201).json({message: 'Product created', id: result.insertId})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const {title, description, stock, price } = req.body;

  const requiredFields = { title, description, stock, price };

  const missingFields = Object.entries(requiredFields)
  .filter(([_, value]) => value === undefined || value === "")
  .map(([key]) => key);

  if (missingFields.length > 0) {
      res.status(400).json({
          error: `Följande fält saknas: ${missingFields.join(', ')}`
      });
  }

  if (!title || !description || !stock || !price) {
    res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [product] = await db.query<IProduct[]>('SELECT * FROM products WHERE id = ?', [productId]);

    if (product.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    }

    const result = await db.query(
      `UPDATE products
       SET title = ?, description = ?, stock = ?, price = ?
       WHERE id = ?`,
      [title, description, stock, price, productId]
    );

    res.status(200).json({ message: 'Product updated successfully', id: productId, result });
    
  } catch (error) {

    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const sql = `
        DELETE FROM products
        WHERE id = ?
        `

        const [result] = await db.query<ResultSetHeader>(sql, [id])
        if (!result || result.affectedRows === 0) {
            res.status(404).json({message: 'Product not found'})
            return;
        }

        res.status(200).json({message: 'Product deleted'})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})   
    }
}