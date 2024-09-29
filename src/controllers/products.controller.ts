import { Request, Response } from 'express';
import {IProduct} from "../models/products.model";
import {ProductsService} from "../services/products.service";
import {CreateProductDto, SearchProductDto} from "../dtos/product.dto";

const productService = new ProductsService();

// GET /api/products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productService.getProducts(req.body as SearchProductDto);
        res.status(200).json({ message: 'success', products: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve products', error });
    }
};

// GET /api/products/{id}
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log('id', id);
    if(!id) res.status(402).json('Invalid id');
    try {
        const product = await productService.getProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve product', error });
    }
};

// POST /api/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProductData: CreateProductDto = req.body;
        const createdProduct = await productService.addProduct(newProductData);
        if(!createdProduct) throw Error;
        res.status(201).json({ message: 'Created a product', createdProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
};

// PUT /api/products/{id}
export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body as IProduct;
    try {
        const updatedProduct = await productService.updateExistingProduct(id, updatedData);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
};

//DELETE /api/products/{id}
export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const isDeleted = await productService.deleteExistingProduct(id);
        if (isDeleted) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};
