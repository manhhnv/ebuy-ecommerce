import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductInput } from '../generate-types';
@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    )
    {}
    createProduct(input: CreateProductInput): Promise<Product | undefined> {
        try {
            const newProduct = new this.productModel(input);
            return newProduct.save();
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
    async findProductById(_id: string): Promise<Product | undefined> {
        try {
            const product = await this.productModel.findById(_id);
            return product;
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'Error')
        }
    }
}