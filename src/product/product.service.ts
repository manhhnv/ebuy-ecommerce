import { Injectable } from '@nestjs/common';
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
    createProduct(input: CreateProductInput): Promise<Product> {
        let newProduct = new this.productModel();
        console.log(input)
        newProduct.name = input.name;
        newProduct.description = input.description;
        newProduct.slug = input.slug;
        newProduct.inStock = input.inStock;
        console.log(newProduct)
        return newProduct.save();
    }
}