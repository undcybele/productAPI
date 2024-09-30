export interface SearchProductDto {
    page: number;
    limit: number;
}

export interface CreateOrUpdateProductDto {
    name: string;
    description: string;
    category: string;
}