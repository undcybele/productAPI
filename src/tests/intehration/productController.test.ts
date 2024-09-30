import request from 'supertest';
import { ProductEntity } from '../../entities/product.entities';
import {testApp, closeTestApp, initializeTestApp, testDataSource} from "../config";
import {CreateOrUpdateProductDto} from "../../dtos/product.dto";

describe('Products API Integration Tests', () => {
    it('should create a new product', async () => {
        const newProduct = {
            name: 'Test Product',
            description: 'This is a test product',
            category: 'Test Category'
        };

        const response = await request(testApp)
            .post('/products')
            .send(newProduct)
            .expect(201);

        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.description).toBe(newProduct.description);
        expect(response.body.category).toBe(newProduct.category);
    });

    it('should retrieve all products', async () => {
        const product1 = { name: 'Product 1', description: 'Desc 1', category: 'Category 1' };
        const product2 = { name: 'Product 2', description: 'Desc 2', category: 'Category 2' };

        await testDataSource.getRepository(ProductEntity).save([product1, product2]);

        const response = await request(testApp)
            .get('/products')
            .expect(200);
        expect(response.body.length).toBe(2);
    });

    it('should retrieve a product by ID', async () => {
        const product = { name: 'Product 1', description: 'Desc 1', category: 'Category 1' };

        const savedProduct = await testDataSource.getRepository(ProductEntity).save(product);

        const response = await request(testApp)
            .get(`/products/${savedProduct.id}`)
            .expect(200);

        expect(response.body.name).toBe(product.name);
    });

    it('should update a product by ID', async () => {
        const product: CreateOrUpdateProductDto = { name: 'Product 1', description: 'Desc 1', category: 'Category 1' };
        const savedProduct: ProductEntity = await testDataSource.getRepository(ProductEntity).save(product);

        const updatedProduct = { name: 'Updated Product 1', description: 'Updated Desc 1', category: 'Updated Category 1' };

        const response = await request(testApp)
            .put(`/products/${savedProduct.id}`)
            .send(updatedProduct)
            .expect(200);

        expect(response.body.name).toBe(updatedProduct.name);
    });

    it('should delete a product by ID', async () => {
        const product = { name: 'Product 1', description: 'Desc 1', category: 'Category 1' };
        const savedProduct = await testDataSource.getRepository(ProductEntity).save(product);

        await request(testApp)
            .delete(`/products/${savedProduct.id}`)
            .expect(200);

        const deletedProduct = await testDataSource.getRepository(ProductEntity).findOneBy({ id: savedProduct.id });
        expect(deletedProduct).toBeNull();
    });
});
