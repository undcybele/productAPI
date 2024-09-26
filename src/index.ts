import express from 'express';
import cors from 'cors';
import router from "./routes/products.routes";
import {ProductDataSource} from "./db_config/data-source";

const app = express();
const port = process.env.PORT || 4040;

ProductDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL with TypeORM');

        app.use(cors());
        app.use('/products', router);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log('Error connecting to the database', error));