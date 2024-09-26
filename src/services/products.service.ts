import {IProduct} from "../models/products.model";

export const getProducts = async (): Promise<IProduct[]> => {
    return {} as IProduct[];
};

export const getProduct = async (id: string): Promise<IProduct | null> => {
    return {} as IProduct;
};

export const addProduct = async (newProduct: IProduct): Promise<IProduct> => {
    return {} as IProduct;
};

export const updateExistingProduct = async (id: string, updatedProduct: IProduct): Promise<IProduct | null> => {
    return {} as IProduct;
};

export const deleteExistingProduct = async (id: string): Promise<boolean> => {
    return true;
};
