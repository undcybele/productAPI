import {ProductEntity} from "../entities/product.entities";
import {Repository} from "typeorm";
import {CreateOrUpdateProductDto, SearchProductDto} from "../dtos/product.dto";

export class ProductsService {

    constructor(private productRepository: Repository<ProductEntity>) {}

    async getProducts(query?: SearchProductDto): Promise<ProductEntity[]>{
        if(query == undefined) return await this.productRepository.find();
        return await this.productRepository.find(
            {
                take: query.limit,
                skip: query.page,
            }
        );
    };

    async getProductById(id: number): Promise<ProductEntity | null> {
        if (!id) {return null;}
        return await this.productRepository.findOneBy({id: id});
    }

    async addProduct(newProduct: CreateOrUpdateProductDto): Promise<ProductEntity | null> {
        if(!newProduct) return null;
        return this.productRepository.save(newProduct);
    }

    async updateExistingProduct (id: string, productUpdates: CreateOrUpdateProductDto): Promise<ProductEntity | null> {
        if(!productUpdates || !id) return null;
        const productToBeUpdated = await this.getProductById(parseInt(id));
        if(!productToBeUpdated) return null;
        const updatedProduct = this.productRepository.merge(productToBeUpdated, productUpdates);
        return await this.productRepository.save(updatedProduct);
    };

    async deleteExistingProduct (id: number): Promise<boolean | null> {
        if(!id) return null;
        const result = await this.productRepository.delete(id);
        return result.affected !== 0;
    };
}
