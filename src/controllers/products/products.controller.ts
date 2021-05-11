import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ProductService } from '../../services/product/product.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 10,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `products: limit: ${limit}, offset: ${offset}, brand: ${brand}`,
    // };
    return this.productService.findAll();
  }

  @Get('/filter')
  getProductFilter() {
    return {
      message: 'this is the filter',
    };
  }

  @Get('/:productId')
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // return {
    //   product: {
    //     id: productId,
    //   },
    // };
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: any) {
    // return {
    //   message: 'product created',
    //   payload,
    // };
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
