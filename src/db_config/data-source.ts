import { DataSource } from 'typeorm';
import {ProductEntity} from "../entities/product.entities";

export const ProductDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'product_db',
    synchronize: true, //true only for dev
    logging: false,
    entities: [ProductEntity]
});

ProductDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
