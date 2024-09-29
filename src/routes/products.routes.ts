import { Router } from 'express';
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById
} from "../controllers/products.controller";

const router: Router = Router();

const entityPath = "products";

router.get(`/${entityPath}`, getAllProducts);

router.get(`/${entityPath}/:id`, getProductById);

router.post(`/${entityPath}`, createProduct);

router.put(`/${entityPath}/:id`, updateProductById);

router.delete(`/${entityPath}/:id`, deleteProductById);

export default router;