## Product API

This project is a Product Management API built using Node.js, Express, and TypeORM with a PostgreSQL database. It allows the typical CRUD operations for products. The API is documented with Swagger(OpenAPI). To set up the environment, consult the example .env file.

Click [here](https://github.com/undcybele/custom_tooltip) to access the Frontend Task.
### Running the Project

**Prerequisites**
1. Node.js (v14+)
2. PostgreSQL database
3. TypeORM configured with PostgreSQL

### Swagger Documentation

To view the API endpoints, you can access the following link:

http://localhost:4040/api-docs


### Main Routes

- **GET /api/products**

Get all products, if pagination is desired, that is possible.

- **GET /api/products/{id}**

Retrieve one product by its id.

- **POST /api/products**

Create a new product. Expects a JSON body with the product details (name, description, category).

- **PUT /api/products/{id}**

Update an existing product by its id. Expects a JSON body with updated details (any of the following: name, description, category).

- **DELETE /api/products/{id}**

Delete a product by its id.

### Product Entity Schema

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
