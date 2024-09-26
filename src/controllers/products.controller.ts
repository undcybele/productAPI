import { Request, Response } from 'express';

// GET /api/products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
};

// GET /api/products/{id}
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
};

// POST /api/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
};

// PUT /api/products/{id}
export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
};

//DELETE /api/products/{id}
export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
};


