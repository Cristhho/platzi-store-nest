import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const model = await newUser.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
