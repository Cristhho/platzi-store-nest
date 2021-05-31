import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return await this.orderModel
      .find()
      .populate('user')
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate({
        path: 'user',
        select: 'email',
        populate: { path: 'customer', select: 'name lastName phone -_id' }
      })
      .populate('products')
      .exec();
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return await newOrder.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return await order.save();
  }

  async addProducts(id: string, products: string[]) {
    const order = await this.orderModel.findById(id);
    products.forEach((product) => order.products.push(product));
    return await order.save();
  }

  async ordersByCustomer(user: string) {
    return await this.orderModel.find({ user }).populate('products').exec();
  }
}
