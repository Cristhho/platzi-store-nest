import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

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
      const filter: FilterQuery<Product> = {};
      const { limit, offset, minPrice } = params;
      let maxPrice = params.maxPrice;
      if (minPrice) {
        if (!maxPrice) maxPrice = Number.MAX_VALUE;
        filter.price = { $gte: minPrice, $lte: maxPrice };
      }
      return await this.productModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .populate('brand')
        .exec();
    }
    return await this.productModel.find().populate('brand').exec();
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
