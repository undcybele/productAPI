export interface SearchProductDto {
    page: number;
    limit: number;
}

export interface CreateProductDto {
    name: string;
    description: string;
    category: string;
}

export interface UpdateProductDto {
    id: number;
    name: string;
    description: string;
    category: string;
}