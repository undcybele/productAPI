import { Router } from 'express';
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById
} from "../controllers/products.controller";

const router: Router = Router();

router.get(`/`, getAllProducts);

router.get(`/{:id}`, getProductById);

router.post(`/`, createProduct);

router.put(`/{:id}`, updateProductById);

router.delete('/{:id}', deleteProductById);

export default router;