import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Brand } from '../../entities/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '../../dtos/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
  ) {}

  async findAll() {
    return await this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = new this.brandModel(data);
    return await newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  async delete(id: string) {
    return await this.brandModel.findByIdAndDelete(id);
  }
}
