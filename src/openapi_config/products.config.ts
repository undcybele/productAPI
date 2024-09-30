export const productPaths = {
    "/products": {
        get: {
            summary: "Retrieve all products",
            operationId: "getAllProducts",
            parameters: [
                {
                    name: "limit",
                    in: "query",
                    description: "Number of products to retrieve",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 10
                    }
                },
                {
                    name: "page",
                    in: "query",
                    description: "Page number for pagination",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }
            ],
            responses: {
                200: {
                    description: "A list of products",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
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
                                        type: "string"
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
            operationId: "createProduct",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateOrUpdateProductDto"
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
                                        example: "Created a product"
                                    },
                                    createdProduct: {
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
                                        type: "string"
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
            operationId: "getProductById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the product to retrieve",
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Product found",
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
                },
                500: {
                    description: "Failed to retrieve product",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Failed to retrieve product"
                                    },
                                    error: {
                                        type: "string"
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
            operationId: "updateProductById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the product to update",
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateOrUpdateProductDto"
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
                                        type: "string"
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
            operationId: "deleteProductById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the product to delete",
                    schema: {
                        type: "integer"
                    }
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
                                        type: "string"
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
                    type: "integer"
                },
                name: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                category: {
                    type: "string"
                },
                createdBy: {
                    type: "string"
                },
                updatedBy: {
                    type: "string"
                }
            }
        },
        CreateOrUpdateProductDto: {
            type: "object",
            required: ["name", "description", "category"],
            properties: {
                name: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                category: {
                    type: "string"
                }
            }
        }
    }
}
