import {IProduct} from "../models/products.model";
import {ProductDataSource} from "../db_config/data-source";
import {ProductEntity} from "../entities/product.entities";
import {Repository} from "typeorm";
import {CreateProductDto, SearchProductDto} from "../dtos/product.dto";

export class ProductsService {
    private productRepository: Repository<ProductEntity>;
    constructor() {
        this.productRepository = ProductDataSource.getRepository(ProductEntity);
    }

    async getProducts(query?: SearchProductDto): Promise<ProductEntity[]>{
        console.log('query', query);
        if(query == undefined) return await this.productRepository.find();
        return await this.productRepository.find(
            {
                take: query.limit,
                skip: query.page,
            }
        );
    };

    async getProductById(id: string): Promise<ProductEntity | null> {
        if (!id) {return null;}
        return await this.productRepository.findOneBy({id: Number(id)});
    }

    async addProduct(newProduct: CreateProductDto): Promise<ProductEntity | null> {
        if(!newProduct) return null;
        return this.productRepository.save(newProduct);
    }

    async updateExistingProduct (id: string, productUpdates: IProduct): Promise<IProduct | null> {
        if(!productUpdates || !id) return null;
        const productToBeUpdated = await this.getProductById(id);
        if(!productToBeUpdated) return null;
        const updatedProduct = this.productRepository.merge(productToBeUpdated, productUpdates);
        return await this.productRepository.save(updatedProduct);
    };

    async deleteExistingProduct (id: string): Promise<boolean | null> {
        if(!id) return null;
        const result = await this.productRepository.delete(id);
        return result.affected !== 0;
    };
}
