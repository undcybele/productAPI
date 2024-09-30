import { DataSource } from 'typeorm';
import { ProductEntity } from '../entities/product.entities';
import express from "express";
import router from "../routes/products.routes";

export const testDataSource = new DataSource({
    type: 'postgres',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT || '5432'),
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME || 'product_db_test',
    synchronize: true,
    entities: [ProductEntity]
});

export const testApp = express();
testApp.use(express.json());
testApp.use('/products', router);

export const initializeTestApp = async () => {
    try {
        if (!testDataSource.isInitialized) {
            console.log('Initializing Product');

            await testDataSource.initialize();
            console.log('Test database connected');
        }
    } catch (error) {
        console.error('Error during test database connection:', error);
        throw error;
    }
};

export const closeTestApp = async () => {
    if (testDataSource.isInitialized) {
        await testDataSource.destroy();
    }
};

beforeAll(async () => {
    await testDataSource.initialize();
});

afterAll(async () => {
    await testDataSource.destroy();
});
