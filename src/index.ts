import express from 'express';
import cors from 'cors';
import router from "./routes/products.routes";
import {ProductDataSource} from "./db_config/data-source";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from "./openapi_config/openapi.config";

const app = express();
const port = process.env.PORT || 4040;

ProductDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL with TypeORM');

        app.use(express.json());
        app.use(cors());

        const swaggerDocs = swaggerJsdoc(swaggerDefinition);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        app.use('/api', router);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log('Error connecting to the database', error));