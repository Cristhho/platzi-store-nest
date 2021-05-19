import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from '../../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../../dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.productModel.find().skip(offset).limit(limit).exec();
    }
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not exist');
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return await newProduct.save();
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!product) throw new NotFoundException('Product not exist');
    return product;
  }

  async delete(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
