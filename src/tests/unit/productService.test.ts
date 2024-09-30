import { ProductsService } from "../../services/products.service";
import { ProductEntity } from "../../entities/product.entities";
import { DataSource, Repository } from 'typeorm';
import { CreateOrUpdateProductDto, SearchProductDto } from "../../dtos/product.dto";

// Mock the repository
const mockProductRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
};

// Mock the DataSource and Repository
const mockDataSource = {
    getRepository: jest.fn().mockReturnValue(mockProductRepository),
} as unknown as DataSource;

describe('ProductService', () => {
    let productService: ProductsService;

    beforeEach(() => {
        productService = new ProductsService(mockDataSource.getRepository(ProductEntity) as unknown as Repository<ProductEntity>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getProducts', () => {
        it('should return all products when query is undefined', async () => {
            const products: ProductEntity[] = [{ id: 1, name: 'Product 1' }] as ProductEntity[];
            mockProductRepository.find.mockResolvedValue(products);

            const result = await productService.getProducts();
            expect(mockProductRepository.find).toHaveBeenCalled();
            expect(result).toEqual(products);
        });

        it('should return paginated products when query is provided', async () => {
            const query: SearchProductDto = { limit: 10, page: 1 };
            const products: ProductEntity[] = [{ id: 1, name: 'Product 1' }] as ProductEntity[];
            mockProductRepository.find.mockResolvedValue(products);

            const result = await productService.getProducts(query);
            expect(mockProductRepository.find).toHaveBeenCalledWith({
                take: query.limit,
                skip: query.page,
            });
            expect(result).toEqual(products);
        });
    });

    describe('getProductById', () => {
        it('should return product when ID exists', async () => {
            const product: ProductEntity = { id: 1, name: 'Product 1' } as ProductEntity;
            mockProductRepository.findOneBy.mockResolvedValue(product);

            const result = await productService.getProductById(1);
            expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(result).toEqual(product);
        });

        it('should return null when ID is not provided', async () => {
            const result = await productService.getProductById(undefined as unknown as number);
            expect(result).toBeNull();
        });

        it('should return null when product with ID does not exist', async () => {
            mockProductRepository.findOneBy.mockResolvedValue(null);

            const result = await productService.getProductById(999);
            expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
            expect(result).toBeNull();
        });
    });

    describe('addProduct', () => {
        it('should add and return the new product', async () => {
            const newProduct: CreateOrUpdateProductDto = { name: 'New Product', description: 'New product description', category: 'Electronics' };
            const savedProduct: ProductEntity = { id: 1, ...newProduct } as ProductEntity;
            mockProductRepository.save.mockResolvedValue(savedProduct);

            const result = await productService.addProduct(newProduct);
            expect(mockProductRepository.save).toHaveBeenCalledWith(newProduct);
            expect(result).toEqual(savedProduct);
        });

        it('should return null if no product is provided', async () => {
            const result = await productService.addProduct(null as unknown as CreateOrUpdateProductDto);
            expect(result).toBeNull();
        });
    });

    describe('updateExistingProduct', () => {
        it('should update and return the updated product', async () => {
            const id = '1';
            const productUpdates: CreateOrUpdateProductDto = { name: 'Updated Product', description: 'Updated Product description', category: 'Electronics' };
            const existingProduct: ProductEntity = { id: 1, name: 'Old Product' } as ProductEntity;
            const updatedProduct: ProductEntity = { ...existingProduct, ...productUpdates } as ProductEntity;

            mockProductRepository.findOneBy.mockResolvedValue(existingProduct);
            mockProductRepository.merge.mockReturnValue(updatedProduct);
            mockProductRepository.save.mockResolvedValue(updatedProduct);

            const result = await productService.updateExistingProduct(id, productUpdates);
            expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id: parseInt(id) });
            expect(mockProductRepository.merge).toHaveBeenCalledWith(existingProduct, productUpdates);
            expect(mockProductRepository.save).toHaveBeenCalledWith(updatedProduct);
            expect(result).toEqual(updatedProduct);
        });

        it('should return null if product or ID is not provided', async () => {
            const result = await productService.updateExistingProduct(null as unknown as string, null as unknown as ProductEntity);
            expect(result).toBeNull();
        });

        it('should return null if product does not exist', async () => {
            const id = '1';
            const productUpdates: CreateOrUpdateProductDto = { name: 'Updated Product', description: 'Updated Product description', category: 'Electronics' };
            mockProductRepository.findOneBy.mockResolvedValue(null);

            const result = await productService.updateExistingProduct(id, productUpdates);
            expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id: parseInt(id) });
            expect(result).toBeNull();
        });
    });

    describe('deleteExistingProduct', () => {
        it('should delete a product and return true if successful', async () => {
            mockProductRepository.delete.mockResolvedValue({ affected: 1 });

            const result = await productService.deleteExistingProduct(1);
            expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
            expect(result).toBe(true);
        });

        it('should return null if ID is not provided', async () => {
            const result = await productService.deleteExistingProduct(null as unknown as number);
            expect(result).toBeNull();
        });

        it('should return false if no product was deleted', async () => {
            mockProductRepository.delete.mockResolvedValue({ affected: 0 });

            const result = await productService.deleteExistingProduct(1);
            expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
            expect(result).toBe(false);
        });
    });
});
