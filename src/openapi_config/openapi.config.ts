import {productComponents, productPaths} from './products.config';
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Products API",
    description: "The Swagger docs for a simple Products Restful API",
    version: "1.0.0"
  },
  servers: [
    {
      url: "/api",
    }
  ],
  paths: {
    ...productPaths
  },
  components: {
    ...productComponents
  }
};

const openApiOptions = {
  swaggerDefinition,
  apis: ['src/routes/products.routes.ts'],
};


export default openApiOptions;