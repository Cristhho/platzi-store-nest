import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from '../../services/order/order.service';
import { CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto } from '../../dtos/order.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @Put(':id/products')
  updateProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.orderService.addProducts(id, payload.products);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/product/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.orderService.removeProduct(id, productId);
  }
}
