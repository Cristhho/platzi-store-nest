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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductService } from '../../services/product/product.service';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Shows a list of products' })
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
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
