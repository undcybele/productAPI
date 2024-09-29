export const productPaths = {
    "/products": {
        get: {
            summary: "Retrieve a list of all products",
            description: "This API retrieves all products from the database.",
            tags: ["Products"],
            responses: {
                200: {
                    description: "A list of products",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "success"
                                    },
                                    products: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Product"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Failed to retrieve products",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Failed to retrieve products"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: "Create a new product",
            description: "This API creates a new product.",
            tags: ["Products"],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateProductDto"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Product created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Product created successfully"
                                    },
                                    product: {
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Failed to create product",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Failed to create product"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/products/{id}": {
        get: {
            summary: "Retrieve a product by ID",
            description: "This API retrieves a product by its ID.",
            tags: ["Products"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    },
                    description: "The product ID"
                }
            ],
            responses: {
                200: {
                    description: "Product retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    }
                },
                404: {
                    description: "Product not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Product not found"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Update a product by ID",
            description: "This API updates a product by its ID.",
            tags: ["Products"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    },
                    description: "The product ID"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UpdateProductDTO"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Product updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Product updated successfully"
                                    },
                                    product: {
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Product not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Product not found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Failed to update product",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Failed to update product"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Delete a product by ID",
            description: "This API deletes a product by its ID.",
            tags: ["Products"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    },
                    description: "The product ID"
                }
            ],
            responses: {
                200: {
                    description: "Product deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Product deleted successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Product not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Product not found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Failed to delete product",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Failed to delete product"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export const productComponents = {
    schemas: {
        Product: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "The unique identifier for a product",
                    example: 1
                },
                name: {
                    type: "string",
                    description: "The name of the product",
                    example: "Product A"
                },
                description: {
                    type: "string",
                    description: "A brief description of the product",
                    example: "This is a sample product."
                },
                category: {
                    type: "string",
                    description: "The category to which the product belongs",
                    example: "Electronics"
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "The date and time when the product was created",
                    example: "2023-09-27T12:34:56Z"
                },
                updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "The date and time when the product was last updated",
                    example: "2023-09-28T12:34:56Z"
                }
            },
            required: ["id", "name", "description", "category", "createdAt", "updatedAt"]
        },
        SearchProductDto: {
            type: "object",
            properties: {
                page: {
                    type: "integer",
                    description: "The page number for pagination",
                    example: 1
                },
                limit: {
                    type: "integer",
                    description: "The maximum number of products to return per page",
                    example: 10
                }
            },
            required: ["page", "limit"]
        },
        CreateProductDto: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "The name of the product",
                    example: "Product X"
                },
                description: {
                    type: "string",
                    description: "A description of the product",
                    example: "This is an example of a product."
                },
                category: {
                    type: "string",
                    description: "The category of the product",
                    example: "Electronics"
                }
            },
            required: ["name", "description", "category"]
        },
        UpdateProductDto: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "The unique identifier for the product to be updated",
                    example: 1
                },
                name: {
                    type: "string",
                    description: "The updated name of the product",
                    example: "Updated Product A"
                },
                description: {
                    type: "string",
                    description: "The updated description of the product",
                    example: "This is an updated description."
                },
                category: {
                    type: "string",
                    description: "The updated category of the product",
                    example: "Home Appliances"
                }
            },
            required: ["id", "name", "description", "category"]
        }
    }
}
