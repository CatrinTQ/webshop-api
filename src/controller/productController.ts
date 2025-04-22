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
    const title = req.body.title;
    const description = req.body.description;
    const stock = req.body.stock;
    const price = req.body.price;

    if (title === undefined) {
        res.status(400).json({error: 'Title is required'})
        return;
    }

    try {
        const sql = `
            INSERT INTO products (title, description, stock, price)
            VALUES (?, ?, ?, ?)
        `
        const [result] = await db.query<ResultSetHeader>(sql,  [title, description, stock, price])
        res.status(201).json({message: 'Product created', id: result.insertId})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { title, description, stock, price, image } = req.body;
    const id = parseInt(req.params.id);

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const [products] = await db.query<IProduct[]>('SELECT * FROM products WHERE id = ?', [id]);
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await db.query(
            `UPDATE products 
             SET title = ?, description = ?, stock = ?, price = ?, image = ?
             WHERE id = ?`,
            [title, description, stock, price, image, id]
        );

        res.json({ message: 'Product updated', id });
    } catch (error: unknown) {
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
        if (result.affectedRows === 0) {
            res.status(404).json({message: 'Product not found'})
            return;
        }

        res.json({message: 'Product deleted'})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})   
    }
}