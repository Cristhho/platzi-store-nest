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

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 10,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: limit: ${limit}, offset: ${offset}, brand: ${brand}`,
    };
  }

  @Get('/filter')
  getProductFilter() {
    return {
      message: 'this is the filter',
    };
  }

  @Get('/:productId')
  getProduct(@Param('productId') productId: string) {
    return {
      product: {
        id: productId,
      },
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'product created',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'product updated',
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: 'product deleted',
      id,
    };
  }
}
